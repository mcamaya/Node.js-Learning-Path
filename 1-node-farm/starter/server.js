const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello from the server!!!!');
})

server.listen(8080, '127.0.0.1', () => {
    console.log(`Listening on port 8080`);
});
