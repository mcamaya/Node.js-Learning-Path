const http = require('http');
const url = require('url');
const fs = require('fs');

const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
    return JSON.parse(data);
});

const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;

    if(pathName === '/overview' || pathName === '/'){
        return res.end('This is the OVERVIEW');
    } else if (pathName === '/products') {
        return res.end('This is the PRODUCTS');
    }else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(productData);
    } else{
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Error 404. Page not found</h1>');
    }
})

server.listen(8080, '127.0.0.1', () => {
    console.log(`Listening on port 8080`);
});
