/*
 * Copyright 2023 Sonal Gupta <reachsonalgupta@gmail.com>. All rights reserved.
 *
 * This file is part of the project XCryptoModule for android
 *
 * XCryptoModule can not be copied and/or distributed without the express
 * permission of Sonal Gupta.
 */

package com.xcrypto.crypto;


import java.util.Map;
import java.util.HashMap;
import android.util.Log;


import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import java.security.spec.AlgorithmParameterSpec;
import java.nio.ByteBuffer;
import java.security.SecureRandom;
import java.security.KeyStore;


import static com.xcrypto.crypto.Constants.SHARED_KEY_ALIAS;
import static com.xcrypto.crypto.Constants.ENCRYPTOR_KEY_ALIAS;

public class ChaCha20Poly1305 {
  private static final int NONCE_LEN = 12; // 96 bits, 12 bytes

  public static final String TAG = "XCryptoModule";


  public static SecretKey getKey() throws NoSuchAlgorithmException {
    KeyGenerator kg = KeyGenerator.getInstance("ChaCha20");
    kg.init(256, SecureRandom.getInstanceStrong());
    return kg.generateKey();
  }

  private static byte[] getNonce() {
    byte[] newNonce = new byte[NONCE_LEN];
    new SecureRandom().nextBytes(newNonce);
    return newNonce;
  }

  public static byte[][] encrypt(String message, String b64EncTextWithIV) throws Exception {
    // was not able to convert stored AES key to work with ChaCha20-Poly.
    // one way is to generate shared key on the fly
    //  KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
    // ks.load(null);
    // SecretKey key = (SecretKey) ks.getKey(SHARED_KEY_ALIAS, null);

    SecretKey key=null;
    byte[] ssRandomKeyBytes=null;

    if (b64EncTextWithIV!=null){
      SecretKey encSSKey = CryptoUtils.getSecretKeyAES(ENCRYPTOR_KEY_ALIAS,false);
      byte[] derivedSharedSecret = CryptoUtils.decryptAESGCM(encSSKey,b64EncTextWithIV);
      key = new SecretKeySpec(derivedSharedSecret, "ChaCha20");
    }else{
      // if null then that means not derived yet
      SecretKey ssKeyRandom = getKey();
      ssRandomKeyBytes= ssKeyRandom.getEncoded();
      key=ssKeyRandom;
    }

    if (key==null){
      Log.w(TAG, "No key genetaed OR found under alias: " + ENCRYPTOR_KEY_ALIAS);
      throw new InvalidKeyException("SecretKey must NOT be NULL");
    }

    byte[] ivBytes = getNonce();

    // "ChaCha20-Poly1305/None/NoPadding"
    Cipher cipher = Cipher.getInstance("ChaCha20-Poly1305");
    AlgorithmParameterSpec ivParameterSpec = new IvParameterSpec(ivBytes);
    cipher.init(Cipher.ENCRYPT_MODE, key, ivParameterSpec);
//    cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);

    byte[] encryptedText = cipher.doFinal(message.getBytes());
    byte[] output = ByteBuffer.allocate(encryptedText.length + NONCE_LEN)
            .put(ivBytes)
            .put(encryptedText)
            .array();

    byte[][] keyPair = new byte[2][];
    keyPair[0]=output;
    keyPair[1]=ssRandomKeyBytes;

    return keyPair;
  }

}
