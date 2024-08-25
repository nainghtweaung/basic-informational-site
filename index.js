const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).path;
  const file = '.' + path + '.html';
  console.log(file);
  const filePath = path === '/' ? './index.html' : file;
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (/favico/g.test(file)) {
      return;
    }
    if (err) {
      res.writeHead(404, { 'Content-type': 'text/plain' });
      return res.end('File not found');
    }
    res.writeHead(200, { 'Content-type': 'text/html' });
    return res.end(data);
  });
});

server.listen(8080);
