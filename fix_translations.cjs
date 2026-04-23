const fs = require('fs');
let data = fs.readFileSync('src/data/menuData.js', 'utf8');

const replacements = [
    {
        name: "Heart Harvest Salad",
        name_am: "ሃርት ሀርቬስት ሰላጣ", name_zh: "丰收之心沙拉", name_ar: "سلطة هارت هارفست", name_fr: "Salade Heart Harvest",
        description_am: "አቮካዶ፣ ሽንኩርት፣ ቲማቲም፣ ቃሪያ፣ ኮሪያንደር ከሎሚ የወይራ ዘይት ድሬሲንግ እና ቶርቲላ ቺፕስ ጋር።",
        description_zh: "牛油果、洋葱碎片、番茄和辣椒，搭配香菜、柠檬橄榄油和脆玉米片。",
        description_ar: "أفوكادو، بصل مفروم، طماطم، فلفل، كزبرة، تتبيلة زيت الزيتون بالليمون مع رقائق التورتيلا.",
        description_fr: "Avocat, oignon émincé, tomate, piment, coriandre, vinaigrette à l'huile d'olive et citron avec chips de tortilla."
    },
    {
        name: "Cheese Paradise Salad",
        name_am: "ቺዝ ፓራዳይዝ ሰላጣ", name_zh: "奶酪天堂沙拉", name_ar: "سلطة جنة الجبن", name_fr: "Salade Paradis du Fromage",
        description_am: "የቲማቲም፣ ሽንኩርት፣ ዱባ፣ ሞዛሬላ ቺዝ፣ የወይራ፣ ኦሬጋኖ፣ ፓርስሌይ እና የሎሚ የወይራ ዘይት።",
        description_zh: "番茄块、洋葱、黄瓜、莫扎里拉奶酪配橄榄、干牛至、欧芹和柠檬橄榄油。",
        description_ar: "مكعبات طماطم، بصل، خيار، جبنة موزاريلا مع الزيتون، أوريجانو مجفف، بقدونس وزيت زيتون بالليمون.",
        description_fr: "Cubes de tomate, oignon, concombre, fromage mozzarella avec olives, origan sec, persil et huile d'olive au citron."
    },
    {
        name: "Urban Fusion Salad",
        name_am: "አርባን ፊውዥን ሰላጣ", name_zh: "城市融合沙拉", name_ar: "سلطة أوربان فيوجن", name_fr: "Salade Urban Fusion",
        description_am: "ትኩስ ቀይ ስር እና የሀገር ውስጥ ቺዝ ከባሊሳሚክ ድሬሲንግ ጋር።",
        description_zh: "新鲜甜菜根和当地奶酪的美味组合，淋上香浓的黑醋汁。",
        description_ar: "مزيج رائع من الشمندر الطازج والجبن المحلي مع صلصة البلسميك.",
        description_fr: "Mélange de betterave fraîche et de fromage local avec vinaigrette au vinaigre balsamique."
    },
    {
        name: "Spring Garden Salad",
        name_am: "ስፕሪንግ ጋርደን ሰላጣ", name_zh: "春日花园沙拉", name_ar: "سلطة حديقة الربيع", name_fr: "Salade Jardin de Printemps",
        description_am: "የቲዩና ቁርጥራጭ፣ ሰላጣ፣ አቮካዶ፣ ቃሪያ፣ ሽንኩርት፣ ቲማቲም፣ ጣፋጭ በቆሎ፣ ጥቁር ወይራ፣ ነጭ ሽንኩርት ክሩቶን ከሎሚ ጋር።",
        description_zh: "金枪鱼块，生菜，牛油果，辣椒，洋葱，番茄，甜玉米，黑橄榄，蒜香面包丁配柠檬。",
        description_ar: "قطع تونة، خس، أفوكادو، فلفل، بصل، طماطم، ذرة حلوة، زيتون أسود، خبز محمص بالثوم وليمون.",
        description_fr: "Morceaux de thon, laitue, avocat, piment, oignon, tomate, maïs doux, olives noires, croûtons à l'ail servis avec citron."
    },
    {
        name: "House Made Salad",
        name_am: "የቤት ውስጥ ሰላጣ", name_zh: "自制招牌沙拉", name_ar: "سلطة منزلية", name_fr: "Salade Maison",
        description_am: "ቲማቲም፣ ሽንኩርት፣ ቃሪያ፣ ዱባ፣ ሰላጣ፣ እና የቪኒገር ድሬሲንግ።",
        description_zh: "番茄，洋葱，青椒，黄瓜，生菜搭配醋汁。",
        description_ar: "طماطم، بصل، فلفل أخضر، خيار، خس، مع تتبيلة الخل.",
        description_fr: "Tomate, oignon, piment vert, concombre, laitue, vinaigrette."
    },
    {
        name: "Garden Glory Bowel Soup",
        name_am: "ጋርደን ግሎሪ ቦውል ሾርባ", name_zh: "花园荣耀汤", name_ar: "حساء جاردن جلوري", name_fr: "Soupe Garden Glory",
        description_am: "በዋናነት ወቅታዊ አትክልቶች እና የአትክልት መረቅን የያዘ።",
        description_zh: "以时令蔬菜和蔬菜高汤为主，加入香料。",
        description_ar: "يتكون أساساً من الخضروات الموسمية ومرق الخضار والتوابل.",
        description_fr: "Composé principalement de légumes de saison, d'un bouillon de légumes et d'épices."
    },
    {
        name: "Roof Top Ramen Soup",
        name_am: "ሩፍ ቶፕ ራመን ሾርባ", name_zh: "屋顶拉面汤", name_ar: "حساء رامن رووف توب", name_fr: "Soupe Ramen Roof Top",
        description_am: "ሚኔስትሮን ሾርባ በውስጡ ባቄላ እና ፓስታ ያካተተ።",
        description_zh: "蔬菜汤加入豆类和意面，浓郁美味。",
        description_ar: "حساء خضروات غني يحتوي غالباً على الفاصوليا والمعكرونة.",
        description_fr: "Soupe minestrone aux légumes, contenant souvent des haricots et parfois des pâtes."
    },
    {
        name: "Sicilian Soup",
        name_am: "ሲሲሊያን ሾርባ", name_zh: "西西里汤", name_ar: "حساء صقلي", name_fr: "Soupe Sicilienne",
        description_am: "በነጭ ሽንኩርት እና ዘቢብ የጣፈጠ ሲሲሊያን የሚት ቦል ሾርባ።",
        description_zh: "加入蒜香和葡萄干的西西里肉丸蔬菜汤。",
        description_ar: "حساء خضروات مع كرات اللحم الصقلية بنكهة الثوم والزبيب.",
        description_fr: "Boulettes de viande siciliennes parfumées à l'ail et aux raisins secs dans une soupe de légumes."
    },
    {
        name: "Vegetable Soup",
        name_am: "የአትክልት ሾርባ", name_zh: "蔬菜汤", name_ar: "حساء الخضار", name_fr: "Soupe aux Légumes",
        description_am: "የተጠበሱ አትክልቶች፣ ባሲል፣ ቲማቲም እና ወይራ ከፎካቻ ዳቦ ጋር።",
        description_zh: "新鲜烤蔬菜搭配罗勒、番茄、橄榄和佛卡夏面包。",
        description_ar: "تشكيلة من الخضار المشوية الطازجة، الريحان، الطماطم والزيتون مع خبز الفوكاشيا.",
        description_fr: "Assortiment de légumes grillés, basilic frais, tomates et olives avec pain focaccia."
    },
    {
        name: "Chicken soup",
        name_am: "የዶሮ ሾርባ", name_zh: "鸡肉汤", name_ar: "حساء الدجاج", name_fr: "Soupe au Poulet",
        description_am: "በጥሩ ሁኔታ በበሰለ ዶሮ እና ትኩስ ክሬም የተዘጋጀ ለስላሳ እና ጣፋጭ ሾርባ።",
        description_zh: "慢炖鸡肉加入淡奶油，口感丝滑，味道浓郁。",
        description_ar: "دجاج مطهو جيداً مع كريمة طازجة، قوام ناعم ونكهة غنية.",
        description_fr: "Base de poulet bien cuit avec ajout de crème fraîche, texture lisse et saveur riche."
    },
    {
        name: "Continental Breakfast",
        name_am: "ኮንቲኔንታል ቁርስ", name_zh: "欧陆式早餐", name_ar: "إفطار كونتيننتال", name_fr: "Petit-déjeuner Continental",
        description_am: "ወቅታዊ የፍራፍሬ ጭማቂ፣ ክሮሳንት፣ ዳኒሽ ማፊን፣ ቶስት ዳቦ ከቅቤ፣ ጃም እና ማር፣ ወተት፣ ወይም ትኩስ ቡና።",
        description_zh: "一杯时令果汁，牛角包，丹麦松饼，吐司配黄油、果酱、蜂蜜，以及牛奶或现煮咖啡。",
        description_ar: "كوب من عصير الفواكه الموسمية، كرواسون، مافن، توست مع زبدة، مربى وعسل، مع حليب أو قهوة طازجة.",
        description_fr: "Un verre de jus de fruits de saison, croissant, muffin, toasts avec beurre, confiture et miel avec du lait ou un café."
    },
    {
        name: "Healthy Breakfast",
        name_am: "ጤናማ ቁርስ", name_zh: "健康早餐", name_ar: "إفطار صحي", name_fr: "Petit-déjeuner Sain",
        description_am: "የጤፍ ጨጨብሳ እና ወቅታዊ ፍራፍሬዎች፣ አቮካዶ ጭማቂ፣ የዱባ ቁርጥራጭ፣ ሽንኩርት፣ ቲማቲም፣ ሰላጣ፣ ብራውን ዳቦ በጃም፣ ቅቤ እና ማር።",
        description_zh: "苔麸切切布萨和时令水果拼盘，牛油果汁，黄瓜片、洋葱、番茄和生菜沙拉，全麦吐司配果酱、黄油和蜂蜜。",
        description_ar: "تشيتشيبسا التيف وفواكه موسمية، عصير أفوكادو، شرائح خيار، بصل، طماطم، سلطة خس، توست أسمر مع مربى، زبدة وعسل.",
        description_fr: "Chechebsa au teff et assiette de fruits de saison, jus d'avocat, concombre, oignon, tomate et laitue, pain complet avec confiture, beurre et miel."
    },
    {
        name: "3 Egg Any Styel/ Scramble Egg",
        name_am: "3 እንቁላል እንደ ምርጫዎ", name_zh: "任选烹饪方式3个鸡蛋", name_ar: "ثلاث بيضات حسب اختيارك", name_fr: "3 Œufs au Choix",
        description_am: "ኦሜሌት፣ የተጠበሰ እንቁላል፣ የተመታ እንቁላል",
        description_zh: "煎蛋卷，煎鸡蛋，炒鸡蛋",
        description_ar: "أومليت، بيض مقلي، بيض مخفوق",
        description_fr: "Omelette, œufs sur le plat, œufs brouillés"
    },
    {
        name: "Eggs Benedict",
        name_am: "ኤግስ ቤኔዲክት", name_zh: "班尼迪克蛋", name_ar: "بيض بيندكت", name_fr: "Œufs Bénédicte",
        description_am: "የተቀቀለ እንቁላል ከሆላንዳይዝ ሶስ እና ቶስት ዳቦ ጋር።",
        description_zh: "水煮蛋配荷兰酱和吐司面包。",
        description_ar: "بيض مسلوق بلطف مع صلصة هولانديز وخبز محمص.",
        description_fr: "Œufs pochés avec sauce hollandaise et pain grillé."
    }
];

// Fixing the titles first for category
data = data.replace('title_am: "የሀገር ውስጥ ቁርስ",\r\n        title_zh: "民族早餐",\r\n        title_ar: "إفطار وطني",\r\n        title_fr: "Petit-déjeuner National",', 'title_am: "ሰላጣ",\r\n        title_zh: "沙拉",\r\n        title_ar: "سلطة",\r\n        title_fr: "Salade",');

data = data.replace('title_am: "የሀገር ውስጥ ቁርስ",\n        title_zh: "民族早餐",\n        title_ar: "إفطار وطني",\n        title_fr: "Petit-déjeuner National",', 'title_am: "ሰላጣ",\n        title_zh: "沙拉",\n        title_ar: "سلطة",\n        title_fr: "Salade",');

data = data.replace('title_am: "ሰላጣ እና ሾርባ",\r\n        title_zh: "沙拉和汤",\r\n        title_ar: "سلطة وحساء",\r\n        title_fr: "Salade et Soupe",', 'title_am: "ሾርባ",\r\n        title_zh: "汤",\r\n        title_ar: "حساء",\r\n        title_fr: "Soupe",');

data = data.replace('title_am: "ሰላጣ እና ሾርባ",\n        title_zh: "沙拉和汤",\n        title_ar: "سلطة وحساء",\n        title_fr: "Salade et Soupe",', 'title_am: "ሾርባ",\n        title_zh: "汤",\n        title_ar: "حساء",\n        title_fr: "Soupe",');


replacements.forEach(item => {
    // We will find the index of `name: "${item.name}"`
    let startIndex = data.indexOf(`name: "${item.name}"`);
    if(startIndex === -1) {
        console.log("NOT FOUND: " + item.name);
        return;
    }
    
    // We replace the name_* block
    let nameRegex = new RegExp(`name: "${item.name}".*?\\n`, 'g');
    data = data.replace(nameRegex, `name: "${item.name}", name_am: "${item.name_am}", name_zh: "${item.name_zh}", name_ar: "${item.name_ar}", name_fr: "${item.name_fr}",\n`);

    // We replace the description_* blocks specifically within a 1500 character window of startIndex
    let block = data.slice(startIndex, startIndex + 1500);
    
    // replace descriptions
    block = block.replace(/description_am:\s*".*?"/, `description_am: "${item.description_am}"`);
    block = block.replace(/description_zh:\s*".*?"/, `description_zh: "${item.description_zh}"`);
    block = block.replace(/description_ar:\s*".*?"/, `description_ar: "${item.description_ar}"`);
    block = block.replace(/description_fr:\s*".*?"/, `description_fr: "${item.description_fr}"`);

    data = data.substring(0, startIndex) + block + data.substring(startIndex + 1500);
});

fs.writeFileSync('src/data/menuData.js', data, 'utf8');
console.log("Translation corrections applied successfully!");
