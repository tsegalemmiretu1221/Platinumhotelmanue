import { foodData, drinksData } from './src/data/menuData.js';

let itemsToFix = [];
const langs = ['am', 'fr', 'zh', 'ar'];

const checkItem = (item, catId, type) => {
    let missing = [];
    langs.forEach(l => {
        if (!item[`name_${l}`]) missing.push(`name_${l}`);
        if (item.description && !item[`description_${l}`]) missing.push(`description_${l}`);
    });
    if (missing.length > 0) {
        itemsToFix.push({ name: item.name, missing });
    }
}

foodData.forEach(cat => cat.items.forEach(item => checkItem(item, cat.id, 'food')));
drinksData.forEach(cat => cat.items.forEach(item => checkItem(item, cat.id, 'drinks')));

console.log(JSON.stringify(itemsToFix, null, 2));
