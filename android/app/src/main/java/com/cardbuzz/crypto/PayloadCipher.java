package com.cardbuzz.crypto;
import java.nio.ByteBuffer;
import java.security.SecureRandom;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import com.cardbuzz.crypto.RandomKeyGenerator;
public class PayloadCipher {

    private static final String ALGORITHM = "ChaCha20-Poly1305/None/NoPadding";

    public static String encrypt(String data, String secretKey) throws Exception {
        // Generate a random IV if the secret key is not specified.
        if (secretKey == null) {
            secretKey = RandomKeyGenerator.genRandomKey_b64(32);
        }

        // Create a SecretKeySpec from the secret key.
        SecretKey key = new SecretKeySpec(Base64.getDecoder().decode(secretKey), ALGORITHM);

        // Generate a random IV.
        byte[] iv = RandomKeyGenerator.genRandomKey_bytes(12);

        // Create a Cipher object.
        Cipher cipher = Cipher.getInstance(ALGORITHM);

        // Initialize the cipher for encryption.
        cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(iv));

        // Encrypt the data.
        byte[] ciphertext = cipher.doFinal(data.getBytes("utf-8"));

        // Get the authentication tag.
        // byte[] authTag = cipher.getAuthTag();

        // Combine the IV, ciphertext, and authentication tag into a single byte array.
        // byte[] encryptedPayload = new byte[iv.length + ciphertext.length];
        // System.arraycopy(iv, 0, encryptedPayload, 0, iv.length);
        // System.arraycopy(ciphertext, 0, encryptedPayload, iv.length, ciphertext.length);
        // System.arraycopy(authTag, 0, encryptedPayload, iv.length + ciphertext.length, authTag.length);
        // byte[] encryptedPayload = ByteBuffer.allocate(ciphertext.length + iv.length)
        // .put(iv)
        // .put(ciphertext)
        // .array();
        System.out.println(secretKey);
        return secretKey;
        // Encode the encrypted payload to Base64.
        // String out = Base64.getEncoder().encodeToString(encryptedPayload);
        // System.out.println(out);
        // return out;

    }
}
