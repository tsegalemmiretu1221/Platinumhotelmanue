import React from 'react';
import { Send, Globe, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer = ({ language }) => {
    const t = {
        description: {
            en: 'Welcome to our digital menu. Explore our wide variety of food and drinks, designed to give you the best dining experience at PLATINUM Hotel.',
            am: 'ወደ ዲጂታል ሜኑአችን እንኳን ደህና መጡ። በፕላቲኒየም ሆቴል ምርጥ የምግብ ልምድ እንዲኖርዎት ታስበው የተዘጋጁትን የተለያዩ የምግብ እና የመጠጥ አይነቶችን ይመርምሩ።',
            zh: '欢迎使用我们的数字菜单。探索我们为您精心准备的各种美食和饮料，旨在为您提供白金酒店最佳的用餐体验。',
            ar: 'مرحباً بكم في قائمة الطعام الرقمية الخاصة بنا. استكشف مجموعتنا المتنوعة من المأكولات والمشروبات، المصممة خصيصاً لتوفر لك أفضل تجربة طعام في فندق بلاتينيوم.',
            fr: 'Bienvenue sur notre menu numérique. Découvrez notre grande variété de plats et de boissons, conçus pour vous offrir la meilleure expérience culinaire au PLATINUM Hotel.'
        }[language] || 'Welcome to our digital menu. Explore our wide variety of food and drinks, designed to give you the best dining experience at PLATINUM Hotel.',
        contactUs: {
            en: 'Contact Us',
            am: 'ያግኙን',
            zh: '联系我们',
            ar: 'اتصل بنا',
            fr: 'Contactez-nous'
        }[language] || 'Contact Us',
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
        <footer className="px-6 py-8 bg-[#084C55] border-t border-[#063b42] mt-2">
            <div className="max-w-md mx-auto">
                {/* Contact Box */}
                <div className="bg-white/10 backdrop-blur-sm rounded-[2.5rem] p-6 border border-white/10 shadow-xl">
                    <h3 className="text-center text-white font-black uppercase tracking-widest text-[10px] mb-6 opacity-60">
                        {t.contactUs}
                    </h3>

                    <div className="flex flex-col gap-3">
                        {/* Phone Number Area */}
                        <div className="flex items-center gap-4 bg-white/5 py-4 px-6 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
                            <div className="bg-[#F59E0B]/10 p-2.5 rounded-xl text-[#F59E0B] group-hover:scale-110 transition-transform">
                                <Phone size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-tighter text-[#F59E0B]/70 leading-none mb-1">Call for support</span>
                                <a href="tel:+251904778822" className="text-base font-black text-[#F59E0B] tracking-tight">
                                    +251 904 778 822
                                </a>
                            </div>
                        </div>

                        {/* Website Area */}
                        <div className="flex items-center gap-4 bg-white/5 py-4 px-6 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
                            <div className="bg-[#F59E0B]/10 p-2.5 rounded-xl text-[#F59E0B] group-hover:scale-110 transition-transform">
                                <Globe size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-tighter text-[#F59E0B]/70 leading-none mb-1">Website</span>
                                <a href="https://www.platinumhoteladdis.com/" target="_blank" rel="noopener noreferrer" className="text-base font-black text-[#F59E0B] tracking-tight lowercase">
                                    platinumhoteladdis.com
                                </a>
                            </div>
                        </div>

                        {/* Location Area */}
                        <div className="flex items-center gap-4 bg-white/5 py-4 px-6 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
                            <div className="bg-[#F59E0B]/10 p-2.5 rounded-xl text-[#F59E0B] group-hover:scale-110 transition-transform">
                                <MapPin size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-tighter text-[#F59E0B]/70 leading-none mb-1">Location</span>
                                <span className="text-sm font-black text-[#F59E0B] tracking-tight">
                                    Haile Gebreselassie Road, near Megenagna, Addis Ababa - Ethiopia
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center mt-4">
                            <h3 className="text-white/40 font-black uppercase tracking-[0.3em] text-[11px] mb-6">
                                Follow Us
                            </h3>
                            <div className="flex gap-4">
                                <a href="https://www.facebook.com/PlatinumHotelAddis" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#1877F2] rounded-[1.25rem] flex items-center justify-center hover:scale-110 transition-all shadow-lg border border-white/5">
                                    <Facebook size={24} className="text-white" strokeWidth={2} />
                                </a>

                                <a href="https://www.instagram.com/platinumhoteladdis/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-[1.25rem] flex items-center justify-center hover:scale-110 transition-all shadow-lg border border-white/5">
                                    <Instagram size={24} className="text-white" strokeWidth={2} />
                                </a>

                                <a href="https://www.tiktok.com/@platinum.hotel.ad" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-black rounded-[1.25rem] flex items-center justify-center hover:scale-110 transition-all shadow-lg border border-white/5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                </a>

                                <a href="https://t.me/PlatinumCe" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#26A5E4] rounded-[1.25rem] flex items-center justify-center hover:scale-110 transition-all shadow-lg border border-white/5">
                                    <Send size={24} className="text-white -ml-0.5" strokeWidth={2} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-[11px] font-semibold text-white/60 mb-1">
                        {t.vat}
                    </p>
                    <p className="text-[11px] font-semibold text-white/60 mb-3">
                        {t.currency}
                    </p>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                        &copy; {new Date().getFullYear()} PLATINUM Hotel
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
