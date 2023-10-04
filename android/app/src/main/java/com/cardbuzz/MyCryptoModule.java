package com.cardbuzz;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import com.cardbuzz.crypto.RandomKeyGenerator;
import com.cardbuzz.crypto.PayloadCipher;

public class MyCryptoModule extends ReactContextBaseJavaModule {

    public MyCryptoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void addTwoNumbers(String x, String y, Promise promise) {
        int a=Integer.parseInt(x),b=Integer.parseInt(y);
        int result = a + b;
        promise.resolve(Integer.toString(result));
    }

    @ReactMethod
    public void genRandomKey_b64(double size, Promise promise) {
        String finalKey = RandomKeyGenerator.genRandomKey_b64((int)size);
        promise.resolve(finalKey);
    }

    @ReactMethod
    public void encrypt(String data, String secretKey,  Promise promise) {
        try {
        String finalDString = PayloadCipher.encrypt(data, secretKey);
        promise.resolve(finalDString);
        } catch(Exception e) {
            promise.reject(e);
        }
    }

    @Override
    public String getName() {
        return "MyCryptoModule";
    }
}
