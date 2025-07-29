import crypto from "crypto";
import axios from "axios";
import express from "express";
import fs from "fs";

// --- ✅ Hardcoded secrets (Bearer) ---
const GITHUB_TOKEN = "ghp_1234567890abcdefSecretToken";
const JWT_SECRET = "very_secret_jwt_key";

// --- ✅ Insecure HTTP (Bearer) ---
async function getPublicData(): Promise<void> {
  const res = await axios.get("http://api.insecure.example.com/data");
  console.log(res.data);
}

// --- ✅ Weak hashing (Bearer) ---
function hashPassword(password: string): string {
  const hash = crypto.createHash("md5"); // Insecure hash
  hash.update(password);
  return hash.digest("hex");
}

// --- ✅ Weak encryption (Bearer) ---
function encryptCard(cardNumber: string): string {
  const key = Buffer.from("1234567890abcdef");
  const cipher = crypto.createCipheriv("aes-128-ecb", key, null); // ECB mode
  let encrypted = cipher.update(cardNumber, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// --- ✅ Dangerous code execution (Bearer) ---
function executeUserInput(input: string): void {
  eval(input); // Dangerous!
}

// --- ✅ Logs PII (Bearer) ---
function processUser(input: { name: string; ssn: string }): void {
  console.log("User info:", input); // Logs sensitive info
}

// --- ✅ Insecure cookies (Bearer) ---
const app = express();
app.get("/cookie", (req, res) => {
  res.cookie("session_id", "abc123"); // No Secure/HttpOnly/SameSite flags
  res.send("Insecure cookie set");
});

// --- App startup ---
app.listen(8080, () => {
  console.log("Vulnerable TypeScript app running on port 8080");

  getPublicData();
  console.log("Hashed:", hashPassword("password123"));
  console.log("Encrypted:", encryptCard("4111111111111111"));
  executeUserInput("console.log('Running eval code...')");
  processUser({ name: "Alice", ssn: "123-45-6789" });
});
