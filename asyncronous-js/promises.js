const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            err ? reject(err.message) : resolve(data);
        });
    });
}

readFilePro(`${__dirname}/dog.txt`).then(data => {
    console.log(`Breed: ${data}`);
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(res => {
            console.log(res.body.message);
            fs.writeFile('img-dog.txt', res.body.message, err => {
                console.log('File written!');
            });
        })
        .catch(err => {
            console.log(err.message)
        })
})
