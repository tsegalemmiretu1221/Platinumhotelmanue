import fs from 'fs';
const buf = fs.readFileSync('src/data/menuData.js');
console.log(buf.slice(0, 10));
