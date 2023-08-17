// blocking syncronous way
const fs = require('fs');

const myText = fs.readFileSync('./txt/input.txt', 'utf-8');

const textOut = `
This is what we know about the avocado:\n${myText}
Created on ${Date.now()}
`;

fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');

console.log('------------------------------------');

//non-blocking asyncronous way
//callback hell D:
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => console.log(err));
            console.log('Your file has been written');
        });
    });
});
console.log('Will read file!');

