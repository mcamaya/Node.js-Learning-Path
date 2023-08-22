const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate.js');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const slugs = productData.map(el => slugify(el.productName, {lower: true}));
// console.log(slugs);

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    //overview page
    if(pathname === '/overview' || pathname === '/'){
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        const cardsHtml = productData.map(e => replaceTemplate(tempCard, e)).join('');;
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        return res.end(output);

    //product page
    } else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const singleProduct = productData[query.id];
        const output = replaceTemplate(tempProduct, singleProduct)
        return res.end(output);

    //API
    }else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(data);

    //not found
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
