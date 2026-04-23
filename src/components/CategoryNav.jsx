import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Globe, Check } from 'lucide-react';

const CategoryNav = ({ categories, activeCategory, onCategoryClick, language, setLanguage, menuType }) => {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const scrollRef = useRef(null);
    const buttonRefs = useRef({}); // Keep buttonRefs as it's used in auto-scroll useEffect
    const [showLeftIndicator, setShowLeftIndicator] = useState(false);
    const [showRightIndicator, setShowRightIndicator] = useState(true);
    const [showScrollHint, setShowScrollHint] = useState(false);

    const languages = [
        { code: 'en', displayCode: 'EN', label: 'English', flagUrl: 'https://flagcdn.com/w80/gb.png' },
        { code: 'am', displayCode: 'ET', label: 'አማርኛ', flagUrl: 'https://flagcdn.com/w80/et.png' },
        { code: 'zh', displayCode: 'CN', label: '中文', flagUrl: 'https://flagcdn.com/w80/cn.png' },
        { code: 'ar', displayCode: 'AE', label: 'العربية', flagUrl: 'https://flagcdn.com/w80/ae.png' },
        { code: 'fr', displayCode: 'FR', label: 'Français', flagUrl: 'https://flagcdn.com/w80/fr.png' }
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    const t = {
        title: language === 'am' ? 'ፕላቲኒየም ሆቴል ሜኑ' :
            language === 'zh' ? '白金酒店菜单' :
                language === 'ar' ? 'قائمة فندق بلاتينيوم' :
                    language === 'fr' ? 'MENU PLATINUM HOTEL' : 'PLATINUM HOTEL MENU',
        subtitle: language === 'am' ? 'አላካርቴ ዝርዝር' :
            language === 'zh' ? '零点菜单' :
                language === 'ar' ? 'قائمة الطعام' :
                    language === 'fr' ? 'MENU À LA CARTE' : 'ALACARTE MENU',
        categories: language === 'am' ? 'ምድቦች' :
            language === 'zh' ? '类别' :
                language === 'ar' ? 'الفئات' :
                    language === 'fr' ? 'Catégories' : 'Categories'
    };

    useEffect(() => {
        // Show hint after header animation finishes (wait 2.5s)
        const showTimer = setTimeout(() => {
            setShowScrollHint(true);
        }, 2500);

        // Hide hint 5 seconds after showing (2.5s + 5s = 7.5s)
        const hideTimer = setTimeout(() => {
            setShowScrollHint(false);
        }, 7500);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    // Auto-scroll active category into view
    useEffect(() => {
        if (scrollRef.current && buttonRefs.current[activeCategory]) {
            const container = scrollRef.current;
            const activeButton = buttonRefs.current[activeCategory];

            const containerRect = container.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();

            // Scroll the active button into the center of the container
            const scrollLeft = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }, [activeCategory]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (scrollRef.current) {
                        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                        setShowLeftIndicator(scrollLeft > 10);
                        setShowRightIndicator(scrollLeft < scrollWidth - clientWidth - 10);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial check
        }

        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 border-b max-w-[430px] mx-auto shadow-sm bg-white border-gray-100">
            {/* Title Bar */}
            <div className="px-4 py-2.5 flex items-center justify-between min-h-[56px] bg-[#084C55] border-b border-[#063b42]">
                {/* Hotel Name + Subtitle */}
                <div className="flex flex-col">
                    <span className="font-black uppercase tracking-[0.18em] text-[12px] text-[#F59E0B] leading-tight">
                        {t.title}
                    </span>
                    <div className="flex flex-col mt-0.5">
                        <span className="text-[#F59E0B]/80 text-[9px] italic font-bold tracking-widest uppercase leading-tight">
                            {t.subtitle}
                        </span>
                        <span className="text-white/40 text-[7px] font-medium tracking-[0.2em] uppercase leading-tight mt-0.5">
                            Experience Hospitality Redefined
                        </span>
                    </div>
                </div>
                {/* Language Flag Button */}
                <div className="relative flex-shrink-0 z-50">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-2 bg-black/40 text-white py-1.5 px-2.5 rounded-full border border-white/20 hover:bg-black/60 transition-all cursor-pointer shadow-lg active:scale-95 group"
                    >
                        <div className="w-6 h-4.5 overflow-hidden rounded-sm shadow-sm ring-1 ring-white/20">
                            <img 
                                src={currentLang.flagUrl ? `${import.meta.env.BASE_URL}${currentLang.flagUrl.startsWith('/') ? currentLang.flagUrl.slice(1) : currentLang.flagUrl}` : ''}
                                alt={currentLang.label}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-[10px] font-black tracking-widest opacity-90 group-hover:opacity-100 uppercase">{currentLang.displayCode}</span>
                    </button>

                    <AnimatePresence>
                        {isLangOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsLangOpen(false)}
                                    className="fixed inset-0 z-40"
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-48 bg-white rounded-[1.25rem] shadow-[0_20px_40px_-5px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden z-50 p-2"
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setIsLangOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all mb-0.5 last:mb-0 ${language === lang.code
                                                ? 'bg-[#FDF9EE] text-[#B8860B]'
                                                : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-8 h-6 overflow-hidden rounded-md shadow-sm ring-1 ring-black/5">
                                                    <img 
                                                        src={lang.flagUrl ? `${import.meta.env.BASE_URL}${lang.flagUrl.startsWith('/') ? lang.flagUrl.slice(1) : lang.flagUrl}` : ''}
                                                        alt={lang.label}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className={`text-[11px] uppercase tracking-wider ${language === lang.code ? 'font-black' : 'font-bold'}`}>{lang.label}</span>
                                            </div>
                                            {language === lang.code && <Check size={16} strokeWidth={3} className="text-[#B8860B]" />}
                                        </button>
                                    ))}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="relative pt-4 pb-0">
                    <>
                        {/* Left scroll indicator */}
                        <AnimatePresence>
                            {showLeftIndicator && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="absolute left-0 top-6 bottom-4 w-12 bg-gradient-to-r from-white to-transparent z-10 flex items-center justify-start pl-1 pointer-events-none"
                                >
                                    <ChevronLeft size={20} className="text-[#F59E0B]" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Right scroll indicator */}
                        <AnimatePresence>
                            {showRightIndicator && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute right-0 top-6 bottom-4 w-12 bg-gradient-to-l from-white to-transparent z-10 flex items-center justify-end pr-1 pointer-events-none"
                                >
                                    <ChevronRight size={20} className="text-[#F59E0B]" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Scroll hint text */}
                        <AnimatePresence>
                            {showScrollHint && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        backgroundColor: '#2D5A27',
                                        color: '#ffffff',
                                        zIndex: 100
                                    }}
                                    className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full shadow-lg whitespace-nowrap uppercase font-bold text-[10px] tracking-widest text-center pointer-events-none"
                                >
                                    ← Swipe for more →
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div
                            ref={scrollRef}
                            className={`flex overflow-x-auto no-scrollbar px-6 space-x-4 scroll-smooth relative z-20 ${categories.length === 1 ? 'justify-center' : ''}`}
                        >
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    ref={(el) => (buttonRefs.current[category.id] = el)}
                                    onClick={() => onCategoryClick(category.id)}
                                    className={`
                                            flex-shrink-0 w-28 flex flex-col items-center gap-2 pb-2 transition-all duration-300
                                            ${activeCategory === category.id
                                            ? 'opacity-100'
                                            : 'opacity-80'
                                        }
                                        `}
                                >
                                    <div className={`
                                            w-24 h-24 rounded-[2.2rem] overflow-hidden transition-all duration-500 p-1.5
                                            ${activeCategory === category.id
                                            ? 'shadow-[0_15px_30px_-8px_rgba(0,0,0,0.1)] scale-110 -translate-y-2'
                                            : 'bg-white shadow-sm opacity-90'
                                        }
                                        `}>
                                        <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-gray-100">
                                            <img
                                                src={(() => {
                                                    const img = category.navImage || category.headerImage || category.items?.[0]?.image || '/images/default_category.jpg';
                                                    return `${import.meta.env.BASE_URL}${img.startsWith('/') ? img.slice(1) : img}`;
                                                })()}
                                                alt={category.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <span className={`
                                            text-[11px] font-extrabold text-center leading-tight transition-colors duration-300 px-1 uppercase tracking-tight
                                            ${activeCategory === category.id
                                            ? 'text-[#F59E0B] font-black'
                                            : 'text-hotel-dark'
                                        }
                                `}>
                                        {(() => {
                                            const langField = `title_${language}`;
                                            return (category[langField]) ? category[langField] : category.title;
                                        })()}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </>

            </div>
        </div>
    );
};

export default CategoryNav;
