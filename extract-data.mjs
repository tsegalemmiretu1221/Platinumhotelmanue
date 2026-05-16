import { foodData, drinksData, cocktailData } from './src/data/menuData.js';
import fs from 'fs';

const data = { foodData, drinksData, cocktailData };
fs.writeFileSync('menuData.json', JSON.stringify(data, null, 2));
console.log('menuData.json created successfully');
