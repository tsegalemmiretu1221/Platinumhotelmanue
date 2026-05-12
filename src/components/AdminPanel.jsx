import React, { useState, useEffect } from 'react';
import { loadMenuData, saveMenuData, resetMenuData, adminLogout, changeAdminPassword, autoTranslate } from '../services/menuService';
import { foodData as defaultFood, drinksData as defaultDrinks, cocktailData as defaultCocktails } from '../data/menuData';

const MENU_TYPES = [
  { key: 'foodData', label: '🍽 Food Menu' },
  { key: 'drinksData', label: '🍹 Drinks Bar' },
  { key: 'cocktailData', label: '🍸 Cocktails' },
];

const emptyItem = () => ({
  name: '', price: '', description: '',
  image: '',
  name_am: '', description_am: '',
  name_fr: '', description_fr: '',
  name_zh: '', description_zh: '',
  name_ar: '', description_ar: '',
});

export default function AdminPanel({ onLogout }) {
  const [menuData, setMenuData] = useState({ foodData: [], drinksData: [], cocktailData: [] });
  const [activeMenu, setActiveMenu] = useState('foodData');
  const [activeCategory, setActiveCategory] = useState(0);
  const [editingItem, setEditingItem] = useState(null); // { catIdx, itemIdx, data }
  const [addingItem, setAddingItem] = useState(null);   // { catIdx, data }
  const [addingCategory, setAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // { catIdx, data }
  const [newCategory, setNewCategory] = useState({ id:'', title:'', subtitle:'', title_am:'', title_fr:'', title_zh:'', title_ar:'', subtitle_am:'', subtitle_fr:'', subtitle_zh:'', subtitle_ar:'', headerImage:'' });
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState('');
  const [showPassModal, setShowPassModal] = useState(false);

  useEffect(() => {
    setMenuData(loadMenuData());
  }, []);

  const currentCategories = menuData[activeMenu] || [];

  function save(data) {
    const next = { ...menuData, ...data };
    setMenuData(next);
    saveMenuData(next.foodData, next.drinksData, next.cocktailData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handlePriceChange(catIdx, itemIdx, val) {
    const cats = currentCategories.map((cat, ci) => {
      if (ci !== catIdx) return cat;
      return { ...cat, items: cat.items.map((item, ii) => ii === itemIdx ? { ...item, price: val } : item) };
    });
    setMenuData(prev => ({ ...prev, [activeMenu]: cats }));
  }

  function savePrice(catIdx, itemIdx) {
    save({ [activeMenu]: currentCategories });
  }

  function deleteItem(catIdx, itemIdx) {
    if (!window.confirm('Delete this item?')) return;
    const cats = currentCategories.map((cat, ci) => {
      if (ci !== catIdx) return cat;
      return { ...cat, items: cat.items.filter((_, ii) => ii !== itemIdx) };
    });
    save({ [activeMenu]: cats });
  }

  function openEdit(catIdx, itemIdx) {
    setEditingItem({ catIdx, itemIdx, data: { ...currentCategories[catIdx].items[itemIdx] } });
  }

  function saveEdit() {
    const { catIdx, itemIdx, data } = editingItem;
    const cats = currentCategories.map((cat, ci) => {
      if (ci !== catIdx) return cat;
      return { ...cat, items: cat.items.map((item, ii) => ii === itemIdx ? data : item) };
    });
    save({ [activeMenu]: cats });
    setEditingItem(null);
  }

  function openAdd(catIdx) {
    setAddingItem({ catIdx, data: emptyItem() });
  }

  function saveAdd() {
    const { catIdx, data } = addingItem;
    if (!data.name || !data.price) return alert('Name and Price are required.');
    const cats = currentCategories.map((cat, ci) => {
      if (ci !== catIdx) return cat;
      return { ...cat, items: [...cat.items, data] };
    });
    save({ [activeMenu]: cats });
    setAddingItem(null);
  }

  function deleteCategory(catIdx) {
    if (!window.confirm('Delete this entire category and all its items?')) return;
    const cats = currentCategories.filter((_, ci) => ci !== catIdx);
    if (activeCategory >= cats.length) setActiveCategory(Math.max(0, cats.length - 1));
    save({ [activeMenu]: cats });
  }

  function openEditCategory(catIdx) {
    setEditingCategory({ catIdx, data: { ...currentCategories[catIdx] } });
  }

  function saveEditCategory() {
    const { catIdx, data } = editingCategory;
    const cats = currentCategories.map((cat, ci) => ci === catIdx ? data : cat);
    save({ [activeMenu]: cats });
    setEditingCategory(null);
  }

  function saveNewCategory() {
    if (!newCategory.title || !newCategory.id) return alert('Title and ID are required.');
    const cat = { ...newCategory, items: [] };
    const cats = [...currentCategories, cat];
    save({ [activeMenu]: cats });
    setActiveCategory(cats.length - 1);
    setAddingCategory(false);
    setNewCategory({ id:'', title:'', subtitle:'', title_am:'', title_fr:'', title_zh:'', title_ar:'', subtitle_am:'', subtitle_fr:'', subtitle_zh:'', subtitle_ar:'', headerImage:'' });
  }

  function handleReset() {
    if (!window.confirm('Reset ALL menu to original defaults? This cannot be undone.')) return;
    resetMenuData();
    setMenuData({ foodData: defaultFood, drinksData: defaultDrinks, cocktailData: defaultCocktails });
  }

  const filteredCategories = currentCategories.map((cat, ci) => ({
    ...cat,
    _ci: ci,
    items: cat.items.map((item, ii) => ({ ...item, _ii: ii }))
      .filter(item => !search || item.name.toLowerCase().includes(search.toLowerCase())),
  })).filter(cat => !search || cat.items.length > 0 || cat.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <div style={{ background: 'linear-gradient(90deg,#084C55,#0e7490)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 12px #0005' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22 }}>👑</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#F59E0B', letterSpacing: 1 }}>PLATINUM HOTEL</div>
            <div style={{ fontSize: 11, color: '#94a3b8', letterSpacing: 2 }}>ADMIN PANEL</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {saved && <span style={{ background: '#16a34a', color: '#fff', borderRadius: 8, padding: '4px 14px', fontSize: 13 }}>✓ Saved!</span>}
          <a href="#/" style={{ background: '#1e293b', color: '#94a3b8', border: '1px solid #334155', borderRadius: 8, padding: '7px 16px', cursor: 'pointer', fontSize: 13, textDecoration: 'none' }}>← Back to Menu</a>
          <button onClick={() => { adminLogout(); onLogout(); }} style={{ background: '#1e293b', color: '#f87171', border: '1px solid #7f1d1d', borderRadius: 8, padding: '7px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>🚪 Logout</button>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: '#1e293b', borderRight: '1px solid #334155', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ padding: '16px 12px 8px', fontSize: 11, color: '#64748b', letterSpacing: 2, fontWeight: 700 }}>MENU TYPE</div>
          {MENU_TYPES.map(m => (
            <button key={m.key} onClick={() => { setActiveMenu(m.key); setActiveCategory(0); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, borderRadius: 0, transition: 'all .2s', background: activeMenu === m.key ? 'linear-gradient(90deg,#084C55,#0e7490)' : 'transparent', color: activeMenu === m.key ? '#F59E0B' : '#94a3b8', borderLeft: activeMenu === m.key ? '3px solid #F59E0B' : '3px solid transparent' }}>
              {m.label}
            </button>
          ))}
          <div style={{ margin: '16px 12px 8px', height: 1, background: '#334155' }} />
          <div style={{ padding: '0 12px 8px', fontSize: 11, color: '#64748b', letterSpacing: 2, fontWeight: 700 }}>CATEGORIES</div>
          {currentCategories.map((cat, ci) => (
            <button key={cat.id || ci} onClick={() => setActiveCategory(ci)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 16px', border: 'none', cursor: 'pointer', fontSize: 13, background: activeCategory === ci ? '#0f172a' : 'transparent', color: activeCategory === ci ? '#F59E0B' : '#94a3b8', borderLeft: activeCategory === ci ? '3px solid #F59E0B' : '3px solid transparent' }}>
              {cat.title}
              <span style={{ float: 'right', fontSize: 11, color: '#475569', marginTop: 1 }}>{cat.items?.length || 0}</span>
            </button>
          ))}
          <div style={{ padding: 12 }}>
            <button onClick={() => setAddingCategory(true)} style={{ width: '100%', background: '#0e7490', color: '#fff', border: 'none', borderRadius: 8, padding: '8px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>+ Add Category</button>
          </div>

          {/* Sidebar Bottom Buttons */}
          <div style={{ position: 'sticky', bottom: 0, background: '#1e293b', borderTop: '1px solid #334155', padding: 12 }}>
            <button onClick={() => setShowPassModal(true)}
              style={{ width: '100%', background: 'linear-gradient(90deg,#084C55,#0e7490)', color: '#F59E0B', border: 'none', borderRadius: 8, padding: '9px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
              🔐 Change Password
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {/* Search */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search items..." style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9', borderRadius: 10, padding: '10px 16px', fontSize: 14, outline: 'none' }} />
            {search && <button onClick={() => setSearch('')} style={{ background: '#334155', color: '#94a3b8', border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer' }}>✕</button>}
          </div>

          {filteredCategories.length === 0 && <p style={{ color: '#64748b', textAlign: 'center', marginTop: 60 }}>No items found.</p>}

          {filteredCategories.map((cat) => {
            const ci = cat._ci;
            return (
              <div key={cat.id || ci} style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#F59E0B', letterSpacing: 1 }}>{cat.title}</h2>
                  {cat.subtitle && <span style={{ background: '#084C55', color: '#67e8f9', borderRadius: 6, padding: '2px 10px', fontSize: 12 }}>{cat.subtitle}</span>}
                  <span style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                    <button onClick={() => openEditCategory(ci)} style={{ background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 7, padding: '5px 12px', cursor: 'pointer', fontSize: 13 }}>✏ Edit</button>
                    <button onClick={() => openAdd(ci)} style={{ background: '#0e7490', color: '#fff', border: 'none', borderRadius: 7, padding: '5px 13px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>+ Add Item</button>
                    <button onClick={() => deleteCategory(ci)} style={{ background: '#7f1d1d', color: '#fca5a5', border: 'none', borderRadius: 7, padding: '5px 12px', cursor: 'pointer', fontSize: 13 }}>🗑</button>
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
                  {cat.items.map((item) => {
                    const ii = item._ii;
                    return (
                      <div key={ii} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: '14px 16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#f1f5f9', flex: 1, marginRight: 8 }}>{item.name}</div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button onClick={() => openEdit(ci, ii)} style={{ background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12 }}>Edit</button>
                            <button onClick={() => deleteItem(ci, ii)} style={{ background: '#7f1d1d', color: '#fca5a5', border: 'none', borderRadius: 6, padding: '4px 9px', cursor: 'pointer', fontSize: 12 }}>✕</button>
                          </div>
                        </div>
                        <p style={{ color: '#64748b', fontSize: 12, margin: '0 0 10px', lineHeight: 1.4 }}>{item.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: '#94a3b8', fontSize: 13 }}>ETB</span>
                          <input
                            type="text"
                            value={item.price}
                            onChange={e => handlePriceChange(ci, ii, e.target.value)}
                            onBlur={() => savePrice(ci, ii)}
                            style={{ background: '#0f172a', border: '1px solid #F59E0B', color: '#F59E0B', borderRadius: 7, padding: '5px 10px', fontSize: 15, fontWeight: 700, width: 110, outline: 'none' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <Modal title="Edit Menu Item" onClose={() => setEditingItem(null)} onSave={saveEdit}>
          <ItemForm data={editingItem.data} onChange={data => setEditingItem(prev => ({ ...prev, data }))} />
        </Modal>
      )}

      {/* Add Item Modal */}
      {addingItem && (
        <Modal title={`Add Item to "${currentCategories[addingItem.catIdx]?.title}"`} onClose={() => setAddingItem(null)} onSave={saveAdd}>
          <ItemForm data={addingItem.data} onChange={data => setAddingItem(prev => ({ ...prev, data }))} />
        </Modal>
      )}

      {/* Add Category Modal */}
      {addingCategory && (
        <Modal title="Add New Category" onClose={() => setAddingCategory(false)} onSave={saveNewCategory}>
          <CatForm data={newCategory} onChange={setNewCategory} />
        </Modal>
      )}
      {/* Edit Category Modal */}
      {editingCategory && (
        <Modal title="Edit Category" onClose={() => setEditingCategory(null)} onSave={saveEditCategory}>
          <CatForm data={editingCategory.data} onChange={data => setEditingCategory(prev => ({ ...prev, data }))} />
        </Modal>
      )}

      {/* Change Password Modal */}
      {showPassModal && <PasswordModal onClose={() => setShowPassModal(false)} />}
    </div>
  );
}

function PasswordModal({ onClose }) {
  const [cur, setCur]   = React.useState('');
  const [nw, setNw]     = React.useState('');
  const [conf, setConf] = React.useState('');
  const [msg, setMsg]   = React.useState(null);
  const inputStyle = { width:'100%', background:'#0f172a', border:'1px solid #334155', color:'#f1f5f9', borderRadius:8, padding:'10px 12px', fontSize:14, boxSizing:'border-box', outline:'none', marginTop:6 };
  function handleSubmit(e) {
    e.preventDefault();
    if (nw !== conf) return setMsg({ ok:false, text:'New passwords do not match.' });
    const r = changeAdminPassword(cur, nw);
    setMsg({ ok:r.ok, text:r.msg });
    if (r.ok) { setCur(''); setNw(''); setConf(''); }
  }
  return (
    <div style={{ position:'fixed', inset:0, background:'#000a', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:16, width:'100%', maxWidth:420, padding:28, boxShadow:'0 20px 60px #000c' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
          <h3 style={{ margin:0, color:'#F59E0B', fontSize:18, fontWeight:800 }}>🔐 Change Password</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#94a3b8', fontSize:22, cursor:'pointer' }}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom:12 }}>
            <label style={{ color:'#94a3b8', fontSize:12, fontWeight:700, letterSpacing:1 }}>CURRENT PASSWORD</label>
            <input type="password" style={inputStyle} value={cur} onChange={e => setCur(e.target.value)} required />
          </div>
          <div style={{ marginBottom:12 }}>
            <label style={{ color:'#94a3b8', fontSize:12, fontWeight:700, letterSpacing:1 }}>NEW PASSWORD (min 6 chars)</label>
            <input type="password" style={inputStyle} value={nw} onChange={e => setNw(e.target.value)} required />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ color:'#94a3b8', fontSize:12, fontWeight:700, letterSpacing:1 }}>CONFIRM NEW PASSWORD</label>
            <input type="password" style={inputStyle} value={conf} onChange={e => setConf(e.target.value)} required />
          </div>
          {msg && (
            <div style={{ padding:'10px 14px', borderRadius:8, background:msg.ok?'#14532d':'#450a0a', border:`1px solid ${msg.ok?'#16a34a':'#7f1d1d'}`, color:msg.ok?'#86efac':'#fca5a5', fontSize:13, marginBottom:16 }}>
              {msg.ok ? '✅' : '⚠️'} {msg.text}
            </div>
          )}
          <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
            <button type="button" onClick={onClose} style={{ background:'#334155', color:'#94a3b8', border:'none', borderRadius:8, padding:'10px 20px', cursor:'pointer', fontSize:13, fontWeight:700 }}>Cancel</button>
            <button type="submit" style={{ background:'linear-gradient(90deg,#084C55,#0e7490)', color:'#F59E0B', border:'none', borderRadius:8, padding:'10px 22px', cursor:'pointer', fontSize:13, fontWeight:700 }}>🔒 Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 4, marginTop: 12, fontWeight: 600, letterSpacing: 1 };
const inputStyle = { width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#f1f5f9', borderRadius: 8, padding: '9px 12px', fontSize: 14, boxSizing: 'border-box', outline: 'none' };
const taStyle = { ...inputStyle, resize: 'vertical', minHeight: 70, fontFamily: 'inherit' };

function ImagePickerField({ value, onChange, placeholder }) {
  const ref = React.useRef();
  const [previewUrl, setPreviewUrl] = React.useState(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    // Set the path value for saving
    onChange(`images/${file.name}`);
    // Read file for instant preview
    const reader = new FileReader();
    reader.onload = ev => setPreviewUrl(ev.target.result);
    reader.readAsDataURL(file);
  }

  // Show FileReader preview if available, else try path-based preview
  const displaySrc = previewUrl || (value ? `/${value.replace(/^\//, '')}` : null);

  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input
          style={{ ...inputStyle, flex: 1 }}
          value={value}
          onChange={e => { onChange(e.target.value); setPreviewUrl(null); }}
          placeholder={placeholder}
        />
        <button type="button" onClick={() => ref.current.click()}
          style={{ background: '#0e7490', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
          📁 Browse
        </button>
        <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
      </div>
      {displaySrc && (
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={displaySrc} alt="preview"
            style={{ width: 140, height: 80, objectFit: 'cover', borderRadius: 10, border: '2px solid #F59E0B' }}
            onError={e => { e.target.style.display = 'none'; }} />
          <div style={{ fontSize: 11, color: '#64748b' }}>
            <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 4 }}>✅ Preview ready!</div>
            Copy <code style={{ color: '#67e8f9' }}>{(value || '').split('/').pop()}</code> to:<br />
            <code style={{ color: '#94a3b8', fontSize: 10 }}>public/images/</code>
          </div>
        </div>
      )}
    </div>
  );
}

function Modal({ title, onClose, onSave, children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0009', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', padding: 28, boxShadow: '0 20px 60px #000a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, color: '#F59E0B', fontSize: 18, fontWeight: 800 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>
        {children}
        <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: '#334155', color: '#94a3b8', border: 'none', borderRadius: 8, padding: '10px 22px', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
          <button onClick={onSave} style={{ background: 'linear-gradient(90deg,#084C55,#0e7490)', color: '#F59E0B', border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function ItemForm({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const [translating, setTranslating] = React.useState(false);

  async function handleTranslate() {
    if (!data.name) return alert('Please enter the English name first.');
    setTranslating(true);
    const t = await autoTranslate(data.name, data.description || '');
    onChange({ ...data, ...t });
    setTranslating(false);
  }

  return (
    <div>
      <label style={labelStyle}>Name (English) *</label>
      <input style={inputStyle} value={data.name} onChange={e => set('name', e.target.value)} placeholder="Item name" />
      <label style={labelStyle}>Price (ETB) *</label>
      <input style={inputStyle} value={data.price} onChange={e => set('price', e.target.value)} placeholder="e.g. 350.00" />
      <label style={labelStyle}>Description (English)</label>
      <textarea style={taStyle} value={data.description} onChange={e => set('description', e.target.value)} placeholder="Description..." />

      <details style={{ marginTop: 16 }} open>
        <summary style={{ color: '#67e8f9', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>🌍 Translations</summary>
        <button type="button" onClick={handleTranslate} disabled={translating}
          style={{ marginTop: 10, width: '100%', background: translating ? '#334155' : 'linear-gradient(90deg,#7c3aed,#4f46e5)', color: '#fff', border: 'none', borderRadius: 8, padding: '9px', cursor: translating ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 700 }}>
          {translating ? '⏳ Translating all languages...' : '🌍 Auto-Translate from English'}
        </button>
        <div style={{ marginTop: 10 }}>
          {[['am', '🇪🇹 Amharic'], ['fr', '🇫🇷 Français'], ['zh', '🇨🇳 中文'], ['ar', '🇸🇦 Arabic']].map(([lang, label]) => (
            <div key={lang}>
              <label style={labelStyle}>{label} — Name</label>
              <input style={inputStyle} value={data[`name_${lang}`] || ''} onChange={e => set(`name_${lang}`, e.target.value)} />
              <label style={labelStyle}>{label} — Description</label>
              <textarea style={taStyle} value={data[`description_${lang}`] || ''} onChange={e => set(`description_${lang}`, e.target.value)} />
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function CatForm({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const [translating, setTranslating] = React.useState(false);

  async function handleTranslate() {
    if (!data.title) return alert('Please enter the English title first.');
    setTranslating(true);
    const [titleRes, subRes] = await Promise.all([
      autoTranslate(data.title, ''),
      data.subtitle ? autoTranslate(data.subtitle, '') : Promise.resolve({}),
    ]);
    onChange({
      ...data,
      title_am: titleRes.name_am || '',
      title_fr: titleRes.name_fr || '',
      title_zh: titleRes.name_zh || '',
      title_ar: titleRes.name_ar || '',
      subtitle_am: subRes.name_am || '',
      subtitle_fr: subRes.name_fr || '',
      subtitle_zh: subRes.name_zh || '',
      subtitle_ar: subRes.name_ar || '',
    });
    setTranslating(false);
  }

  return (
    <div>
      <label style={labelStyle}>Category ID * (unique, no spaces)</label>
      <input style={inputStyle} value={data.id || ''} onChange={e => set('id', e.target.value.replace(/\s/g, '-').toLowerCase())} placeholder="e.g. from-desserts" />
      <label style={labelStyle}>Title (English) *</label>
      <input style={inputStyle} value={data.title || ''} onChange={e => set('title', e.target.value)} placeholder="e.g. Desserts" />
      <label style={labelStyle}>Subtitle (optional)</label>
      <input style={inputStyle} value={data.subtitle || ''} onChange={e => set('subtitle', e.target.value)} placeholder="e.g. Sweet Menu" />
      <label style={labelStyle}>🖼 Header Image</label>
      <ImagePickerField value={data.headerImage || ''} onChange={v => set('headerImage', v)} placeholder="images/header_desserts.jpg" />

      <button type="button" onClick={handleTranslate} disabled={translating}
        style={{ marginTop: 16, width: '100%', background: translating ? '#334155' : 'linear-gradient(90deg,#7c3aed,#4f46e5)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', cursor: translating ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 700 }}>
        {translating ? '⏳ Translating all languages...' : '🌍 Auto-Translate Title to All Languages'}
      </button>

      <details style={{ marginTop: 14 }} open>
        <summary style={{ color: '#67e8f9', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>🌍 Translations (auto-filled above)</summary>
        <div style={{ marginTop: 10 }}>
          {[['am', '🇪🇹 Amharic'], ['fr', '🇫🇷 Français'], ['zh', '🇨🇳 中文'], ['ar', '🇸🇦 Arabic']].map(([lang, label]) => (
            <div key={lang}>
              <label style={labelStyle}>{label} — Title</label>
              <input style={inputStyle} value={data[`title_${lang}`] || ''} onChange={e => set(`title_${lang}`, e.target.value)} />
              <label style={labelStyle}>{label} — Subtitle</label>
              <input style={inputStyle} value={data[`subtitle_${lang}`] || ''} onChange={e => set(`subtitle_${lang}`, e.target.value)} />
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
