import os, sys  # ❌ Multiple imports on one line (Flake8: E401)
import hashlib   # ✅ Insecure hashing (Bandit, Bearer)
import subprocess  # ✅ Dangerous shell use (Bandit)
import requests  #  Insecure HTTP (Bearer)
import json
from typing import Any  #  Unused import (Flake8: F401)

API_KEY = "sk_live_ABC123SECRET"  #  Hardcoded secret (Bearer, Bandit)
DB_PASSWORD = "root123"  # Hardcoded password

#  Function name too short (Flake8: N802), missing docstring (D103)
def a(x:int, y:str)->int:  #  No spaces (Flake8: E231), bad types (Pyright)
 return x + y  # ❌ Bad indent (Flake8: E111)

# ❌ Extra blank lines (Flake8: E303)



def hash_password(password):  # ❌ Missing type hint (Pyright), insecure hash (Bearer, Bandit)
    return hashlib.md5(password.encode()).hexdigest()  # ✅ MD5 is weak

# Dangerous use of eval
def run_user_code(code):
    eval(code)  # ✅ Dangerous eval (Bandit, Bearer)

def fetch_data():
    response = requests.get("http://example.com/api/user")  # ✅ Insecure HTTP (Bearer)
    return response.text

def delete_file(filename):
    command = f"rm {filename}"  # ✅ Shell injection (Bandit)
    subprocess.call(command, shell=True)  # ❌ shell=True is risky (Bandit)

def process_user(data):
    print("Received user data:", data)  # ✅ Logs PII (Bearer)

def load_from_file(filepath):  # ❌ Missing type hint (Pyright), unsafe (Bandit)
    with open(filepath, 'r') as f:
        return eval(f.read())  # ✅ Insecure deserialization (Bandit)

def unused_func():  # ❌ Unused function (Pylint, Flake8: F401)
    pass

if __name__ == "__main__":
    print("Hashed:", hash_password("admin123"))
    run_user_code("print('executed')")
    print(fetch_data())
    delete_file("secrets.txt")
    process_user({"name": "Bob", "ssn": "123-45-6789"})
    load_from_file("data.json")
