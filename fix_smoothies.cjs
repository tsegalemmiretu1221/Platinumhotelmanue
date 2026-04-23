const fs = require('fs');

try {
    let content = fs.readFileSync('src/data/menuData.js', 'utf8');

    // 1. Fix the Category Header for Fresh Juice & Smoothie
    const categoryHeaderTarget = `id: "fresh juice-smoothie",
        title: "FRESH JUICE & SMOOTHIE",
        title_am: "የታሸገ ውሃ",
        title_zh: "矿泉水",
        title_ar: "مياه معدنية",
        title_fr: "Eau minérale",
        headerImage: "/images/header_mineral_water.png",`;
    
    const categoryHeaderReplacement = `id: "fresh-juice-smoothie",
        title: "FRESH JUICE & SMOOTHIE",
        title_am: "ትኩስ ጁስ እና ስሙዝ",
        title_zh: "鲜榨果汁和奶昔",
        title_ar: "عصائر طازجة وسموذي",
        title_fr: "Jus Frais et Smoothie",
        headerImage: "/images/header_juices.png",`;

    content = content.replace(categoryHeaderTarget, categoryHeaderReplacement);

    // 2. Fix the Items (Global Replace for the broken placeholders)
    // We'll do them one by one to ensure accuracy
    
    const items = [
        {
            name: "Seasonal Fruit punch",
            name_am: "የወቅቱ ፍራፍሬ ፑንች",
            desc: "Seasonal Fresh Fruit with your choice.",
            desc_am: "በምጫዎ የቀረቡ ትኩስ የፍራፍሬ ጭማቂዎች።",
            desc_zh: "根据您的选择提供的季节性鲜果汁。",
            desc_ar: "فواكه موسمية طازجة حسب اختيارك.",
            desc_fr: "Fruits frais de saison selon votre choix."
        },
        {
            name: "Shake Mixed",
            name_am: "ሼክ ሚክስድ",
            desc: "Banana Strawberry Avocado Milk Chocolate Vanilla & Sugar.",
            desc_am: "ሙዝ፣ እንጆሪ፣ አቮካዶ፣ ወተት፣ ቸኮሌት፣ ቫኒላ እና ስኳር።",
            desc_zh: "香蕉、草莓、牛油果、牛奶、巧克力、香草和糖。",
            desc_ar: "موز، فراولة، أفوكادو، حليب، شوكولاتة، فانيليا وسكر.",
            desc_fr: "Banane, fraise, avocat, lait, chocolat, vanille et sucre."
        },
        {
            name: "Carrot Glow Smoothie",
            name_am: "የካሮት ግሎው ስሙዝ",
            desc: "Carrot, mango, turmeric powder and milk.",
            desc_am: "ካሮት፣ ማንጎ፣ እርድ እና ወተት።",
            desc_zh: "胡萝卜、芒果、姜黄粉和牛奶。",
            desc_ar: "جزر، مانجو، بودرة كركم وحليب.",
            desc_fr: "Carotte, mangue, curcuma et lait."
        },
        {
            name: "Berry Smoothie",
            name_am: "ቤሪ ስሙዝ",
            desc: "Strawberry, flaxseed, honey and Milk.",
            desc_am: "እንጆሪ፣ ተልባ፣ ማር እና ወተት።",
            desc_zh: "草莓、亚麻籽、蜂蜜和牛奶。",
            desc_ar: "فراولة، بذور الكتان، عسل وحليب.",
            desc_fr: "Fraise, graines de lin, miel et lait."
        },
        {
            name: "Mixed juice",
            name_am: "ሚክስድ ጁስ",
            desc: "Papaya Orange fruit Avocado Lemon & Sugar.",
            desc_am: "ፓፓያ፣ ብርቱካን፣ አቮካዶ፣ ሎሚ እና ስኳር።",
            desc_zh: "木瓜、橙子、牛油果、柠檬和糖。",
            desc_ar: "بابايا، برتقال، أفوكادو، ليمون وسكر.",
            desc_fr: "Papaye, orange, avocat, citron et sucre."
        },
        {
            name: "Papaya juice",
            name_am: "የፓፓያ ጁስ",
            desc: "Papaya fruit Lemon & Sugar.",
            desc_am: "ፓፓያ፣ ሎሚ እና ስኳር።",
            desc_zh: "木瓜、柠檬和糖。",
            desc_ar: "بابايا، ليمون وسكر.",
            desc_fr: "Papaye, citron et sucre."
        },
        {
            name: "Avocado juice",
            name_am: "የአቮካዶ ጁስ",
            desc: "Avocado Lemon & Sugar.",
            desc_am: "አቮካዶ፣ ሎሚ እና ስኳር።",
            desc_zh: "牛油果、柠檬和糖。",
            desc_ar: "أفوكادو، ليمون وسكر.",
            desc_fr: "Avocat, citron et sucre."
        },
        {
            name: "Strawberry juice",
            name_am: "የእንጆሪ ጁስ",
            desc: "Strawberry fruit Lemon & Sugar.",
            desc_am: "እንጆሪ፣ ሎሚ እና ስኳር።",
            desc_zh: "草莓、柠檬和糖。",
            desc_ar: "فراولة، ليمون وسكر.",
            desc_fr: "Fraise, citron et sucre."
        },
        {
            name: "Avocado milk shake",
            name_am: "የአቮካዶ ሚልክ ሼክ",
            desc: "Avocado Milk & Sugar.",
            desc_am: "አቮካዶ፣ ወተት እና ስኳር።",
            desc_zh: "牛油果、牛奶和糖。",
            desc_ar: "أفوكادو، حليب وسكر.",
            desc_fr: "Avocat, lait et sucre."
        },
        {
            name: "Beetroot Smoothie",
            name_am: "የቀይ ስር ስሙዝ",
            desc: "Strawberry Flaxseed, honey and Milk.", // Kept original desc source but will use proper amharic
            desc_am: "ቀይ ስር፣ ተልባ፣ ማር እና ወተት።",
            desc_zh: "甜菜根、亚麻籽、蜂蜜和牛奶。",
            desc_ar: "بنجر، بذور الكتان، عسل وحليب.",
            desc_fr: "Betterave, graines de lin, miel et lait."
        },
        {
            name: "Green Detox Smoothie",
            name_am: "ግሪን ዲቶክስ ስሙዝ",
            desc: "Cucumber, spinach, lemon and ginger. Served with your choice of two accompaniments: (Thick fried potato, Garlic mashed potato, Steamed vegetable, Sautéed kale, or Plain rice) and a choice of sauce (Balsamic Dill, Pepper corn, Mushroom, Garlic butter, or Cream sauce).",
            desc_am: "ዱባ፣ ስፒናች፣ ሎሚ እና ዝንጅብል። በሁለት ተጨማሪዎች ምርጫ የቀረበ: (ወፍራም የተጠበሰ ድንች፣ የነጭ ሽንኩርት የተፈጨ ድንች፣ በእንፋሎት የበሰለ አትክልት፣ የተጠበሰ ኬል፣ ወይም ነጭ ሩዝ) እና የሶስ ምርጫ (ባሊሳሚክ ዲል፣ ፔፐር ኮርን፣ ሚሽሩም፣ ነጭ ሽንኩርት ቅቤ፣ ወይም ክሬም ሶስ)።",
            desc_zh: "黄瓜、菠菜、柠檬和姜。可选两种配菜：（厚炸薯条、蒜泥土豆、蒸蔬菜、炒羽衣甘蓝或白米饭）和一种酱汁（香脂莳萝、黑胡椒、蘑菇、蒜蓉黄油或奶油酱）。",
            desc_ar: "خيار، سبانخ، ليمون وزنجبيل. يقدم مع اختيار صنفين من الجوانب: (بطاطس مقلية سميكة، بطاطس مهروسة بالثوم، خضروات مطبوخة على البخار، كالي سوتيه، أو أرز سادة) واختيار من الصوص (شبت بلسميك، فلفل، فطر، ثوم بالزبدة، أو صوص كريمي).",
            desc_fr: "Concombre, épinards, citron et gingembre. Servi avec un choix de deux accompagnements : (Pommes de terre frites épaisses, purée de pommes de terre à l'ail, légumes vapeur, chou frisé sauté ou riz nature) et un choix de sauce (Balsamique aneth, poivre, champignons, beurre à l'ail ou sauce à la crème)."
        }
    ];

    items.forEach(item => {
        // Regex to find the broken block for each item
        const itemRegex = new RegExp(`name: "${item.name}", name_am: "[^"]*", name_zh: "[^"]*", name_ar: "[^"]*", name_fr: "[^"]*",\s*price: "([^"]*)",\s*description: "[^"]*",\s*description_am: "[^"]*",\s*description_zh: "[^"]*",\s*description_ar: "[^"]*",\s*description_fr: "[^"]*"`, 'g');
        
        const replacement = `name: "${item.name}", name_am: "${item.name_am}", name_zh: "${item.desc_zh.split('、')[0]}", name_ar: "${item.desc_ar.split('،')[0]}", name_fr: "${item.name}",
                price: "$1",
                description: "${item.desc}",
                description_am: "${item.desc_am}",
                description_zh: "${item.desc_zh}",
                description_ar: "${item.desc_ar}",
                description_fr: "${item.desc_fr}"`;
        
        // Wait, I messed up the zh/ar name logic in the simple split above. Let's do it manually or just use proper names.
        // Actually, the names in zh/ar should be translations of the names, not the descriptions.
    });

    // Let's rewrite the script to be simpler and safer.
    // I'll just use a direct replace for the whole category block since I have the line numbers and structure.
    
} catch (e) {
    console.error(e);
}
