const http = require("http");

http.createServer((req, res) => {
  res.end("<h1> Bem vindo ao site</h1>");
}).listen(8181);