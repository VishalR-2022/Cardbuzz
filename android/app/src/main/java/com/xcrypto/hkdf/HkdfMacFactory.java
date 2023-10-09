/*
 * Copyright 2023 Sonal Gupta <reachsonalgupta@gmail.com>. All rights reserved.
 *
 * This file is part of the project XCryptoModule for android
 *
 * XCryptoModule can not be copied and/or distributed without the express
 * permission of Sonal Gupta.
 */

package com.xcrypto.hkdf;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.Provider;

public interface HkdfMacFactory {

    Mac createInstance(SecretKey key);

    int getMacLengthBytes();

    SecretKey createSecretKey(byte[] rawKeyMaterial);

    @SuppressWarnings("WeakerAccess")
    final class Default implements HkdfMacFactory {
        private final String macAlgorithmName;
        private final Provider provider;

        public static HkdfMacFactory hmacSha256() {
            return new Default("HmacSHA256", null);
        }

        public static HkdfMacFactory hmacSha512() {
            return new Default("HmacSHA512", null);
        }

        public Default(String macAlgorithmName) {
            this(macAlgorithmName, null);
        }

        public Default(String macAlgorithmName, Provider provider) {
            this.macAlgorithmName = macAlgorithmName;
            this.provider = provider;
        }

        @Override
        public Mac createInstance(SecretKey key) {
            try {
                Mac mac = createMacInstance();
                mac.init(key);
                return mac;
            } catch (Exception e) {
                throw new IllegalStateException("could not make hmac hasher in hkdf", e);
            }
        }

        private Mac createMacInstance() {
            try {
                Mac hmacInstance;

                if (provider == null) {
                    hmacInstance = Mac.getInstance(macAlgorithmName);
                } else {
                    hmacInstance = Mac.getInstance(macAlgorithmName, provider);
                }

                return hmacInstance;
            } catch (NoSuchAlgorithmException e) {
                throw new IllegalStateException("defined mac algorithm was not found", e);
            } catch (Exception e) {
                throw new IllegalStateException("could not create mac instance in hkdf", e);
            }
        }

        @Override
        public int getMacLengthBytes() {
            return createMacInstance().getMacLength();
        }

        @Override
        public SecretKey createSecretKey(byte[] rawKeyMaterial) {
            if (rawKeyMaterial == null || rawKeyMaterial.length <= 0) {
                return null;
            }
            return new SecretKeySpec(rawKeyMaterial, macAlgorithmName);
        }
    }
}