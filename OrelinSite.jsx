import React, { useState } from 'react';
import './styles.css';

export default function OrelinSite() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);

  const whatsappNumber = '917419304795'; // full international format for wa.me

  const categories = [
    'All',
    'Collection Naturelle',
    'Collection Éternité',
    'Collection Épure',
  ];

  const products = [
    {
      id: 1,
      name: 'Ambre Céleste',
      category: 'Collection Naturelle',
      notes: 'Amber, Sandalwood, Vanilla',
      price: 1299,
      img: 'https://via.placeholder.com/400x400?text=Ambre+Céleste',
      desc: 'Natural essential oil perfume — warm, woody and pure.',
    },
    {
      id: 2,
      name: \"Noir d'Éternité\",
      category: 'Collection Éternité',
      notes: 'Iso E Super, White Musk, Patchouli',
      price: 1499,
      img: 'https://via.placeholder.com/400x400?text=Noir+d%27Éternité',
      desc: 'Synthetic long-lasting perfume — intense and sophisticated.',
    },
    {
      id: 3,
      name: 'Brise Épure',
      category: 'Collection Épure',
      notes: 'Citrus, Green Tea, Musk Light',
      price: 899,
      img: 'https://via.placeholder.com/400x400?text=Brise+Épure',
      desc: 'Water-based perfume — fresh and non-greasy.',
    },
  ];

  const filtered = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const openWhatsApp = (product) => {
    const msg = `Hello, I'm interested in ordering the perfume ${product.name} (₹${product.price}).`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="brand">Orélin</h1>
        <nav className="nav">
          {categories.map((c) => (
            <button key={c} className={`nav-btn ${selectedCategory === c ? 'active' : ''}`} onClick={() => setSelectedCategory(c)}>{c}</button>
          ))}
        </nav>
        <button className="cart-btn" onClick={() => alert(`Cart total: ₹${total}`)}>Cart ({cart.length})</button>
      </header>

      <section className="hero">
        <h2>Essence de Pureté. Pouvoir de Science.</h2>
        <p>Perfumes crafted with precision — blending nature, innovation, and elegance.</p>
      </section>

      <main className="grid">
        {filtered.map((product) => (
          <div key={product.id} className="card">
            <img src={product.img} alt={product.name} onClick={() => setModalProduct(product)} />
            <h3>{product.name}</h3>
            <p className="muted">{product.category}</p>
            <p className="muted">Notes: {product.notes}</p>
            <p className="price">₹{product.price}</p>
            <div className="card-actions">
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => openWhatsApp(product)}>WhatsApp</button>
            </div>
          </div>
        ))}
      </main>

      {modalProduct && (
        <div className="modal" onClick={() => setModalProduct(null)}>
          <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setModalProduct(null)}>✕</button>
            <img src={modalProduct.img} alt={modalProduct.name} />
            <h3>{modalProduct.name}</h3>
            <p className="muted">{modalProduct.category}</p>
            <p>Notes: {modalProduct.notes}</p>
            <p>{modalProduct.desc}</p>
            <p className="price">₹{modalProduct.price}</p>
            <div className="card-actions">
              <button onClick={() => { addToCart(modalProduct); setModalProduct(null); }}>Add to Cart</button>
              <button onClick={() => openWhatsApp(modalProduct)}>WhatsApp Order</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Follow us on Instagram: @orelin.parfums</p>
        <p>© 2025 Orélin. All rights reserved.</p>
      </footer>
    </div>
  );
}