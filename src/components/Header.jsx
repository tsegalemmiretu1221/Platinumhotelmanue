import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ language }) => {
    const text = {
        en: "Welcome",
        am: "እንኳን ደህና መጡ",
        zh: "欢迎光临",
        ar: "أهلاً بك",
        fr: "Bienvenue"
    }[language] || "Welcome";

    const subtext = {
        en: "PLATINUM HOTEL ADDIS ABABA",
        am: "ፕላቲኒየም ሆቴል አዲስ አበባ",
        zh: "亚的斯亚贝巴白金酒店",
        ar: "فندق بلاتينيوم أديس أبابا",
        fr: "HÔTEL PLATINUM ADDIS-ABEBA"
    }[language] || "PLATINUM HOTEL ADDIS ABABA";

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const child = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <header className="px-6 pt-6 pb-6">
            <motion.h1
                key={language}
                className="text-3xl font-bold text-hotel-dark tracking-tight flex"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {text.split("").map((letter, index) => (
                    <motion.span variants={child} key={index}>
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-[#084C55] font-black text-sm mt-1 tracking-wider"
            >
                {subtext}
            </motion.p>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-slate-400 text-[11px] font-medium tracking-[0.15em] uppercase mt-1.5"
            >
                Experience Hospitality Redefined
            </motion.p>
        </header>
    );
};

export default Header;
