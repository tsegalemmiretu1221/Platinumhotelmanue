import React from 'react';

const ImportantInfo = ({ language }) => {
    const t = {
        allergy: {
            en: 'If you or any of your guests have an allergy or dietary restriction, please inform your waiter and our chefs will be happy to accommodate your needs.',
            am: 'እርሶ ወይም ከእርሶ ጋር ያለ ሰው የአለርጂ ችግር ካለባችሁ እባክዎን አስተናጋጁን ያሳውቁ እና ሼፎቻችን የእርስዎን ፍላጎት ለማሟላት ደስተኞች ይሆናሉ።',
            zh: '如果您或您的任何客人有过敏或饮食限制，请告知您的服务员，我们的厨师将很乐意满足您的需求。',
            ar: 'إذا كنت أنت أو أي من ضيوفك تعانون من حساسية أو قيود غذائية، يرجى إبلاغ النادل وسيسعد طهاتنا بتلبية احتياجاتك.',
            fr: "Si vous ou l'un de vos invités avez une allergie ou une restriction alimentaire, veuillez en informer votre serveur et nos chefs se feront un plaisir de répondre à vos besoins."
        }[language] || 'If you or any of your guests have an allergy or dietary restriction, please inform your waiter and our chefs will be happy to accommodate your needs.',
        vat: {
            en: 'All prices include 10% service charge & 15% VAT',
            am: 'ሁሉም ዋጋዎች 10% የአገልግሎት ክፍያ እና 15% ቫት ያካተቱ ናቸው',
            zh: '所有价格均包含10%服务费及15%增值税',
            ar: 'جميع الأسعار تشمل 10% رسوم خدمة و15% ضريبة القيمة المضافة',
            fr: 'Tous les prix incluent 10% de frais de service et 15% de TVA'
        }[language] || 'All prices include 10% service charge & 15% VAT',
        currency: {
            en: 'All prices are in Ethiopian Birr',
            am: 'ሁሉም ዋጋዎች በኢትዮጵያ ብር ናቸው',
            zh: '所有价格均以埃塞俄比亚比尔计价',
            ar: 'جميع الأسعار بالبير الإثيوبي',
            fr: 'Tous les prix sont en Birr éthiopien'
        }[language] || 'All prices are in Ethiopian Birr'
    };

    return (
        <div className="px-6 py-4 bg-amber-50 border-l-4 border-hotel-gold mx-4 rounded-r-lg shadow-sm">
            <div className="space-y-3">
                <div>
                    <div className="mb-4 flex justify-center">
                        <img
                            src="/images/alacarte_header.png"
                            alt="Alacarte Menu"
                            className="h-28 w-auto object-contain mix-blend-multiply"
                        />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {t.allergy}
                    </p>
                </div>

                <div className="pt-2 border-t border-amber-200">
                    <h4 className="text-sm font-bold text-hotel-dark">Platinum Hotel</h4>
                    <p className="text-xs text-slate-600">Addis Ababa, Ethiopia</p>
                </div>

                <div className="pt-2 border-t border-amber-200 space-y-1">
                    <p className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">
                        {t.vat}
                    </p>
                    <p className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">
                        {t.currency}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImportantInfo;
