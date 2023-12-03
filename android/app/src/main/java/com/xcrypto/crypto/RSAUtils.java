/*
 * Copyright 2023 Sonal Gupta <reachsonalgupta@gmail.com>. All rights reserved.
 *
 * This file is part of the project XCryptoModule for android
 *
 * XCryptoModule can not be copied and/or distributed without the express
 * permission of Sonal Gupta.
 */

package com.xcrypto.crypto;


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
import java.security.SecureRandom;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.PublicKey;
import java.nio.charset.Charset;
import java.security.MessageDigest;
//import java.util.HexFormat;

import android.security.KeyStoreException;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.security.keystore.KeyProtection;
import java.security.KeyStore;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.KeyPair;
import java.util.Calendar;
import java.security.Key;
import com.xcrypto.hkdf.HKDF;
import java.security.KeyStore.PrivateKeyEntry;

import static com.xcrypto.crypto.Constants.*;

public class RSAUtils {
  public static final String TAG = "XCryptoModule";

  private static PublicKey serverPubKey = null;

  public static PublicKey readPublicKeyFromFilePath(String filepath) throws Exception {
    String key = new String(Files.readAllBytes(Paths.get(filepath)), Charset.defaultCharset());
    return readPublicKeyFromText(key);
  }

  public static PublicKey readPublicKeyFromText(String key) throws Exception {
    String publicKeyPEM = key
        .replace("-----BEGIN PUBLIC KEY-----", "")
        .replaceAll(System.lineSeparator(), "")
        .replace("-----END PUBLIC KEY-----", "");

    serverPubKey = getPublicKey(publicKeyPEM);

    return serverPubKey;
  }

  public static PublicKey getPublicKey(String b64PublicKey) throws Exception {
    byte[] keyBytes = Base64.getDecoder().decode(b64PublicKey.getBytes());

    KeyFactory kf = KeyFactory.getInstance("RSA");
    X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);

    // return (RSAPublicKey) kf.generatePublic(keySpec);
    return kf.generatePublic(keySpec);
  }

  public static boolean verifySignature(String x_hmac_tag, String data, String b64InSignature)
      throws NoSuchAlgorithmException, InvalidKeyException, SignatureException, UnsupportedEncodingException {

    MessageDigest md = MessageDigest.getInstance("SHA-256");
    byte[] digest = md.digest(
        data.getBytes(StandardCharsets.UTF_8));
    String encodedData = CryptoUtils.bytesToHex(digest);
    // String encodedData=HexFormat.of().formatHex(encodedhash);

    StringBuilder sb = new StringBuilder();
    sb.append(x_hmac_tag);
    sb.append("\n");
    sb.append(encodedData);
    // String payload=sb.toString();
    byte[] payload = sb.toString().getBytes(StandardCharsets.UTF_8);

    Signature signature = Signature.getInstance("SHA256withRSA");
    signature.initVerify(serverPubKey);
    signature.update(payload);
    // signature.update(payload.getBytes(StandardCharsets.UTF_8));

    return signature.verify(Base64.getDecoder().decode(b64InSignature.getBytes()));
  }

  public static byte[] encrypt(String data) throws NoSuchPaddingException, NoSuchAlgorithmException,
      InvalidKeyException, BadPaddingException, IllegalBlockSizeException, InvalidAlgorithmParameterException {

    if (serverPubKey == null)
      throw new InvalidKeyException("SecretKey must NOT be NULL");

    // "RSA/ECB/OAEPPadding"
    Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
    OAEPParameterSpec oaepParams = new OAEPParameterSpec("SHA-256", "MGF1", MGF1ParameterSpec.SHA256,
        PSource.PSpecified.DEFAULT);

    cipher.init(Cipher.ENCRYPT_MODE, serverPubKey, oaepParams);
    byte[] encryptedData = cipher.doFinal(data.getBytes());
    // byte[] encryptedData = cipher.doFinal(data.toByteArray(Charsets.UTF_8))
    return encryptedData;
  }

  private static final String KEY_ALIAS = "MyKey";

  public static byte[][] dummy() throws Exception {
    KeyStore mKeyStore = KeyStore.getInstance("AndroidKeyStore");
    mKeyStore.load(null);

    // Generate Key Pair -------------------------------------
    KeyPairGenerator kpg = KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_RSA, "AndroidKeyStore");
    kpg.initialize(new KeyGenParameterSpec.Builder(
        KEY_ALIAS,
        KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
        .setDigests(KeyProperties.DIGEST_SHA1, KeyProperties.DIGEST_SHA256, KeyProperties.DIGEST_SHA512)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_RSA_OAEP)
        .setKeySize(2048)
        .build());
    KeyPair kp = kpg.generateKeyPair();
    byte[][] keyPair = new byte[2][];
    keyPair[0] = kp.getPublic().getEncoded();

    // Encrypt -----------------------------------------------
    KeyStore.PrivateKeyEntry privateKeyEntry = (KeyStore.PrivateKeyEntry) mKeyStore.getEntry(KEY_ALIAS, null);
    PublicKey publicKey = (PublicKey) privateKeyEntry.getCertificate().getPublicKey();
    Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
    OAEPParameterSpec oaepParams1 = new OAEPParameterSpec("SHA-256", "MGF1", MGF1ParameterSpec.SHA1,
        PSource.PSpecified.DEFAULT);
    cipher.init(Cipher.ENCRYPT_MODE, publicKey, oaepParams1);
    String x = "It doesn't have to be perfect, it's just for demonstration.";

    byte[] vals = cipher.doFinal(x.getBytes("UTF-8"));

    String encryptedText = Base64.getEncoder().encodeToString(vals);

    // Decrypt -----------------------------------------------
    PrivateKey privateKey = privateKeyEntry.getPrivateKey();

    Cipher output = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
    OAEPParameterSpec oaepParams2 = new OAEPParameterSpec("SHA-256", "MGF1", MGF1ParameterSpec.SHA1,
        PSource.PSpecified.DEFAULT);

    output.init(Cipher.DECRYPT_MODE, privateKey, oaepParams2);

    byte[] bxx = Base64.getDecoder().decode(encryptedText.getBytes());
    // byte[] bxx = Base64.decode(encryptedText, Base64.DEFAULT);
    byte[] bytes = output.doFinal(bxx); // <= throws IllegalBlocksizeException

    String finalText = new String(bytes, 0, bytes.length, "UTF-8");
    Log.w(TAG, "decr=" + finalText);

    /////////////////////////////////////////////////////
    return keyPair;
  }

  public static byte[][] genKeyPair() throws Exception {
    KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
    ks.load(null);

    KeyPairGenerator kpg = KeyPairGenerator.getInstance(
        KeyProperties.KEY_ALGORITHM_RSA, "AndroidKeyStore");

    kpg.initialize(new KeyGenParameterSpec.Builder(
        RSA_MASTER_KEY_ALIAS,
        KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
        .setDigests(KeyProperties.DIGEST_SHA1, KeyProperties.DIGEST_SHA256, KeyProperties.DIGEST_SHA512)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_RSA_OAEP)
        .setKeySize(2048)
        .build());

    KeyPair kp = kpg.generateKeyPair();

    byte[][] keyPair = new byte[2][];
    keyPair[0] = kp.getPublic().getEncoded();
    return keyPair;

  }

  public static String decryptServerSharedKey(String sharedKeyb64Encb64) throws Exception {
    if (sharedKeyb64Encb64 == null || sharedKeyb64Encb64 == "") {
      Log.w(TAG, "sharedKeyb64Enc  missing");
      return null;
    }
    byte[] sharedKeyb64EncBytes = Base64.getDecoder().decode(sharedKeyb64Encb64.getBytes());
    // decryot sharedKeyb64Encb64

    KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
    ks.load(null);

    KeyStore.PrivateKeyEntry privateKeyEntry = (KeyStore.PrivateKeyEntry) ks.getEntry(RSA_MASTER_KEY_ALIAS, null);
    PublicKey publicKey = (PublicKey) privateKeyEntry.getCertificate().getPublicKey();
    PrivateKey privKey = privateKeyEntry.getPrivateKey();
    if (privKey == null) {
      Log.w(TAG, "No key found under alias: " + RSA_MASTER_KEY_ALIAS);
      return null;
    }
    if (!(privKey instanceof PrivateKey)) {
      Log.w(TAG, "Not an instance of a PrivateKey");
      return null;
    }

    Cipher output = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
    OAEPParameterSpec oaepParams = new OAEPParameterSpec("SHA-1", "MGF1", MGF1ParameterSpec.SHA1,
        PSource.PSpecified.DEFAULT);
    output.init(Cipher.DECRYPT_MODE, privKey, oaepParams);
    byte[] sharedKeyb64Bytes = output.doFinal(sharedKeyb64EncBytes);

    Log.w(TAG, "sharedKeyb64=" + new String(sharedKeyb64Bytes));
    byte[] sharedKeyBytes = Base64.getDecoder().decode(sharedKeyb64Bytes);

    // so enc shared key and store in shared pref
    SecretKey encSSKey = CryptoUtils.getSecretKeyAES(ENCRYPTOR_KEY_ALIAS, false);
    String b64EncTextWithIV = CryptoUtils.encryptAESGCM(encSSKey, sharedKeyBytes);
    Log.w(TAG, "b64EncTextWithIV=" + b64EncTextWithIV);

    return b64EncTextWithIV;
  }

}
/*
 * KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
 * kpg.initialize(1024); // speedy generation, but not secure anymore
 * KeyPair kp = kpg.generateKeyPair();
 * RSAPublicKey pubkey = (RSAPublicKey) kp.getPublic();
 * RSAPrivateKey privkey = (RSAPrivateKey) kp.getPrivate();
 */