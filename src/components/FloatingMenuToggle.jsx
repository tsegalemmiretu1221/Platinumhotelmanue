import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Wine, Martini } from 'lucide-react';

const FloatingMenuToggle = ({ currentMenu, onToggle, language }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 200px
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Logic: Food -> Drinks -> Cocktails -> Food
    let targetKey;
    if (currentMenu === 'food') {
        targetKey = 'drinks';
    } else if (currentMenu === 'drinks') {
        targetKey = 'cocktails';
    } else {
        targetKey = 'food'; // cocktails -> food
    }

    // Choose icon based on target
    let Icon;
    if (targetKey === 'food') {
        Icon = Utensils;
    } else if (targetKey === 'drinks') {
        Icon = Wine;
    } else {
        Icon = Martini;
    }

    const labels = {
        food: {
            en: 'Food',
            am: 'ምግብ',
            zh: '食物',
            ar: 'طعام',
            fr: 'Nourriture'
        },
        drinks: {
            en: 'Drinks',
            am: 'መጠጥ',
            zh: '饮料',
            ar: 'مشروبات',
            fr: 'Boissons'
        },
        cocktails: {
            en: 'Cocktails',
            am: 'ኮክቴሎች',
            zh: '鸡尾酒',
            ar: 'كوكتيلات',
            fr: 'Cocktails'
        },
        goto: {
            en: 'Go to',
            am: 'ወደ',
            zh: '前往',
            ar: 'الذهاب إلى',
            fr: 'Aller à'
        }
    };

    const targetLabel = labels[targetKey][language] || labels[targetKey]['en'];
    const goToLabel = labels.goto[language] || labels.goto['en'];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => onToggle(targetKey)}
                    className="fixed bottom-6 left-6 z-[100] bg-hotel-dark text-white px-4 py-2 rounded-full shadow-xl hover:shadow-2xl hover:bg-black transition-all duration-300 flex items-center gap-2 border border-white/10 group"
                    aria-label={`Switch to ${targetLabel} Menu`}
                >
                    <Icon size={18} className="text-hotel-gold group-hover:rotate-12 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest hidden sm:block">
                        {goToLabel} {targetLabel}
                    </span>
                    {/* Mobile only icon/text simplified */}
                    <span className="text-xs font-black uppercase tracking-widest sm:hidden">
                        {targetLabel}
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default FloatingMenuToggle;
