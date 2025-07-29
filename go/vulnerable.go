
package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
    "os"
    "os/exec"
)

func readPassword() {
    data, _ := ioutil.ReadFile("/etc/passwd") // hardcoded sensitive file
    fmt.Println(string(data))
}

func insecureHttp() {
    resp, _ := http.Get("http://example.com") // insecure HTTP
    defer resp.Body.Close()
}

func runCommand(userInput string) {
    cmd := exec.Command("sh", "-c", userInput) // potential command injection
    out, _ := cmd.Output()
    fmt.Println(string(out))
}

func main() {
    var input string
    fmt.Scanln(&input)
    runCommand(input)
    readPassword()
    insecureHttp()
}
