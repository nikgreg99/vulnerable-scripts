package com.example;

import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class VulnerableApp {

    // --- Bearer + SpotBugs: API key hardcoded ---
    private static final String API_KEY = "sk_test_123456789abcdef"; // Hardcoded secret

    // --- SpotBugs: SQL Injection ---
    public void authenticateUser(String username, String password) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/users", "root", "root");
            Statement stmt = conn.createStatement();
            String query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
            ResultSet rs = stmt.executeQuery(query); // Vulnerable to SQL Injection
            if (rs.next()) {
                System.out.println("Login success");
            } else {
                System.out.println("Login failed");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // --- SpotBugs: Insecure Deserialization ---
    public void deserializeUser(byte[] data) {
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(data))) {
            Object user = ois.readObject(); // Insecure deserialization
            System.out.println("Deserialized: " + user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // --- Staticcheck/SpotBugs: Weak hashing ---
    public String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5"); // Weak hash
        byte[] hash = md.digest(password.getBytes());
        return Base64.getEncoder().encodeToString(hash);
    }

    // --- Bearer: Weak encryption (ECB mode) ---
    public String encryptCreditCard(String ccNumber) {
        try {
            SecretKeySpec key = new SecretKeySpec("MySecretKey12345".getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding"); // ECB is insecure
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encrypted = cipher.doFinal(ccNumber.getBytes());
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // --- SpotBugs: Command injection ---
    public void executeCommand(String userInput) {
        try {
            String osCommand = "ping " + userInput; // Potential command injection
            Process p = Runtime.getRuntime().exec(osCommand);
            p.waitFor();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // --- Dummy main to test functions ---
    public static void main(String[] args) throws Exception {
        VulnerableApp app = new VulnerableApp();
        app.authenticateUser("admin", "pass' OR '1'='1");
        app.deserializeUser("rO0ABXNyABFqYXZhLnV0aWwuQXJyYXlMaXN0x".getBytes()); // Dummy base64
        System.out.println(app.hashPassword("secret"));
        System.out.println(app.encryptCreditCard("4111111111111111"));
        app.executeCommand("127.0.0.1; rm -rf /");
    }
}
