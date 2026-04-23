const fs = require('fs');

try {
    let data = fs.readFileSync('src/data/menuData.js', 'utf8');
    
    // Replace "ምናሌ" with "ዝርዝር" everywhere in the file
    const modifiedData = data.split('ምናሌ').join('ዝርዝር');
    
    fs.writeFileSync('src/data/menuData.js', modifiedData, 'utf8');
    console.log("Global replacement of ምናሌ with ዝርዝር complete.");
} catch (e) {
    console.error("Error:", e);
}
