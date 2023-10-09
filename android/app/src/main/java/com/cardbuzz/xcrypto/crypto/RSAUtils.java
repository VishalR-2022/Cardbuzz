/*
 * Copyright 2023 Sonal Gupta <reachsonalgupta@gmail.com>. All rights reserved.
 *
 * This file is part of the project XCryptoModule for android
 *
 * XCryptoModule can not be copied and/or distributed without the express
 * permission of Sonal Gupta.
 */

package com.cardbuzz.xcrypto.crypto;


import java.security.interfaces.RSAPublicKey;
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
import javax.crypto.spec.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PSource;
import javax.crypto.spec.OAEPParameterSpec;

import java.security.spec.AlgorithmParameterSpec;
import java.security.spec.*;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.interfaces.RSAPublicKey;
import java.security.SecureRandom;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.PublicKey;
import java.nio.charset.Charset;
import java.security.MessageDigest;
//import java.util.HexFormat;

public class RSAUtils {
  private static PublicKey serverPubKey=null;

  public static PublicKey readPublicKeyFromFilePath(String filepath) throws Exception {
    String key = new String(Files.readAllBytes(Paths.get(filepath)), Charset.defaultCharset());
    return readPublicKeyFromText(key);
  }
  public static PublicKey readPublicKeyFromText(String key) throws Exception {
    String publicKeyPEM = key
            .replace("-----BEGIN PUBLIC KEY-----", "")
            .replaceAll(System.lineSeparator(), "")
            .replace("-----END PUBLIC KEY-----", "");

    serverPubKey=getPublicKey(publicKeyPEM);

    return serverPubKey;
  }
  public static PublicKey getPublicKey(String b64PublicKey) throws Exception {
    byte[] keyBytes = Base64.getDecoder().decode(b64PublicKey.getBytes());

    KeyFactory kf = KeyFactory.getInstance("RSA");
    X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);

    // return (RSAPublicKey) kf.generatePublic(keySpec);
    return  kf.generatePublic(keySpec);
  }

  public static boolean verifySignature(String x_hmac_tag, String data,String b64InSignature)
          throws NoSuchAlgorithmException, InvalidKeyException, SignatureException, UnsupportedEncodingException {

    MessageDigest md = MessageDigest.getInstance("SHA-256");
    byte[] digest = md.digest(
            data.getBytes(StandardCharsets.UTF_8));
    String encodedData= CryptoUtils.bytesToHex(digest);
    // String encodedData=HexFormat.of().formatHex(encodedhash);

    StringBuilder sb = new StringBuilder();
    sb.append(x_hmac_tag);
    sb.append("\n");
    sb.append(encodedData);
    //String payload=sb.toString();
    byte[] payload = sb.toString().getBytes(StandardCharsets.UTF_8);

    Signature signature = Signature.getInstance("SHA256withRSA");
    signature.initVerify(serverPubKey);
    signature.update(payload);
    //signature.update(payload.getBytes(StandardCharsets.UTF_8));

    return signature.verify(Base64.getDecoder().decode(b64InSignature.getBytes()));
  }

  public static byte[] encrypt(String data) throws NoSuchPaddingException, NoSuchAlgorithmException,
          InvalidKeyException, BadPaddingException, IllegalBlockSizeException,InvalidAlgorithmParameterException {

    if(serverPubKey == null) throw new InvalidKeyException("SecretKey must NOT be NULL");

    // "RSA/ECB/OAEPPadding"
    Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
    OAEPParameterSpec oaepParams = new OAEPParameterSpec("SHA-256", "MGF1", MGF1ParameterSpec.SHA256, PSource.PSpecified.DEFAULT);

    cipher.init(Cipher.ENCRYPT_MODE, serverPubKey,oaepParams);
    byte[] encryptedData = cipher.doFinal(data.getBytes());
    // byte[] encryptedData = cipher.doFinal(data.toByteArray(Charsets.UTF_8))
    return encryptedData;
  }

}
/*
  KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
  kpg.initialize(1024); // speedy generation, but not secure anymore
  KeyPair kp = kpg.generateKeyPair();
  RSAPublicKey pubkey = (RSAPublicKey) kp.getPublic();
  RSAPrivateKey privkey = (RSAPrivateKey) kp.getPrivate();
*/