const fs = require('fs');

try {
    let data = fs.readFileSync('src/data/menuData.js', 'utf8');
    
    // Replace "ዝርዝር" with "ምናሌ" in subtitles
    const modifiedData = data.replace(/subtitle_am:\s*"ዝርዝር"/g, 'subtitle_am: "ምናሌ"');
    
    fs.writeFileSync('src/data/menuData.js', modifiedData, 'utf8');
    console.log("Successfully replaced in menuData.js");
} catch (e) {
    console.error("Error reading/writing:", e);
}
