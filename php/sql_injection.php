<?php

// Vulnerability: SQL Injection (Bearer-detectable)
$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_GET['username'];  // 🔴 Untrusted input
$query = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($query);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        echo "User: " . $row["username"] . "<br>";
    }
}

$conn->close();
?>
