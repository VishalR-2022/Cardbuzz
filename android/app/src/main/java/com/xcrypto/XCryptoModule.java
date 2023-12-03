/*
 * Copyright 2023 Sonal Gupta <reachsonalgupta@gmail.com>. All rights reserved.
 *
 * This file is part of the project XCryptoModule for android
 *
 * XCryptoModule can not be copied and/or distributed without the express
 * permission of Sonal Gupta.
 */

package com.xcrypto;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import java.util.Map;
import java.util.HashMap;
import android.util.Log;

// import org.apache.commons.codec.binary.Base64;
// import org.json.simple.JSONObject;
// import org.json.simple.parser.JSONParser;

import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Arrays;
import java.util.Base64;
import java.security.PublicKey;
import android.content.Context;
import android.content.SharedPreferences;
import com.xcrypto.crypto.*;

public class XCryptoModule extends ReactContextBaseJavaModule {
  Context context;
  private static final String SHARED_PREFENCE_NAME = "cb_shared_prefs";
  private static final String ENCRYPTEDKEY_KEY = "encrypted_key1";

  public XCryptoModule(ReactApplicationContext context) {
    super(context);
    this.context = context.getApplicationContext();
  }

  @Override
  public String getName() {
    return "XCryptoModule";
  }

  @ReactMethod
  public void genRSAKeyPair(Promise promise) {
    try {
      byte[][] keyPair = RSAUtils.genKeyPair();
      WritableMap mp = Arguments.createMap();

      String b64PubKey = Base64.getEncoder().encodeToString(keyPair[0]);
      String[] parts = new String[3];
      parts[0] = "-----BEGIN PUBLIC KEY-----";
      parts[1] = b64PubKey;
      parts[2] = "-----END PUBLIC KEY-----";

      String pubKeyPem = Base64.getEncoder().encodeToString(String.join("\n", parts).getBytes());

      mp.putString("pubKey", b64PubKey);
      mp.putString("pubKeyPem", pubKeyPem);

      promise.resolve(mp);

    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }
  }

  @ReactMethod
  public void rsaDecryptSharedKey(String sharedKeyb64Encb64, Promise promise) {
    try {

      String enryptedKeyB64 = RSAUtils.decryptServerSharedKey(sharedKeyb64Encb64);

      SharedPreferences pref = this.context.getSharedPreferences(SHARED_PREFENCE_NAME, Context.MODE_PRIVATE);
      SharedPreferences.Editor edit = pref.edit();
      edit.putString(ENCRYPTEDKEY_KEY, enryptedKeyB64);
      edit.commit();

      promise.resolve(true);
    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }

  }

  @ReactMethod
  public void genX25519KeyPair(Promise promise) {
    try {
      byte[][] keyPair = CurveX25519.genKeyPair();
      WritableMap mp = Arguments.createMap();

      String b64PubKey = Base64.getEncoder().encodeToString(keyPair[0]);
      String[] parts = new String[3];
      parts[0] = "-----BEGIN PUBLIC KEY-----";
      parts[1] = b64PubKey;
      parts[2] = "-----END PUBLIC KEY-----";

      String pubKeyPem = Base64.getEncoder().encodeToString(String.join("\n", parts).getBytes());

      mp.putString("pubKey", b64PubKey);
      mp.putString("pubKeyPem", pubKeyPem);

      promise.resolve(mp);

    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }
  }

  @ReactMethod
  public void getSharedKeyDecoded(Promise promise) {
    try {
      // this is seriously bad func as it exposes the secret key :|
      SharedPreferences pref = this.context.getSharedPreferences(SHARED_PREFENCE_NAME, Context.MODE_PRIVATE);
      String b64EncTextWithIV = pref.getString(ENCRYPTEDKEY_KEY, null);

      byte[] derivedSharedSecret = null;
      if (b64EncTextWithIV != null) {
        SecretKey encSSKey = CryptoUtils.getSecretKeyAES("encryptorkey", false);
        derivedSharedSecret = CryptoUtils.decryptAESGCM(encSSKey, b64EncTextWithIV);
      }
      promise.resolve(Base64.getEncoder().encodeToString(derivedSharedSecret));
    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }

  }

  @ReactMethod
  public void genSharedKey(String b64PubKeyPeerPem, Promise promise) {
    try {

      String pubKeyPem = new String(Base64.getDecoder().decode(b64PubKeyPeerPem.getBytes()));
      String b64PubKeyPeer = pubKeyPem
          .replace("-----BEGIN PUBLIC KEY-----", "")
          .replaceAll(System.lineSeparator(), "")
          .replace("-----END PUBLIC KEY-----", "");

      String enryptedKeyB64 = CurveX25519.genSharedKey(b64PubKeyPeer);

      SharedPreferences pref = this.context.getSharedPreferences(SHARED_PREFENCE_NAME, Context.MODE_PRIVATE);
      SharedPreferences.Editor edit = pref.edit();
      edit.putString(ENCRYPTEDKEY_KEY, enryptedKeyB64);
      edit.commit();

      promise.resolve(true);
    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }

  }

  @ReactMethod
  public void getChaChaKey(Promise promise) {
    try {
      SecretKey key = ChaCha20Poly1305.getKey();
      String key_b64 = Base64.getEncoder().encodeToString(key.getEncoded());
      promise.resolve(String.valueOf(key_b64));
    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }
  }

  @ReactMethod
  public void encryptChaCha(String data, Promise promise) {
    try {
      // SecretKey key=null;
      // if (key!=""){
      // byte[] keyBytes = Base64.getDecoder().decode(key);
      // key = new SecretKeySpec(keyBytes, 0, keyBytes.length, "AES");
      // }
      SharedPreferences pref = this.context.getSharedPreferences(SHARED_PREFENCE_NAME, Context.MODE_PRIVATE);
      String enryptedKeyB64 = pref.getString(ENCRYPTEDKEY_KEY, null);

      byte[][] ret = ChaCha20Poly1305.encrypt(data, enryptedKeyB64);

      WritableMap mp = Arguments.createMap();
      mp.putString("cipherText", String.valueOf(Base64.getEncoder().encodeToString(ret[0])));
      String randomKey = null;
      if (ret[1] != null) {
        randomKey = Base64.getEncoder().encodeToString(ret[1]);
      }
      mp.putString("key", randomKey);

      promise.resolve(mp);

    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }
  }

  @ReactMethod
  public void loadRSAKey(String keyText, Promise promise) {
    try {
      PublicKey serverPubKey = RSAUtils.readPublicKeyFromText(keyText);
      promise.resolve(true);
    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }

  }

  @ReactMethod
  public void encryptRSA(String data, Promise promise) {
    try {
      byte[] encryptedText = RSAUtils.encrypt(data);

      promise.resolve(String.valueOf(Base64.getEncoder().encodeToString(encryptedText)));
    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }
  }

  @ReactMethod
  public void verifySignature(String x_hmac_tag, String data, String b64InSignature, Promise promise) {
    try {
      boolean verified = RSAUtils.verifySignature(x_hmac_tag, data, b64InSignature);
      promise.resolve(verified);
    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }
  }

}
