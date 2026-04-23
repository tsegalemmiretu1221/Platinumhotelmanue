import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const CartButton = ({ itemCount, onClick, language }) => {
    const t = {
        en: "My Order",
        am: "የእኔ ትዕዛዝ",
        zh: "我的订单",
        ar: "طلبي",
        fr: "Ma Commande"
    }[language] || "My Order";

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="fixed bottom-6 right-6 z-[90] bg-red-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
        >
            <div className="relative">
                <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
                <AnimatePresence>
                    {itemCount > 0 && (
                        <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute -top-2 -right-2 bg-hotel-gold text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-red-600"
                        >
                            {itemCount}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold uppercase tracking-widest text-xs">
                {t}
            </span>
        </motion.button>
    );
};

export default CartButton;
