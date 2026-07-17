export const MenuView = {
  render: (state) => {
    // Generate category chip list
    const categories = ["All", "Cakes", "Small Chops", "Pastries", "Meals", "Drinks", "Event Catering"];
    const activeCategory = state.menuActiveCategory || "All";
    
    const chipsHTML = categories.map(cat => `
      <button class="filter-chip ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">
        ${cat}
      </button>
    `).join('');

    return `
      <!-- Page Title Header -->
      <section class="section section-shaded" style="padding: 40px 0; text-align: center; border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <span class="section-tag">Gourmet Catering Menu</span>
          <h1 style="font-size: 2.5rem; margin-bottom: 8px;">Order Catering Online</h1>
          <p class="section-subtitle" style="max-width: 600px; margin: 0 auto;">Select delicious fresh items, adjust quantities, add to your cart, and place your order instantly.</p>
        </div>
      </section>

      <!-- Main Ordering Area -->
      <section class="section">
        <div class="container">
          <!-- Search & Filter Bar -->
          <div class="search-filter-section">
            <div class="search-bar-wrapper">
              <input type="text" class="search-input" id="menu-search-input" placeholder="Search menu items (e.g. Red Velvet, Samosas, Jollof)..." value="${state.menuSearchQuery || ''}">
              <svg class="search-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            
            <div class="category-filter-chips" id="menu-category-chips">
              ${chipsHTML}
            </div>
          </div>
          
          <!-- Products Grid Wrapper -->
          <div class="grid-4" id="menu-products-grid">
            <!-- Products will be injected here dynamically by init() -->
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
              Loading delicious meals...
            </div>
          </div>
        </div>
      </section>
    `;
  },

  renderProductsList: (products, state) => {
    if (products.length === 0) {
      return `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 24px; background-color: var(--card-bg); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          <svg style="width: 48px; height: 48px; fill: var(--text-muted); margin-bottom: 16px;" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <h3 style="font-size: 1.3rem; margin-bottom: 8px;">No Items Found</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">We couldn't find any menu items matching your search or filter. Try typing something else!</p>
        </div>
      `;
    }

    return products.map(item => {
      // Check if product quantity selector has active value in temporary storage or defaults to 1
      const cartItem = state.cart.find(c => c.id === item.id);
      const activeQty = cartItem ? cartItem.quantity : 1;
      
      const starRating = '★'.repeat(Math.round(item.rating)) + '☆'.repeat(5 - Math.round(item.rating));

      return `
        <div class="product-card animate-fade-in">
          <div class="product-img-wrapper">
            <img src="${item.image}" alt="${item.name}">
            ${item.stock <= 5 ? `<span class="product-badge" style="background-color: #d97706;">Low Stock (${item.stock})</span>` : ''}
            <div class="product-rating">
              <svg style="width:12px;height:12px;fill:var(--accent-gold);margin-right:2px;" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span>${item.rating.toFixed(1)}</span>
            </div>
          </div>
          <div class="product-info">
            <span class="product-category">${item.category}</span>
            <h3 class="product-title" style="font-size: 1.1rem; line-height: 1.3; margin-bottom: 6px;">${item.name}</h3>
            <p class="product-desc" title="${item.description}">${item.description}</p>
            <div class="product-footer">
              <div style="display:flex; flex-direction:column;">
                <span class="product-price">$${item.price.toFixed(2)}</span>
              </div>
              
              <div style="display:flex; align-items:center; gap: 8px;">
                <div class="quantity-select">
                  <button class="qty-btn qty-minus" data-id="${item.id}">-</button>
                  <span class="qty-val" id="qty-val-${item.id}">1</span>
                  <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
                </div>
                <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${item.id}">Add</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  init: (state) => {
    const searchInput = document.getElementById('menu-search-input');
    const chipsContainer = document.getElementById('menu-category-chips');
    const gridContainer = document.getElementById('menu-products-grid');

    let activeCategory = state.menuActiveCategory || "All";
    let searchQuery = state.menuSearchQuery || "";

    // Track active quantities locally to make it smooth
    const localQuantities = {};
    state.products.forEach(p => {
      localQuantities[p.id] = 1;
    });

    function filterAndRender() {
      if (!gridContainer) return;
      
      const filtered = state.products.filter(item => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      gridContainer.innerHTML = MenuView.renderProductsList(filtered, state);
      
      // Re-apply local quantities display
      filtered.forEach(p => {
        const valEl = document.getElementById(`qty-val-${p.id}`);
        if (valEl) valEl.innerText = localQuantities[p.id] || 1;
      });
    }

    // Initial render
    filterAndRender();

    // Event listener for Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        state.menuSearchQuery = searchQuery; // sync to global state
        filterAndRender();
      });
    }

    // Event listener for Categories
    if (chipsContainer) {
      chipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (chip) {
          // Remove active from all chips
          document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          
          activeCategory = chip.getAttribute('data-category');
          state.menuActiveCategory = activeCategory; // sync to global state
          filterAndRender();
        }
      });
    }

    // Grid event delegation (qty buttons, add to cart buttons)
    if (gridContainer) {
      gridContainer.addEventListener('click', (e) => {
        const btnMinus = e.target.closest('.qty-minus');
        const btnPlus = e.target.closest('.qty-plus');
        const btnAdd = e.target.closest('.add-to-cart-btn');

        if (btnMinus) {
          const id = btnMinus.getAttribute('data-id');
          if (localQuantities[id] > 1) {
            localQuantities[id]--;
            const valEl = document.getElementById(`qty-val-${id}`);
            if (valEl) valEl.innerText = localQuantities[id];
          }
        }

        if (btnPlus) {
          const id = btnPlus.getAttribute('data-id');
          const product = state.products.find(p => p.id === id);
          if (product && localQuantities[id] < product.stock) {
            localQuantities[id]++;
            const valEl = document.getElementById(`qty-val-${id}`);
            if (valEl) valEl.innerText = localQuantities[id];
          } else {
            window.app.showToast("Maximum available stock reached for this item.", "warning");
          }
        }

        if (btnAdd) {
          const id = btnAdd.getAttribute('data-id');
          const qty = localQuantities[id] || 1;
          window.app.addToCart(id, qty);
          // reset local quantity indicator
          localQuantities[id] = 1;
          const valEl = document.getElementById(`qty-val-${id}`);
          if (valEl) valEl.innerText = 1;
        }
      });
    }
  }
};
