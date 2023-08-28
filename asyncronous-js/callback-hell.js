const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .end((err, res) => {
            console.log(res.body.message);
            fs.writeFile('img-dog.txt', res.body.message, err => {
                err ? console.log(err.message) :
                console.log('File written!');
            });
        });
});