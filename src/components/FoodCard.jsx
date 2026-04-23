import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Plus, Check } from 'lucide-react';

const FoodCard = memo(({ item, onClick, onAddToCart, language, menuType }) => {
    const getItemField = (field) => {
        // Try current language first
        const langField = `${field}_${language}`;
        if (item[langField] && item[langField].trim() !== '') return item[langField];
        // Fall back to English
        if (item[field] && item[field].trim() !== '') return item[field];
        // Fall back to any available language
        const fallbackLangs = ['am', 'zh', 'ar', 'fr', 'en'];
        for (const lang of fallbackLangs) {
            const key = lang === 'en' ? field : `${field}_${lang}`;
            if (item[key] && item[key].trim() !== '') return item[key];
        }
        return '';
    };

    const itemName = getItemField('name');
    const itemDescription = getItemField('description');

    const addLabels = {
        en: { add: "Add", added: "Added" },
        am: { add: "ጨምር", added: "ተጨምሯል" },
        zh: { add: "添加", added: "已添加" },
        ar: { add: "إضافة", added: "تمت الإضافة" },
        fr: { add: "Ajouter", added: "Ajouté" }
    };

    const labels = addLabels[language] || addLabels.en;
    const addLabel = labels.add;
    const addedLabel = labels.added;

    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = (e) => {
        e.stopPropagation();
        onAddToCart(item);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(item)}
            className="rounded-2xl overflow-hidden shadow-sm flex p-2 gap-2 cursor-pointer transition-colors relative h-full bg-white active:bg-slate-50"
        >
            {/* Food Image on Left - Only show if image exists */}
            {item.image && (
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-hotel-light">
                    <img
                        src={item.image ? `${import.meta.env.BASE_URL}${item.image.startsWith('/') ? item.image.slice(1) : item.image}` : ''}
                        alt={itemName}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Content on Right */}
            <div className="flex flex-col justify-between py-0.5 flex-1">
                <div>
                    <h3 className="text-lg font-extrabold leading-tight mb-1 text-hotel-dark">
                        {itemName}
                    </h3>

                    <div className="mb-2">
                        <span className="text-sm font-bold border-b-2 pb-0.5 text-hotel-dark border-red-600">
                            {item.price.includes('/') ? (
                                <>
                                    {item.price.split('/')[0]} <span className="text-xs font-normal text-slate-400">{language === 'am' ? 'ጠርሙስ' : language === 'zh' ? '瓶' : language === 'ar' ? 'زجاجة' : language === 'fr' ? 'Bouteille' : 'Bottle'}</span> / {item.price.split('/')[1]} <span className="text-xs font-bold text-hotel-dark">{language === 'am' ? 'ሾት' : language === 'zh' ? '杯' : language === 'ar' ? 'جرعة' : language === 'fr' ? 'Shot' : 'SHOT'}</span>
                                </>
                            ) : (
                                <>{item.price} {language === 'am' ? 'ብር' : 'ETB'}</>
                            )}
                        </span>
                    </div>

                    {itemDescription && (
                        <div className="text-[13px] leading-relaxed font-medium text-slate-600">
                            {(() => {
                                const words = itemDescription.split(' ');
                                if (words.length > 10) {
                                    return (
                                        <>
                                            {words.slice(0, 10).join(' ')}...
                                        </>
                                    );
                                }
                                return itemDescription;
                            })()}
                        </div>
                    )}
                </div>

                <div className="mt-2 flex justify-between items-end">
                    {itemDescription && itemDescription.split(' ').length > 10 ? (
                        <div className="text-slate-900 font-bold text-xs uppercase tracking-wide">
                            {{
                                en: "See more",
                                am: "ተጨማሪ ይመልከቱ",
                                zh: "查看更多",
                                ar: "مشاهدة المزيد",
                                fr: "Voir plus"
                            }[language] || "See more"}
                        </div>
                    ) : (
                        <div></div>
                    )}

                    {/* Add Button - Integrated at bottom */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdd}
                        className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all shadow-sm ${isAdded
                            ? 'bg-green-600 text-white'
                            : 'bg-hotel-gold/10 text-slate-900 hover:bg-hotel-gold hover:text-white'
                            }`}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isAdded ? (
                                <motion.div
                                    key="added"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-1"
                                >
                                    <Check size={12} strokeWidth={3} />
                                    <span className="text-[10px] font-black uppercase leading-none">{addedLabel}</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="add"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-1"
                                >
                                    <Plus size={12} />
                                    <span className="text-[10px] font-black uppercase leading-none">{addLabel}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
});

FoodCard.displayName = 'FoodCard';

export default FoodCard;
