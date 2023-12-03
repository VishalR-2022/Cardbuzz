import { NativeModules } from "react-native";
const { XCryptoModule } = NativeModules;

// interface XCryptoInterface {
//     // loads rsa public key from [keyText] and stores in-mem (static var etc)
//     loadRSAKey(keyText: string): void;
//     // encrypt via RSA/ECB/OAEPWithSHA-256AndMGF1Padding
//     encryptRSA(data: string): void;
//     /*
//       stored rsa public key
//       in_signature is b64 encoded. so decode that first
//       payload = x_hmac_tag + "\n" + SHA-256(response_body).hex()
//     */
//     verifySignature(x_hmac_tag:string, response_body:string, in_signature:string): void;
  
//     // returns ChaCha20 key 32-bytes base64-encoded
//     // eg: H0irNIZb2D+vmgh4hSbcWzYcQa+6C0AHm+UzVc6BFUI=
//     getChaChaKey(): void;
  
//     /*
//      encrypt data using ChaCha20Poly1305
//       - if devrived key has been been calculated then use that as secret key
//           returns {"cipherText":base64-encoded encrypted data, "key":null}
//       - else create a new ChaCha20 key and use that as secret key
//           returns {"cipherText":base64-encoded encrypted data, "key":new gen key as base64-encoded}
//      */
//     encryptChaCha(data: string): void;
  
//     /*
//     genX25519KeyPair
//     gen X25519 key pair in keychain/keystore and returns pub key (pem/spki) as base64 encoded
//     pubkey=
//     -----BEGIN PUBLIC KEY-----
//     MCowBQYDK2VuAyEA37KonlaonPQN1bbTrO1dTEtEPIk2S2tVJ6sud7+PbSg=
//     -----END PUBLIC KEY-----
  
//     returns
  
//     base64-encoded pubkey=
//     LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUNvd0JRWURLMlZ1QXlFQTM3S29ubGFvblBRTjFiYlRyTzFkVEV0RVBJazJTMnRWSjZzdWQ3K1BiU2c9Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==
//     */
//     genX25519KeyPair(): void;
  
//     /*
//     peer_pub_key_b64 is base64-encoded X25519 pub key(pem/spki)
//     eg: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUNvd0JRWURLMlZ1QXlFQVhCeFY3cWxxMXlGc3RIOThvakp4c0xBTUNiQytncVlNL1BGS0l5MUJ0VXc9Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo="
  
//      do base64-decoded=
//     -----BEGIN PUBLIC KEY-----
//     MCowBQYDK2VuAyEAXBxV7qlq1yFstH98ojJxsLAMCbC+gqYM/PFKIy1BtUw=
//     -----END PUBLIC KEY-----
  
//     - the func will retrieve X25519 priv key from keychain/keystore
//     - get shared key from key exchange
//     - get derived key using HKDf from HMAC-SHAR256 on shared key
//     - store derived key either in keychain/keystore OR encrypt it and save in sharedPref
//     */
//     genSharedKey(peer_pub_key_b64: string): void;
  
//     /*
//     genRSAKeyPair
//     gen RSA key pair in keychain/keystore and returns pub key (pem/spki) as base64 encoded
//     pubkey=
//       -----BEGIN PUBLIC KEY-----
//       MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr2GSnorwQ9lg7ppJ96PO
//       99GJX8uz9xDcmUKZM4eqjoI2fLSCyv/78cUnrPy03r+EncEDn5BxFxqVoKRPxk3e
//       cgWpLzxpLjMrk2YZsA9oABxLRsWaTd3Qvcb9nmgAM12yWhgJgSBV2VGrGBQz+VGe
//       qYdx5Q2wG1y7mgsM5racghLQUmG4wdh1mzXY/KkFNwT1yJ7cjgpD0VxdJCJyjLjh
//       DO2FgjdmWs+gRah4cKh5pjZVJKmCtOpXFhn1HPmQPDVpCIxAgeiDwkozH6dpN/LO
//       htCRRJvvqF3N/23pDowm+urKJCIJDMmQTsH+e0x0rbQy6cJg2uJqrvMFjkTquW18
//       GwIDAQAB
//       -----END PUBLIC KEY-----
  
//     returns
  
//     base64-encoded pubkey=
//     LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyMkdTbm9yd1E5bGc3cHBKOTZQTwo5OUdKWDh1ejl4RGNtVUtaTTRlcWpvSTJmTFNDeXYvNzhjVW5yUHkwM3IrRW5jRURuNUJ4RnhxVm9LUlB4azNlCmNnV3BMenhwTGpNcmsyWVpzQTlvQUJ4TFJzV2FUZDNRdmNiOW5tZ0FNMTJ5V2hnSmdTQlYyVkdyR0JReitWR2UKcVlkeDVRMndHMXk3bWdzTTVyYWNnaExRVW1HNHdkaDFtelhZL0trRk53VDF5SjdjamdwRDBWeGRKQ0p5akxqaApETzJGZ2pkbVdzK2dSYWg0Y0toNXBqWlZKS21DdE9wWEZobjFIUG1RUERWcENJeEFnZWlEd2tvekg2ZHBOL0xPCmh0Q1JSSnZ2cUYzTi8yM3BEb3dtK3VyS0pDSUpETW1RVHNIK2UweDByYlF5NmNKZzJ1SnFydk1GamtUcXVXMTgKR3dJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==
//     */
//     genRSAKeyPair(): void;
  
//     /*
//     rsaDecryptSharedKey
//     shared_key_b64_enc_b64 is base64-encoded rsa encrypted 32byte key
//     eg: "UWJG3wnTh7WH4oirLG6vKlxS2NoATxLyNg1woeT6QGskxSkkwk4AfJW/ar2QAKYQ0FXT1fJca9jpiD5l7jviUM3W20w1BXWAc93msxB+EUXJ6MAvJc+Eab5mh0qLZ3iPomp+6RVCQ/alaGMK6gWpEcSvqsE77FLvv2DQ8yKAPDOdEx6xaDUJznG6GiA2Xvn964eit6swM8Pr3PqKEIiRM/MMaXXweA3eTHbpNEK66N6YLvD2L4pVWTZf2VnMHYyBdwqoY7/4W7bKt7YKF2wv6LWTxR6tAczxE56xnr1vh/CInS0R9BX4SFBpI8CepgNv3tKzyJ16a994jUNLykBYNg==
  
//      do base64-decoded
//      do rsa decrypt
  
//     - the func will retrieve RSA priv key from keychain/keystore
//     - base64-decoded shared_key_b64_enc_b64
//     - decrypt shared_key_b64_enc_b64
//     - store derived key either in keychain/keystore OR encrypt it and save in sharedPref
//     */
//     rsaDecryptSharedKey(shared_key_b64_enc_b64: string): void;
  
  
//     // returns derived key stored earlier
//     getSharedKeyDecoded(): void;
//   }

export default XCryptoModule;
