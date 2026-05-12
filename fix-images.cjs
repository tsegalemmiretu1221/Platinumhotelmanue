const fs = require('fs');
const file = 'src/data/menuData.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/"\/images\//g, '"images/');
content = content.replace(/'\/images\//g, "'images/");
fs.writeFileSync(file, content);

const file2 = 'index.html';
let content2 = fs.readFileSync(file2, 'utf8');
content2 = content2.replace(/href="\/images\//g, 'href="images/');
content2 = content2.replace(/src="\/src\/main\.jsx"/g, 'src="./src/main.jsx"');
fs.writeFileSync(file2, content2);

console.log("Fixed image paths!");
