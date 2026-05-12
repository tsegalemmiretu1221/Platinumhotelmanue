import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Header from './components/Header';
import ImportantInfo from './components/ImportantInfo';
import CategoryNav from './components/CategoryNav';
import FoodCard from './components/FoodCard';
import FoodModal from './components/FoodModal';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CartButton from './components/CartButton';
import CartModal from './components/CartModal';
import DrinkOptionModal from './components/DrinkOptionModal';
import FloatingMenuToggle from './components/FloatingMenuToggle';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { loadMenuData } from './services/menuService';
import { isAdminLoggedIn } from './services/menuService';

// ── Hash-based routing helper ──────────────────────────────────────────────
function useHash() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return hash;
}

function App() {
  const hash = useHash();
  const isAdminRoute = hash === '#/admin' || hash === '#/admin/';
  const [adminLoggedIn, setAdminLoggedIn] = useState(isAdminLoggedIn);

  // ── Live menu data (supports admin edits) ──────────────────────────────
  const [liveMenu, setLiveMenu] = useState(() => loadMenuData());

  // Refresh menu when navigating away from admin back to menu
  useEffect(() => {
    if (!isAdminRoute) {
      setLiveMenu(loadMenuData());
    }
  }, [isAdminRoute]);

  // ── Menu app state ─────────────────────────────────────────────────────
  const [menuType, setMenuType] = useState('food');
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('selectedLanguage');
    if (saved) return saved;
    const browserLang = navigator.language.split('-')[0];
    const supported = ['en', 'am', 'zh', 'ar', 'fr'];
    return supported.includes(browserLang) ? browserLang : 'en';
  });
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [optionItem, setOptionItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const currentMenuData = menuType === 'food' ? liveMenu.foodData
    : menuType === 'drinks' ? liveMenu.drinksData
    : liveMenu.cocktailData;

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  useEffect(() => {
    if (currentMenuData && currentMenuData.length > 0) {
      setActiveCategory(currentMenuData[0].id);
    }
    window.scrollTo(0, 0);
  }, [menuType, liveMenu]);

  const t = {
    food: language === 'am' ? 'ምግብ' : language === 'zh' ? '美食' : language === 'ar' ? 'الأطعمة' : language === 'fr' ? 'Plats' : 'Food Menu',
    drinks: language === 'am' ? 'መጠጥ' : language === 'zh' ? '饮品' : language === 'ar' ? 'مشروبات' : language === 'fr' ? 'Boissons' : 'Drinks Bar',
    cocktails: language === 'am' ? 'ኮክቴሎች' : language === 'zh' ? '鸡尾酒' : language === 'ar' ? 'كوكتيلات' : language === 'fr' ? 'Cocktails' : 'Cocktails',
  };

  const addToCart = (item, variant = null, priceOverride = null) => {
    if (!variant && typeof item.price === 'string' && item.price.includes('/')) {
      setOptionItem(item);
      return;
    }
    const finalItem = variant
      ? { ...item, name: `${item.name} (${variant})`, price: priceOverride, id: `${item.name}-${variant}` }
      : item;
    setCartItems(prev => {
      const existing = prev.find(i => i.name === finalItem.name);
      if (existing) return prev.map(i => i.name === finalItem.name ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...finalItem, quantity: 1 }];
    });
  };

  const handleOptionConfirm = (variant, price) => {
    if (optionItem) { addToCart(optionItem, variant, price); setOptionItem(null); }
  };

  const updateQuantity = (itemName, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.name === itemName) {
        const newQty = Math.max(0, item.quantity + delta);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => setCartItems([]);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryClick = React.useCallback((id) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 240;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '-240px 0px -40% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveCategory(entry.target.id); });
    }, observerOptions);
    let attempts = 0;
    let timer;
    const attach = () => {
      currentMenuData.forEach(cat => {
        const el = document.getElementById(cat.id);
        if (el) observer.observe(el);
      });
      if (++attempts < 10) timer = setTimeout(attach, 100);
    };
    timer = setTimeout(attach, 350);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [currentMenuData]);

  // ── Admin routing ────────────────────────────────────────────────────────
  if (isAdminRoute) {
    if (!adminLoggedIn) {
      return <AdminLogin onLogin={() => setAdminLoggedIn(true)} />;
    }
    return (
      <AdminPanel onLogout={() => {
        setAdminLoggedIn(false);
        window.location.hash = '#/';
      }} />
    );
  }

  // ── Main menu app ────────────────────────────────────────────────────────
  return (
    <div className='min-h-screen font-sans overflow-x-hidden selection:bg-hotel-gold/30 bg-slate-50 text-hotel-dark' dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Layout>
        <CategoryNav
          categories={currentMenuData}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          language={language}
          setLanguage={setLanguage}
          menuType={menuType}
        />

        <div className="pt-[184px]">
          <Header language={language} />
        </div>

        <ImportantInfo language={language} />

        <main className="px-4 py-4 flex-grow">
          {/* Menu Type Toggle */}
          <div className="flex justify-center mb-10 sticky top-[184px] z-30 py-2 gap-3">
            {['food', 'drinks', 'cocktails'].map(type => (
              <button key={type} onClick={() => setMenuType(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg border ${menuType === type ? 'bg-[#084C55] text-[#F59E0B] transform scale-105 border-transparent' : 'bg-white text-slate-500 border-gray-200 hover:text-[#084C55]'}`}>
                {t[type]}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={menuType} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
              {currentMenuData.map((category) => (
                <section key={category.id} id={category.id} className="mb-12 text-center scroll-mt-[240px]">
                  <div className="inline-flex flex-col items-center mb-8">
                    <div className="w-16 h-1 mb-1 bg-[#F59E0B]"></div>
                    <h2 className="text-3xl font-black uppercase tracking-widest leading-none text-black">
                      {(() => { const lf = `title_${language}`; return category[lf] || category.title; })()}
                    </h2>
                    {category.subtitle && (
                      <div className="relative mt-1">
                        <div className={`px-3 py-0.5 text-xs font-bold uppercase tracking-wider transform -skew-x-12 relative z-10 ${category.subtitleColor ? '' : 'bg-black text-white'}`}
                          style={category.subtitleColor ? { color: category.subtitleColor, backgroundColor: 'transparent', fontSize: '1.25rem', fontWeight: 900 } : {}}>
                          <span className="block transform skew-x-12">
                            {(() => { const lf = `subtitle_${language}`; return category[lf] || category.subtitle; })()}
                          </span>
                        </div>
                        {!category.subtitleColor && <div className="absolute top-1/2 left-0 right-0 h-0.5 -z-0 bg-[#F59E0B]"></div>}
                      </div>
                    )}
                    {!category.subtitle && <div className="w-16 h-1 bg-[#F59E0B] mt-1"></div>}
                  </div>
                  {category.description && (
                    <p className="text-sm text-slate-600 mb-6 italic opacity-90 max-w-[85%] mx-auto leading-relaxed">
                      {(() => { const lf = `description_${language}`; return category[lf] || category.description; })()}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-3 text-left">
                    {category.items.map((item, index) => (
                      <FoodCard key={`${category.id}-${index}`} item={item} onClick={setSelectedItem} onAddToCart={addToCart} language={language} menuType={menuType} />
                    ))}
                  </div>
                  <div className="mt-8 mb-4 border-b-2 border-slate-100 opacity-60 rounded-full mx-4"></div>
                </section>
              ))}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer language={language} />

        <FoodModal item={selectedItem} onClose={() => setSelectedItem(null)} language={language} />
        <DrinkOptionModal item={optionItem} onClose={() => setOptionItem(null)} onConfirm={handleOptionConfirm} language={language} />
        <ScrollToTop />
        <CartButton itemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} onClick={() => setIsCartOpen(true)} language={language} />
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onUpdateQuantity={updateQuantity} onClearCart={clearCart} language={language} />
        <FloatingMenuToggle currentMenu={menuType} onToggle={setMenuType} language={language} />


      </Layout>
    </div>
  );
}

export default App;
