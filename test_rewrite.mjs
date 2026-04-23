import fs from 'fs';
import { foodData, drinksData } from './src/data/menuData.js';

fs.writeFileSync('./test_menuData.js', 
  `export const foodData = ${JSON.stringify(foodData, null, 4)};\n\nexport const drinksData = ${JSON.stringify(drinksData, null, 4)};\n`
);
