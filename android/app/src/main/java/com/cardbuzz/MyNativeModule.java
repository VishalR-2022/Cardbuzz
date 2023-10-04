package com.cardbuzz;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.Base64;
import java.util.Random;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class MyNativeModule extends ReactContextBaseJavaModule {
    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private static final String ALGORITHM = "ChaCha20-Poly1305";

    @ReactMethod
    public void addTwoNumbers(String x, String y, Promise promise) {
        int a = Integer.parseInt(x), b = Integer.parseInt(y);
        int result = a + b;
        promise.resolve(Integer.toString(result));
    }

    @ReactMethod
    public void subTwoNumbers(String x, String y, Promise promise) {
        int a = Integer.parseInt(x), b = Integer.parseInt(y);
        int result = a - b;
        promise.resolve(Integer.toString(result));
    }

    @ReactMethod
    public static String genRandomKey_b64(int size) {
        byte[] key = new byte[size];
        new Random().nextBytes(key);
        return Base64.getEncoder().encodeToString(key);
    }

    public static String encPayload(String data, String secretKey) throws GeneralSecurityException, IOException {
        byte[] keyBytes = Base64.getDecoder().decode(genRandomKey_b64(32));
        IvParameterSpec iv = new IvParameterSpec(generateRandomIv());
        SecretKeySpec secretKeySpec = new SecretKeySpec(keyBytes, ALGORITHM);

        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, iv);

        CipherOutputStream cos = new CipherOutputStream(new ByteArrayOutputStream(), cipher);
        cos.write(data.getBytes("UTF-8"));
        cos.close();

        byte[] cipherText = ((ByteArrayOutputStream) cos.getOutputStream()).toByteArray();

        return Base64.getEncoder().encodeToString(cipherText);
    }

    private static byte[] generateRandomIv() {
        byte[] iv = new byte[12];
        new Random().nextBytes(iv);
        return iv;
    }

    @Override
    public String getName() {
        return "MyNativeModule";
    }
}