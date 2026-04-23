const fs = require('fs');

try {
    let data = fs.readFileSync('src/data/menuData.js', 'utf8');
    
    // Replace "ሜኑ" back to "ዝርዝር" in subtitle_am
    const modifiedData = data.replace(/subtitle_am:\s*"ሜኑ"/g, 'subtitle_am: "ዝርዝር"');
    
    fs.writeFileSync('src/data/menuData.js', modifiedData, 'utf8');
    console.log("Successfully updated 'ሜኑ' back to 'ዝርዝር' in menuData.js");
} catch (e) {
    console.error("Error reading/writing:", e);
}
