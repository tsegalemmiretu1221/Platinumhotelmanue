import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wine, GlassWater } from 'lucide-react'; // Using Wine for Bottle, GlassWater for Shot as generic icons

const DrinkOptionModal = ({ item, onClose, onConfirm, language }) => {
    if (!item) return null;

    const getItemField = (field) => {
        const langField = `${field}_${language}`;
        return (item[langField]) ? item[langField] : item[field];
    };

    const itemName = getItemField('name');

    const labels = {
        en: { bottle: "Bottle", shot: "Shot", select: "Please select an option" },
        am: { bottle: "ጠርሙስ", shot: "ሾት", select: "እባክዎን አማራጭ ይምረጡ" },
        zh: { bottle: "瓶", shot: "杯子", select: "请选择一个选项" },
        ar: { bottle: "زجاجة", shot: "جرعة", select: "يرجى اختيار خيار" },
        fr: { bottle: "Bouteille", shot: "Shot", select: "Veuillez choisir une option" }
    };

    const t = labels[language] || labels.en;

    const [bottlePrice, shotPrice] = item.price.split(' / ').map(p => p.trim());

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-[24px] shadow-2xl max-w-sm w-full relative overflow-hidden p-6"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <h3 className="text-xl font-black text-center text-hotel-dark mb-2">
                        {itemName}
                    </h3>
                    <p className="text-center text-slate-500 text-sm mb-6">
                        {t.select}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Bottle Option */}
                        <button
                            onClick={() => onConfirm(t.bottle, bottlePrice)}
                            className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 group-hover:bg-hotel-dark group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                                <Wine size={24} />
                            </div>
                            <span className="font-bold text-hotel-dark mb-1">{t.bottle}</span>
                            <span className="text-hotel-dark text-sm font-bold">{bottlePrice} {language === 'am' ? 'ብር' : 'ETB'}</span>
                        </button>

                        {/* Shot Option */}
                        <button
                            onClick={() => onConfirm(t.shot, shotPrice)}
                            className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 group-hover:bg-hotel-dark group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                                <GlassWater size={24} />
                            </div>
                            <span className="font-bold text-hotel-dark mb-1">{t.shot}</span>
                            <span className="text-hotel-dark text-sm font-bold">{shotPrice} {language === 'am' ? 'ብር' : 'ETB'}</span>
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DrinkOptionModal;
