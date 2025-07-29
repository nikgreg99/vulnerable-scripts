// --- Hardcoded secrets (Bearer + njsscan) ---
const STRIPE_SECRET_KEY = "sk_live_1234567890abcdef"; // Sensitive key
const JWT_SECRET = "supersecretjwtkey"; // Sensitive secret

// --- Insecure HTTP (njsscan) ---
const axios = require('axios');
axios.get("http://example.com/api/data") // Insecure protocol
  .then(response => console.log(response.data));

// --- Weak hashing (Bearer) ---
const crypto = require("crypto");
function hashPassword(password) {
    const md5 = crypto.createHash("md5"); // Weak algorithm
    md5.update(password);
    return md5.digest("hex");
}

// --- Insecure encryption (Bearer) ---
function encryptData(data) {
    const key = Buffer.from("1234567890123456");
    const cipher = crypto.createCipheriv("aes-128-ecb", key, null); // ECB mode is insecure
    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

// --- Dangerous use of eval (Bearer + njsscan) ---
function runUserInput(input) {
    eval(input); // Code injection risk
}

// --- Local file inclusion (njsscan) ---
const fs = require("fs");
function readUserFile(fileName) {
    return fs.readFileSync(fileName, "utf8"); // Path traversal possible
}

// --- Command injection (njsscan) ---
const { exec } = require("child_process");
function runCommand(cmd) {
    exec("ping " + cmd, (err, stdout, stderr) => {
        if (err) console.error("Error:", err);
        else console.log(stdout);
    });
}

// --- Insecure cookie (Bearer + njsscan) ---
const express = require("express");
const app = express();

app.get("/set-cookie", (req, res) => {
    res.cookie("token", "abc123"); // Missing HttpOnly, Secure
    res.send("Cookie set");
});

app.listen(3000, () => {
    console.log("Vulnerable app running on port 3000");
});
