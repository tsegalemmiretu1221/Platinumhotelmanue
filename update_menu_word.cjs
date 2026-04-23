const fs = require('fs');

try {
    let data = fs.readFileSync('src/data/menuData.js', 'utf8');
    
    // Replace "ምናሌ" with "ሜኑ" in subtitle_am
    const modifiedData = data.replace(/subtitle_am:\s*"ምናሌ"/g, 'subtitle_am: "ሜኑ"');
    
    fs.writeFileSync('src/data/menuData.js', modifiedData, 'utf8');
    console.log("Successfully updated 'ምናሌ' to 'ሜኑ' in menuData.js");
} catch (e) {
    console.error("Error reading/writing:", e);
}
