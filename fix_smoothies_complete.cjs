const fs = require('fs');

const smoothiesCategory = `    {
        id: "fresh-juice-smoothie",
        title: "FRESH JUICE & SMOOTHIE",
        title_am: "ትኩስ ጁስ እና ስሙዝ",
        title_zh: "鲜榨果汁和奶昔",
        title_ar: "عصائر طازجة وسموذي",
        title_fr: "Jus Frais et Smoothie",
        headerImage: "/images/header_juices.png",
        items: [
            {
                name: "Seasonal Fruit punch", name_am: "የወቅቱ ፍራፍሬ ፑንች", name_zh: "鲜果奇宾", name_ar: "بنش فواكه موسمية", name_fr: "Punch aux fruits de saison",
                price: "250.00",
                description: "Seasonal Fresh Fruit with your choice.",
                description_am: "በምጫዎ የቀረቡ ትኩስ የፍራፍሬ ጭማቂዎች።",
                description_zh: "根据您的选择提供的季节性鲜果汁。",
                description_ar: "فواكه موسمية طازجة حسب اختيارك.",
                description_fr: "Fruits frais de saison selon votre choix."
            },
            {
                name: "Shake Mixed", name_am: "ሼክ ሚክስድ", name_zh: "混合奶昔", name_ar: "شيك مشكل", name_fr: "Shake Mixte",
                price: "420.00",
                description: "Banana Strawberry Avocado Milk Chocolate Vanilla & Sugar.",
                description_am: "ሙዝ፣ እንጆሪ፣ አቮካዶ፣ ወተት፣ ቸኮሌት፣ ቫኒላ እና ስኳር።",
                description_zh: "香蕉、草莓、牛油果、牛奶、巧克力、香草和糖。",
                description_ar: "موز، فراولة، أفوكادو، حليب، شوكولاتة، فانيليا وسكر.",
                description_fr: "Banane, fraise, avocat, lait, chocolat, vanille et sucre."
            },
            {
                name: "Carrot Glow Smoothie", name_am: "የካሮት ግሎው ስሙዝ", name_zh: "胡萝卜焕彩奶昔", name_ar: "سموذي توهج الجزر", name_fr: "Smoothie Éclat Carotte",
                price: "250.00",
                description: "Carrot, mango, turmeric powder and milk.",
                description_am: "ካሮት፣ ማንጎ፣ እርድ እና ወተት።",
                description_zh: "胡萝卜、芒果、姜黄粉和牛奶。",
                description_ar: "جزر، مانجو، بودرة كركم وحليب.",
                description_fr: "Carotte, mangue, curcuma et lait."
            },
            {
                name: "Berry Smoothie", name_am: "ቤሪ ስሙዝ", name_zh: "浆果奶昔", name_ar: "سموذي التوت", name_fr: "Smoothie aux Baies",
                price: "250.00",
                description: "Strawberry, flaxseed, honey and Milk.",
                description_am: "እንጆሪ፣ ተልባ፣ ማር እና ወተት።",
                description_zh: "草莓、亚麻籽、蜂蜜和牛奶。",
                description_ar: "فراولة، بذور الكتان، عسل وحليب.",
                description_fr: "Fraise, graines de lin, miel et lait."
            },
            {
                name: "Mixed juice", name_am: "ሚክስድ ጁስ", name_zh: "混合果汁", name_ar: "عصير مشكل", name_fr: "Jus Mixte",
                price: "350.00",
                description: "Papaya Orange fruit Avocado Lemon & Sugar.",
                description_am: "ፓፓያ፣ ብርቱካን፣ አቮካዶ፣ ሎሚ እና ስኳር።",
                description_zh: "木瓜、橙子、牛油果、柠檬和糖。",
                description_ar: "بابايا، برتقال، أفوكادو، ليمون وسكر.",
                description_fr: "Papaye, orange, avocat, citron et sucre."
            },
            {
                name: "Papaya juice", name_am: "የፓፓያ ጁስ", name_zh: "木瓜汁", name_ar: "عصير بابايا", name_fr: "Jus de Papaye",
                price: "250.00",
                description: "Papaya fruit Lemon & Sugar.",
                description_am: "ፓፓያ፣ ሎሚ እና ስኳር።",
                description_zh: "木瓜、柠檬和糖。",
                description_ar: "بابايا، ليمون وسكر.",
                description_fr: "Papaye, citron et sucre."
            },
            {
                name: "Pineapple juice", name_am: "የአናናስ ጁስ", name_zh: "菠萝汁", name_ar: "عصير أناناس", name_fr: "Jus d'Ananas",
                price: "250.00",
                description: "Pineapple fruit Lemon & Sugar.",
                description_am: "አናናስ፣ ሎሚ እና ስኳር።",
                description_zh: "菠萝、柠檬和糖。",
                description_ar: "أناناس، ليمون وسكر.",
                description_fr: "Ananas, citron et sucre."
            },
            {
                name: "Avocado juice", name_am: "የአቮካዶ ጁስ", name_zh: "牛油果汁", name_ar: "عصير أفوكادو", name_fr: "Jus d'Avocat",
                price: "300.00",
                description: "Avocado Lemon & Sugar.",
                description_am: "አቮካዶ፣ ሎሚ እና ስኳር።",
                description_zh: "牛油果、柠檬和糖。",
                description_ar: "أفوكادو، ليمون وسكر.",
                description_fr: "Avocat, citron et sucre."
            },
            {
                name: "Strawberry juice", name_am: "የእንጆሪ ጁስ", name_zh: "草莓汁", name_ar: "عصير فراولة", name_fr: "Jus de Fraise",
                price: "350.00",
                description: "Strawberry fruit Lemon & Sugar.",
                description_am: "እንጆሪ፣ ሎሚ እና ስኳር።",
                description_zh: "草莓、柠檬和糖。",
                description_ar: "فراولة، ليمون وسكر.",
                description_fr: "Fraise, citron et sucre."
            },
            {
                name: "Banana Milk Shake", name_am: "የሙዝ ሚልክ ሼክ", name_zh: "香蕉奶昔", name_ar: "ميلك شيك موز", name_fr: "Milk-shake à la Banane",
                price: "350.00",
                description: "Banana Milk Vanilla & Sugar.",
                description_am: "ሙዝ፣ ወተት፣ ቫኒላ እና ስኳር።",
                description_zh: "香蕉、牛奶、香草和糖。",
                description_ar: "موز، حليب، فانيليا وسكر.",
                description_fr: "Banane, lait, vanille et sucre."
            },
            {
                name: "Strawberry milk shake", name_am: "የእንጆሪ ሚልክ ሼክ", name_zh: "草莓奶昔", name_ar: "ميلك شيك فراولة", name_fr: "Milk-shake à la Fraise",
                price: "400.00",
                description: "Strawberry Milk Vanilla & Sugar.",
                description_am: "እንጆሪ፣ ወተት፣ ቫኒላ እና ስኳር።",
                description_zh: "草莓、牛奶、香草和糖。",
                description_ar: "فراولة، حليب، فانيليا وسكر.",
                description_fr: "Fraise, lait, vanille et sucre."
            },
            {
                name: "Avocado milk shake", name_am: "የአቮካዶ ሚልክ ሼክ", name_zh: "牛油果奶昔", name_ar: "ميلك شيك أفوكادو", name_fr: "Milk-shake à l'Avocat",
                price: "350.00",
                description: "Avocado Milk & Sugar.",
                description_am: "አቮካዶ፣ ወተት እና ስኳር።",
                description_zh: "牛油果、牛奶和糖。",
                description_ar: "أفوكادو، حليب وسكر.",
                description_fr: "Avocat, lait et sucre."
            },
            {
                name: "Beetroot Smoothie", name_am: "የቀይ ስር ስሙዝ", name_zh: "甜菜根奶昔", name_ar: "سموذي البنجر", name_fr: "Smoothie à la Betterave",
                price: "250.00",
                description: "Beetroot, honey and Milk.",
                description_am: "ቀይ ስር፣ ማር እና ወተት።",
                description_zh: "甜菜根、蜂蜜和牛奶。",
                description_ar: "بنجر، عسل وحليب.",
                description_fr: "Betterave, miel et lait."
            },
            {
                name: "Green Detox Smoothie", name_am: "ግሪን ዲቶክስ ስሙዝ", name_zh: "绿色排毒昔昔", name_ar: "سموذي التخلص من السموم الأخضر", name_fr: "Smoothie Détox Vert",
                price: "250.00",
                description: "Cucumber, spinach, lemon and ginger. Served with your choice of two accompaniments: (Thick fried potato, Garlic mashed potato, Steamed vegetable, Sautéed kale, or Plain rice) and a choice of sauce: (Balsamic Dill, Pepper corn, Mushroom, Garlic butter, or Cream sauce).",
                description_am: "ዱባ፣ ስፒናች፣ ሎሚ እና ዝንጅብል። በሁለት ተጨማሪዎች ምርጫ የቀረበ: (ወፍራም የተጠበሰ ድንች፣ የነጭ ሽንኩርት የተፈጨ ድንች፣ በእንፋሎት የበሰለ አትክልት፣ የተጠበሰ ኬል፣ ወይም ነጭ ሩዝ) እና የሶስ ምርጫ: (ባሊሳሚክ ዲል፣ ፔፐር ኮርን፣ ሚሽሩም፣ ነጭ ሽንኩርት ቅቤ፣ ወይም ክሬም ሶስ)።",
                description_zh: "黄瓜、菠菜、柠檬和姜。可选两种配菜：（厚炸薯条、蒜泥土豆、蒸蔬菜、炒羽衣甘蓝或白米饭）和一种酱汁：（香脂莳萝、黑胡椒、蘑菇、蒜蓉黄油或奶油酱）。",
                description_ar: "خيار، سبانخ، ليمون وزنجبيل. يقدم مع اختيار صنفين من الجوانب: (بطاطس مقلية سميكة، بطاطس مهروسة بالثوم، خضروات مطبوخة على البخار، كالي سوتيه، أو أرز سادة) واختيار من الصوص: (شبت بلسميك، فلفل، فطر، ثوم بالزبدة، أو صوص كريمي).",
                description_fr: "Concombre, épinards, citron et gingembre. Servi avec un choix de deux accompagnements : (Pommes de terre frites épaisses, purée de pommes de terre à l'ail, légumes vapeur, chou frisé sauté ou riz nature) et un choix de sauce : (Balsamique aneth, poivre, champignons, beurre à l'ail ou sauce à la crème)."
            }
        ]
    }`;

try {
    let content = fs.readFileSync('src/data/menuData.js', 'utf8');

    // Regex to find the broken category block (lines 876-1011 approximately)
    const categoryTargetRegex = /\{\s*id: "fresh juice-smoothie",[\s\S]*?name: "Green Detox Smoothie",[\s\S]*?\}\s*\]\s*\}/;
    
    content = content.replace(categoryTargetRegex, smoothiesCategory);
    
    fs.writeFileSync('src/data/menuData.js', content, 'utf8');
    console.log("Successfully fixed the Fresh Juice & Smoothie category.");
} catch (e) {
    console.error(e);
}
