import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

const CartModal = ({ isOpen, onClose, items, onUpdateQuantity, onClearCart, language }) => {
    const translations = {
        en: { title: 'My Order', empty: 'Your order is empty', total: 'Total Amount', clear: 'Clear', orderMore: 'Order More', items: 'Items Selected', item: 'Item Selected' },
        am: { title: 'የእኔ ትዕዛዝ', empty: 'ቅርጫትዎ ባዶ ነው', total: 'ጠቅላላ ዋጋ', clear: 'ሰርዝ', orderMore: 'ተጨማሪ እዘዝ', items: 'የተመረጡ', item: 'የተመረጠ' },
        zh: { title: '我的订单', empty: '您的购物车是空的', total: '总金额', clear: '清空', orderMore: '继续点餐', items: '已选项目', item: '已选项目' },
        ar: { title: 'طلبي', empty: 'سلتك فارغة', total: 'المبلغ الإجمالي', clear: 'مسح', orderMore: 'اطلب المزيد', items: 'العناصر المختارة', item: 'العنصر المختار' },
        fr: { title: 'Ma Commande', empty: 'Votre panier est vide', total: 'Montant Total', clear: 'Effacer', orderMore: 'Commander Plus', items: 'Articles Sélectionnés', item: 'Article Sélectionné' }
    };

    const t = translations[language] || translations.en;
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const total = items.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/,/g, ''));
        return acc + (price * item.quantity);
    }, 0);

    if (!isOpen) return null;

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
                    className="bg-white rounded-[32px] overflow-hidden shadow-2xl max-w-sm w-full relative max-h-[90vh] flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                        <div>
                            <h2 className="text-2xl font-black text-hotel-dark uppercase tracking-wide">{t.title}</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                                {items.length} {items.length === 1 ? t.item : t.items}
                            </p>
                        </div>
                        <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-hotel-dark">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-grow overflow-y-auto p-6 no-scrollbar">
                        {items.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShoppingBag size={24} className="text-slate-300" />
                                </div>
                                <p className="text-slate-400 font-bold uppercase tracking-wider text-sm">{t.empty}</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {items.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div className="flex-grow">
                                            <h3 className="text-sm font-black text-hotel-dark uppercase leading-tight">
                                                {(() => {
                                                    const langField = `name_${language}`;
                                                    return (item[langField]) ? item[langField] : item.name;
                                                })()}
                                            </h3>
                                            <p className="text-hotel-dark text-xs font-bold mt-1">{item.price} ETB</p>
                                        </div>
                                        <div className="flex items-center bg-slate-50 rounded-full p-1 border border-slate-100">
                                            <button
                                                onClick={() => onUpdateQuantity(item.name, -1)}
                                                className="w-7 h-7 flex items-center justify-center text-hotel-dark hover:bg-white rounded-full transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-black text-hotel-dark leading-none">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.name, 1)}
                                                className="w-7 h-7 flex items-center justify-center text-hotel-dark hover:bg-white rounded-full transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
                            <div className="flex justify-between items-end mb-6">
                                <span className="text-xs text-slate-400 font-black uppercase tracking-widest">{t.total}</span>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-hotel-dark">
                                        {total.toLocaleString()}
                                        <span className="text-sm ml-1">ETB</span>
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={onClearCart}
                                    className="flex items-center justify-center gap-2 py-3.5 px-4 bg-white border border-slate-200 rounded-2xl text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                                >
                                    <Trash2 size={14} /> {t.clear}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="py-3.5 px-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-200"
                                >
                                    {t.orderMore}
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CartModal;
