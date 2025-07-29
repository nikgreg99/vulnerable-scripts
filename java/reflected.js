// Vulnerability: Reflected Cross-Site Scripting (XSS)

const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;

    // 🔴 Dangerous reflection of user-controlled input
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<h1>Hello ${query.name}</h1>`); // ❌ No sanitization
}).listen(8080);