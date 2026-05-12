/**
 * menuService.js - Menu data + Admin auth management
 */
import { foodData as defaultFood, drinksData as defaultDrinks, cocktailData as defaultCocktails } from '../data/menuData';

const STORAGE_KEY = 'platinum_admin_menu';
const ADMIN_KEY   = 'platinum_admin_auth';
const PASS_KEY    = 'platinum_admin_pass';
const DEFAULT_PASS = 'platinum2024';

// ── Menu ─────────────────────────────────────────────────────────────────────
export function loadMenuData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const p = JSON.parse(stored);
      return {
        foodData:     p.foodData     || defaultFood,
        drinksData:   p.drinksData   || defaultDrinks,
        cocktailData: p.cocktailData || defaultCocktails,
      };
    }
  } catch (e) { console.error(e); }
  return { foodData: defaultFood, drinksData: defaultDrinks, cocktailData: defaultCocktails };
}

export function saveMenuData(foodData, drinksData, cocktailData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ foodData, drinksData, cocktailData }));
    return true;
  } catch (e) { return false; }
}

export function resetMenuData() {
  localStorage.removeItem(STORAGE_KEY);
}

// ── Auth ──────────────────────────────────────────────────────────────────────
function getPassword() {
  return localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
}

export function adminLogin(password) {
  if (password === getPassword()) {
    sessionStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem(ADMIN_KEY);
}

export function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_KEY) === 'true';
}

export function changeAdminPassword(currentPass, newPass) {
  if (currentPass !== getPassword()) return { ok: false, msg: 'Current password is incorrect.' };
  if (!newPass || newPass.length < 6)  return { ok: false, msg: 'New password must be at least 6 characters.' };
  localStorage.setItem(PASS_KEY, newPass);
  return { ok: true, msg: 'Password changed successfully!' };
}

// ── Auto-translate via MyMemory (free, no key) ────────────────────────────────
const LANG_MAP = { am: 'am', fr: 'fr', zh: 'zh', ar: 'ar' };

async function translateOne(text, targetLang) {
  if (!text || !text.trim()) return '';
  try {
    const lang = LANG_MAP[targetLang] || targetLang;
    const url  = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`;
    const res  = await fetch(url);
    const data = await res.json();
    return data.responseData?.translatedText || text;
  } catch { return text; }
}

export async function autoTranslate(name, description) {
  const langs = ['am', 'fr', 'zh', 'ar'];
  const result = {};
  await Promise.all(langs.map(async (lang) => {
    const [n, d] = await Promise.all([
      translateOne(name, lang),
      translateOne(description, lang),
    ]);
    result[`name_${lang}`]        = n;
    result[`description_${lang}`] = d;
  }));
  return result;
}
