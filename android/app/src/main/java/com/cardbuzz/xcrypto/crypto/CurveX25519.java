/*
 * Copyright 2023 Sonal Gupta <reachsonalgupta@gmail.com>. All rights reserved.
 *
 * This file is part of the project XCryptoModule for android
 *
 * XCryptoModule can not be copied and/or distributed without the express
 * permission of Sonal Gupta.
 */

package com.cardbuzz.xcrypto.crypto;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.security.CryptoPrimitive;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

import java.io.ByteArrayOutputStream;

import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
//import java.security.*;
import java.security.KeyPairGenerator;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.security.spec.NamedParameterSpec;
import java.security.spec.AlgorithmParameterSpec;
import java.security.spec.MGF1ParameterSpec;
import java.security.spec.ECGenParameterSpec;
import java.security.KeyStore.PrivateKeyEntry;
import java.security.interfaces.ECPublicKey;
import java.security.interfaces.ECPrivateKey;
import java.security.interfaces.XECPublicKey;
import java.security.interfaces.XECPrivateKey;
import java.security.cert.X509Certificate;
import java.security.cert.Certificate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Base64;

import android.security.KeyStoreException;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.security.keystore.KeyProtection;
import java.security.KeyStore;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.PrivateKey;
import java.security.KeyPair;
import java.util.Calendar;
import javax.crypto.spec.PSource;
import javax.crypto.spec.OAEPParameterSpec;
import java.security.Key;
import com.cardbuzz.xcrypto.hkdf.HKDF;

import android.content.Context;
import android.content.SharedPreferences;

//-------------------------------------------------- x25519 key pair gen
//-------------------------------------------------- dh key + hkdf key exchange
public class CurveX25519 {
  public static final String TAG = "XCryptoModule";
  private static final String masterKeyAlias="cbkey";
  private static final String ssKeyAlias="sharedkey";
  private static final String encSSKeyAlias="encsharedkey";


  public static String getSharedKey(String b64PubKeyPeer) throws Exception {

    ////////////////////////////////////
    if (b64PubKeyPeer==null || b64PubKeyPeer==""){
      Log.w(TAG, "peer public key missing");
      return null;
    }

    // convert bytes to public key
    byte[] pubKeyPeerBytes = Base64.getDecoder().decode(b64PubKeyPeer);
    X509EncodedKeySpec x509KeySpec = new X509EncodedKeySpec(pubKeyPeerBytes);
    KeyFactory keyFact = KeyFactory.getInstance("XDH");
//    KeyFactory keyFact = KeyFactory.getInstance("EC"); // for ec keys
    PublicKey pubKeyPeer = keyFact.generatePublic(x509KeySpec);
//     ECPublicKey ecPubKey = (ECPublicKey) pubKeyPeer;


    // SecretKey pubKeyPeer = new SecretKeySpec(pubKeyPeerBytes,0,pubKeyPeerBytes.length, "EC");
    ////////////////////////////////////

    // get private key
    KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
    ks.load(null);

//    KeyStore.Entry entry = ks.getEntry(masterKeyAlias, null);
//    PrivateKey privKey = ((PrivateKeyEntry) entry).getPrivateKey();
    PrivateKey privKey = (PrivateKey)ks.getKey(masterKeyAlias, null);
    if (privKey == null) {
      Log.w(TAG, "No key found under alias: " + masterKeyAlias);
      return null;
    }
    if (!(privKey instanceof PrivateKey)) {
      Log.w(TAG, "Not an instance of a PrivateKey");
      return null;
    }

//    Certificate []certificates = ks.getCertificateChain(masterKeyAlias);
//    X509Certificate cert = (X509Certificate) certificates[0];
//    Log.w(TAG, "certificates: "+Base64.getEncoder().encodeToString(cert.getPublicKey().getEncoded()));

  //////////////////////////////////////
//    KeyPairGenerator kpg = KeyPairGenerator.getInstance(
//            KeyProperties.KEY_ALGORITHM_EC, "AndroidKeyStore");
//
//    kpg.initialize(new KeyGenParameterSpec.Builder(
//            "masterKeyAlias",
//            KeyProperties.PURPOSE_AGREE_KEY)
//            .setAlgorithmParameterSpec(new ECGenParameterSpec("X25519"))
//            .build());
//
//    KeyPair kp = kpg.generateKeyPair();
//    PrivateKey privKey=kp.getPrivate();


    // KeyAgreement ka = KeyAgreement.getInstance("ECDH"); // for ec keys
    KeyAgreement ka = KeyAgreement.getInstance("XDH");
    ka.init(privKey);
    ka.doPhase(pubKeyPeer, true);
    byte[] sharedSecret = ka.generateSecret();


    // HKDF derivation
    HKDF hkdf256 = HKDF.fromHmacSha256();
    byte[] derivedSharedSecret = hkdf256.extractAndExpand((byte[])null, sharedSecret, null, 32);

    // put derivedSharedSecret in KeyStore. ChaCha20 not available as of now
    // SecretKeySpec signingKey = new SecretKeySpec(derivedSharedSecret, "HmacSHA256");
    SecretKeySpec signingKey = new SecretKeySpec(derivedSharedSecret, 0, derivedSharedSecret.length, "AES");

    KeyStore.SecretKeyEntry entry = new KeyStore.SecretKeyEntry(signingKey);
    ks.setEntry(ssKeyAlias, entry,
            new KeyProtection.Builder(KeyProperties.PURPOSE_ENCRYPT)
                    .build());


    ////// cant find a way to store key for ChaCha20 in keystore
    // so enc shared key and store in shared pref
    SecretKey encSSKey = CryptoUtils.getSecretKeyAES(encSSKeyAlias,false);
    String b64EncTextWithIV = CryptoUtils.encryptAESGCM(encSSKey,derivedSharedSecret);

    return b64EncTextWithIV;
  }

  public static byte[][] getKeyPair() throws Exception {
//    KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
//    keyStore.load(null);

    KeyPairGenerator kpg = KeyPairGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_EC, "AndroidKeyStore");

    /*
    kpg.initialize(new KeyGenParameterSpec.Builder(
            masterKeyAlias,
            KeyProperties.PURPOSE_SIGN | KeyProperties.PURPOSE_VERIFY| KeyProperties.PURPOSE_AGREE_KEY)
            .setAlgorithmParameterSpec(new ECGenParameterSpec("secp256r1"))
            .setDigests(KeyProperties.DIGEST_SHA256,
                    KeyProperties.DIGEST_SHA512)
            .build());
    */

    kpg.initialize(new KeyGenParameterSpec.Builder(
          masterKeyAlias,
          KeyProperties.PURPOSE_AGREE_KEY)
            .setIsStrongBoxBacked(false)
            .setAlgorithmParameterSpec(new ECGenParameterSpec("x25519"))
            .setDigests(KeyProperties.DIGEST_NONE)
            .build());


    KeyPair kp = kpg.generateKeyPair();

    byte[][] keyPair = new byte[2][];
    keyPair[0]=kp.getPublic().getEncoded();
    // keyPair[1]=kp.getPrivate().getEncoded();


//    //////////////////
//    KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
//    ks.load(null);
////    KeyStore.Entry entry = ks.getEntry(masterKeyAlias, null);
//    Key privKey = ks.getKey(masterKeyAlias, null);
////    ks.getCertificate(masterKeyAlias)
////    PrivateKey privKey = ((PrivateKeyEntry) entry).getPrivateKey();
//
//    Certificate []certificates = ks.getCertificateChain(masterKeyAlias);
//    Log.w("XCryptoModule", "certificates: "+String.valueOf(certificates.length));
//    X509Certificate attestationCert = (X509Certificate) certificates[0];
//    Log.w("XCryptoModule", "certificates: "+Base64.getEncoder().encodeToString(attestationCert.getPublicKey().getEncoded()));
//
//
//
//
////    kpg.initialize(new KeyGenParameterSpec.Builder(
////            "masterKeyAlias",
////            KeyProperties.PURPOSE_AGREE_KEY)
////            .setAlgorithmParameterSpec(new ECGenParameterSpec("X25519"))
////            .build());
////    KeyPair kp1 = kpg.generateKeyPair();
//
////    String ss=Base64.getEncoder().encodeToString(kp1.getPublic().getEncoded());
//    String ss="MCowBQYDK2VuAyEAfFMuhhwi6IouS6mH/y/lS7btWizp33cW5RePiPjSeyQ=";
//    Log.w("XCryptoModule", "ss: "+ss);
//    byte[] pubKeyPeerBytes=Base64.getDecoder().decode(ss);
//    X509EncodedKeySpec x509KeySpec = new X509EncodedKeySpec(pubKeyPeerBytes);
//    KeyFactory keyFact = KeyFactory.getInstance("XDH");
////    KeyFactory keyFact = KeyFactory.getInstance("EC");
//    PublicKey pubKeyPeer = keyFact.generatePublic(x509KeySpec);
////     ECPublicKey ecPubKey = (ECPublicKey) pubKeyPeer;
//
//
//    KeyAgreement ka = KeyAgreement.getInstance("XDH");
//    ka.init(privKey);
////    ka.init(kp.getPrivate());
//    ka.doPhase(pubKeyPeer, true);
////    ka.doPhase(kp1.getPublic(), true);
//    byte[] secret = ka.generateSecret();
//    Log.w("XCryptoModule", "secret: "+Base64.getEncoder().encodeToString(secret));
//
////    KeyAgreement ka2 = KeyAgreement.getInstance("XDH");
////    ka2.init(kp.getPrivate());
////    ka.doPhase(pubKeyPeer, true);
//////    ka.doPhase(kp1.getPublic(), true);
////    byte[] secret2 = ka.generateSecret();
////    Log.w("XCryptoModule", "secret2: "+Base64.getEncoder().encodeToString(secret2));
//
    //////////////////

    return keyPair;
  }
  public static byte[][] getX25519KeyPair() throws Exception {
    // KeyFactory kf = KeyFactory.getInstance("XDH");
    // KeyPairGenerator kpg = KeyPairGenerator.getInstance("X25519"); // Error: X25519 KeyPairGenerator not available
    KeyPairGenerator kpg = KeyPairGenerator.getInstance("XDH");
    NamedParameterSpec paramSpec = new NamedParameterSpec("X25519");
    // kpg.initialize(paramSpec);
    kpg.initialize(255);
    KeyPair kp = kpg.generateKeyPair();

    byte[][] keyPair = new byte[2][];
    keyPair[0]=kp.getPrivate().getEncoded();
    keyPair[1]=kp.getPublic().getEncoded();

    return keyPair;
  }

}


/*
KeyPairGenerator kpg = KeyPairGenerator.getInstance("XDH");
NamedParameterSpec paramSpec = new NamedParameterSpec("X25519");
kpg.initialize(paramSpec); // equivalent to kpg.initialize(255)
// alternatively: kpg = KeyPairGenerator.getInstance("X25519")
KeyPair kp = kpg.generateKeyPair();

KeyFactory kf = KeyFactory.getInstance("XDH");
BigInteger u = ...
XECPublicKeySpec pubSpec = new XECPublicKeySpec(paramSpec, u);
PublicKey pubKey = kf.generatePublic(pubSpec);

KeyAgreement ka = KeyAgreement.getInstance("XDH");
ka.init(kp.getPrivate());
ka.doPhase(pubKey, true);
byte[] secret = ka.generateSecret();
*/
