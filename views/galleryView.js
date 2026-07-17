export const GalleryView = {
  render: (state) => {
    const categories = ["All", "Weddings", "Birthdays", "Desserts", "Small Chops", "Pastries"];
    const chipsHTML = categories.map((cat, idx) => `
      <button class="filter-chip ${idx === 0 ? 'active' : ''}" data-gallery-filter="${cat}">
        ${cat}
      </button>
    `).join('');

    // Predefined gallery photos with categories
    const galleryItems = [
      { id: "g1", category: "Weddings", title: "Luxury Royal Wedding Cake", image: "assets/carousel-wedding.png", desc: "A magnificent 3-tier wedding cake with detailed gold leafing." },
      { id: "g2", category: "Birthdays", title: "Chocolate Macaron Drip Cake", image: "assets/carousel-birthday.png", desc: "A fun and rich chocolate cake decorated with macarons and berries." },
      { id: "g3", category: "Desserts", title: "Mini Strawberry & Kiwi Danishes", image: "assets/carousel-pastry.png", desc: "Crisp flaky pastries baked with sweet custard and glazed fresh fruits." },
      { id: "g4", category: "Small Chops", title: "Chef's Finger Foods Platter", image: "assets/carousel-chops.png", desc: "Fresh spring rolls, meat samosas, and golden puff puff appetizers." },
      { id: "g5", category: "Desserts", title: "Gourmet Cupcake Selection", image: "assets/carousel-cupcakes.png", desc: "Assorted cream cheese frosting cupcakes with elegant toppings." },
      { id: "g6", category: "Weddings", title: "Corporate Buffet Setup", image: "assets/carousel-catering.png", desc: "Professional food layouts featuring gold chafing dishes and elegant decor." },
      { id: "g7", category: "Pastries", title: "Sweet Bakery Croissants", image: "assets/carousel-pastry.png", desc: "Buttery pastry rolls baked fresh in our central baking kitchen." },
      { id: "g8", category: "Desserts", title: "Gala Mousse & Tart Platter", image: "assets/carousel-dessert.png", desc: "A delicious selection of mini mousse shooters and tarts." }
    ];

    // Cache the list in state dynamically so we can query it in init()
    state.galleryItems = galleryItems;

    const itemsHTML = galleryItems.map(item => `
      <div class="gallery-item animate-fade-in" data-category="${item.category}" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}">
        <div class="gallery-overlay">
          <h3>${item.title}</h3>
          <span>${item.category}</span>
        </div>
      </div>
    `).join('');

    return `
      <!-- Page Title -->
      <section class="section section-shaded" style="padding: 40px 0; text-align: center; border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <span class="section-tag">Visual Feast</span>
          <h1 style="font-size: 2.5rem; margin-bottom: 8px;">Our Food & Event Gallery</h1>
          <p class="section-subtitle" style="max-width: 600px; margin: 0 auto;">Take a visual tour of our beautifully designed cakes, buffet layouts, pastries, and past celebrations.</p>
        </div>
      </section>

      <!-- Filterable Gallery Grid -->
      <section class="section">
        <div class="container">
          <div class="gallery-filters" id="gallery-filter-chips">
            ${chipsHTML}
          </div>
          
          <div class="gallery-grid" id="gallery-items-grid">
            ${itemsHTML}
          </div>
        </div>
      </section>

      <!-- Lightbox Modal -->
      <div class="lightbox-overlay" id="gallery-lightbox">
        <div class="lightbox-content animate-fade-in">
          <button class="lightbox-close" id="lightbox-close-btn">&times;</button>
          <img src="" alt="" id="lightbox-img">
          <div class="lightbox-caption" id="lightbox-caption-text"></div>
        </div>
      </div>
    `;
  },

  init: (state) => {
    const chipsContainer = document.getElementById('gallery-filter-chips');
    const itemsGrid = document.getElementById('gallery-items-grid');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption-text');
    const lightboxClose = document.getElementById('lightbox-close-btn');

    // Handle filter clicks
    if (chipsContainer) {
      chipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (chip) {
          document.querySelectorAll('#gallery-filter-chips .filter-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');

          const filterVal = chip.getAttribute('data-gallery-filter');
          const items = document.querySelectorAll('.gallery-item');
          
          items.forEach(item => {
            const itemCat = item.getAttribute('data-category');
            if (filterVal === "All" || itemCat === filterVal) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        }
      });
    }

    // Handle image clicks to trigger Lightbox
    if (itemsGrid) {
      itemsGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
          const id = item.getAttribute('data-id');
          const data = state.galleryItems.find(g => g.id === id);
          
          if (data && lightbox && lightboxImg && lightboxCaption) {
            lightboxImg.src = data.image;
            lightboxImg.alt = data.title;
            lightboxCaption.innerHTML = `<strong>${data.title}</strong><br><span style="font-size:0.9rem; color:var(--accent-gold); font-style:italic;">${data.category}</span> - ${data.desc}`;
            lightbox.style.display = 'flex';
          }
        }
      });
    }

    // Close Lightbox
    function closeLightbox() {
      if (lightbox) lightbox.style.display = 'none';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }
  }
};
