/*
 * Copyright 2023 Sonal Gupta <reachsonalgupta@gmail.com>. All rights reserved.
 *
 * This file is part of the project XCryptoModule for android
 *
 * XCryptoModule can not be copied and/or distributed without the express
 * permission of Sonal Gupta.
 */

package com.cardbuzz.xcrypto.hkdf;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import java.nio.ByteBuffer;


@SuppressWarnings("WeakerAccess")
public final class HKDF {
    private static HKDF hkdfHmacSha256;
    private static HKDF hkdfHmacSha512;

    private final HkdfMacFactory macFactory;

    private HKDF(HkdfMacFactory macFactory) {
        this.macFactory = macFactory;
    }

    public static HKDF fromHmacSha256() {
        if (hkdfHmacSha256 == null) {
            hkdfHmacSha256 = from(HkdfMacFactory.Default.hmacSha256());
        }
        return hkdfHmacSha256;
    }

    public static HKDF fromHmacSha512() {
        if (hkdfHmacSha512 == null) {
            hkdfHmacSha512 = from(HkdfMacFactory.Default.hmacSha512());
        }
        return hkdfHmacSha512;
    }

    public static HKDF from(HkdfMacFactory macFactory) {
        return new HKDF(macFactory);
    }

    public byte[] extract(byte[] salt, byte[] inputKeyingMaterial) {
        return extract(macFactory.createSecretKey(salt), inputKeyingMaterial);
    }

    public byte[] extract(SecretKey salt, byte[] inputKeyingMaterial) {
        return new Extractor(macFactory).execute(salt, inputKeyingMaterial);
    }

    public byte[] expand(byte[] pseudoRandomKey, byte[] info, int outLengthBytes) {
        return expand(macFactory.createSecretKey(pseudoRandomKey), info, outLengthBytes);
    }

    public byte[] expand(SecretKey pseudoRandomKey, byte[] info, int outLengthBytes) {
        return new Expander(macFactory).execute(pseudoRandomKey, info, outLengthBytes);
    }

    public byte[] extractAndExpand(byte[] saltExtract, byte[] inputKeyingMaterial, byte[] infoExpand, int outLengthByte) {
        return extractAndExpand(macFactory.createSecretKey(saltExtract), inputKeyingMaterial, infoExpand, outLengthByte);
    }

    public byte[] extractAndExpand(SecretKey saltExtract, byte[] inputKeyingMaterial, byte[] infoExpand, int outLengthByte) {
        return new Expander(macFactory).execute(macFactory.createSecretKey(
                        new Extractor(macFactory).execute(saltExtract, inputKeyingMaterial)),
                infoExpand, outLengthByte);
    }

    HkdfMacFactory getMacFactory() {
        return macFactory;
    }

    /* ************************************************************************** IMPL */

    static final class Extractor {
        private final HkdfMacFactory macFactory;

        Extractor(HkdfMacFactory macFactory) {
            this.macFactory = macFactory;
        }

        byte[] execute(SecretKey salt, byte[] inputKeyingMaterial) {
            if (salt == null) {
                salt = macFactory.createSecretKey(new byte[macFactory.getMacLengthBytes()]);
            }

            if (inputKeyingMaterial == null || inputKeyingMaterial.length <= 0) {
                throw new IllegalArgumentException("provided inputKeyingMaterial must be at least of size 1 and not null");
            }

            Mac mac = macFactory.createInstance(salt);
            return mac.doFinal(inputKeyingMaterial);
        }
    }

    static final class Expander {
        private final HkdfMacFactory macFactory;

        Expander(HkdfMacFactory macFactory) {
            this.macFactory = macFactory;
        }

        byte[] execute(SecretKey pseudoRandomKey, byte[] info, int outLengthBytes) {

            if (outLengthBytes <= 0) {
                throw new IllegalArgumentException("out length bytes must be at least 1");
            }

            if (pseudoRandomKey == null) {
                throw new IllegalArgumentException("provided pseudoRandomKey must not be null");
            }

            Mac hmacHasher = macFactory.createInstance(pseudoRandomKey);

            if (info == null) {
                info = new byte[0];
            }

            byte[] blockN = new byte[0];

            int iterations = (int) Math.ceil(((double) outLengthBytes) / ((double) hmacHasher.getMacLength()));

            if (iterations > 255) {
                throw new IllegalArgumentException("out length must be maximal 255 * hash-length; requested: " + outLengthBytes + " bytes");
            }

            ByteBuffer buffer = ByteBuffer.allocate(outLengthBytes);
            int remainingBytes = outLengthBytes;
            int stepSize;

            for (int i = 0; i < iterations; i++) {
                hmacHasher.update(blockN);
                hmacHasher.update(info);
                hmacHasher.update((byte) (i + 1));

                blockN = hmacHasher.doFinal();

                stepSize = Math.min(remainingBytes, blockN.length);

                buffer.put(blockN, 0, stepSize);
                remainingBytes -= stepSize;
            }

            return buffer.array();
        }
    }
}