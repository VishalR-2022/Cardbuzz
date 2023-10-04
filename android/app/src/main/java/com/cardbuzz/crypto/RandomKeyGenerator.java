package com.cardbuzz.crypto;
import java.security.SecureRandom;
import java.util.Base64;

public class RandomKeyGenerator {

    public static String genRandomKey_b64(int size) {
        SecureRandom random = new SecureRandom();
        byte[] key = new byte[size];
        random.nextBytes(key);
        return Base64.getEncoder().encodeToString(key);
    }

    public static byte[] genRandomKey_bytes(int size) {
        SecureRandom random = new SecureRandom();
        byte[] key = new byte[size];
        random.nextBytes(key);
        return key;
    }

    public static void main(String[] args) {
        System.out.println(genRandomKey_b64(32));
    }
}
