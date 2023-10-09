/*
 * Copyright 2023 Sonal Gupta <reachsonalgupta@gmail.com>. All rights reserved.
 *
 * This file is part of the project XCryptoModule for android
 *
 * XCryptoModule can not be copied and/or distributed without the express
 * permission of Sonal Gupta.
 */

package com.cardbuzz.xcrypto.crypto;

import android.util.Log;
import java.io.ByteArrayOutputStream;
import java.math.BigInteger;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.io.ByteArrayOutputStream;
import javax.crypto.SecretKey;
import javax.crypto.Cipher;
import android.security.KeyStoreException;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.security.keystore.KeyProtection;
import java.security.KeyStore;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.PrivateKey;
import java.security.KeyPair;
import javax.crypto.spec.GCMParameterSpec;

public class CryptoUtils {
    public static final String TAG = "XCryptoModule";

    protected static String encryptAESGCM(SecretKey key, byte[] data) throws Exception {
        Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
        c.init(Cipher.ENCRYPT_MODE, key);

        byte[] encrypted = c.doFinal(data);
        byte[] iv = c.getIV();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream( );
        outputStream.write( iv );
        outputStream.write( encrypted );
        byte[] output = outputStream.toByteArray();

        return Base64.getEncoder().encodeToString(output);
    }
    protected static byte[] decryptAESGCM(SecretKey key, String  b64EncTextWithIV) throws Exception {
        byte[] encTextWithIVBytes= Base64.getDecoder().decode(b64EncTextWithIV);

        byte[] iv=new byte[12];
        System.arraycopy(encTextWithIVBytes,0,iv,0,iv.length);
        byte[] cipherText=new byte[encTextWithIVBytes.length-12];
        System.arraycopy(encTextWithIVBytes,12,cipherText,0,cipherText.length);

        Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
        c.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(128, iv));
        byte[] originalData = c.doFinal(cipherText);

        return originalData;
    }
    protected static SecretKey getSecretKeyAES(String alias, boolean isStrongBoxBacked) throws Exception {
        KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
        ks.load(null);

        SecretKey key = (SecretKey) ks.getKey(alias, null);
        if (key!=null){
            return key;
        }
        final KeyGenerator keyGenerator = KeyGenerator
                .getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");

        keyGenerator.init(new KeyGenParameterSpec.Builder(alias,
                KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .build());

        return keyGenerator.generateKey();
    }

    protected static BigInteger hexToBigInteger(boolean clearHighBit, String str) {
        BigInteger result = BigInteger.ZERO;
        for (int i = 0; i < str.length() / 2; i++) {
            int curVal = Character.digit(str.charAt(2 * i), 16);
            curVal <<= 4;
            curVal += Character.digit(str.charAt(2 * i + 1), 16);
            if (clearHighBit && i == str.length() / 2 - 1) {
                curVal &= 0x7F;
                result = result.add(BigInteger.valueOf(curVal).shiftLeft(8 * i));
            }
        }
        return result;
    }
    protected static byte[] hexToBytes(String str) {
        byte[] result = new byte[str.length() / 2];
        for (int i = 0; i < result.length; i++) {
            result[i] = (byte) Character.digit(str.charAt(2 * i), 16);
            result[i] <<= 4;
            result[i] += Character.digit(str.charAt(2 * i + 1), 16);
        }
        return result;
    }
    protected static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

}