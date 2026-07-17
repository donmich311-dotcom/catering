export const AboutView = {
  render: (state) => {
    // Render team members
    const teamHTML = state.teamMembers.map(member => `
      <div class="product-card animate-fade-in" style="background-color: var(--card-bg);">
        <div class="product-img-wrapper" style="height: 280px;">
          <img src="${member.image}" alt="${member.name}" style="object-position: center 20%;">
        </div>
        <div class="product-info" style="text-align: center; padding: 24px;">
          <h3 class="product-title" style="margin-bottom: 4px; font-size: 1.4rem;">${member.name}</h3>
          <span class="product-category" style="font-size: 0.8rem; margin-bottom: 12px; display: block;">${member.role}</span>
          <p class="product-desc" style="font-size: 0.88rem; -webkit-line-clamp: 4;">${member.bio}</p>
          <div class="social-links-row" style="justify-content: center; margin-top: 16px;">
            <a href="#" class="social-circle-link">
              <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
            <a href="#" class="social-circle-link">
              <svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.7 0-1.37-.2-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.6 8.6 0 0 1-5.36 1.84c-.35 0-.69-.02-1.03-.06A12.13 12.13 0 0 0 6.29 20c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53.8-.58 1.5-1.3 2.05-2.12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <!-- Inner Page Header -->
      <section class="section section-shaded" style="padding: 60px 0; text-align: center; border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <span class="section-tag">Crafting Culinary Magic</span>
          <h1 style="font-size: 3rem; margin-bottom: 12px;">About Gold & Burgundy</h1>
          <p class="section-subtitle" style="max-width: 600px; margin: 0 auto;">Our journey, our values, and the talented chefs dedicated to making your events spectacular.</p>
        </div>
      </section>

      <!-- Our Story -->
      <section class="section">
        <div class="container">
          <div class="grid-2" style="align-items: center;">
            <div class="animate-fade-in">
              <span class="section-tag">Since 2012</span>
              <h2 class="section-title">The Culinary Story</h2>
              <p style="margin-bottom: 16px; font-size: 1.05rem; line-height: 1.8;">
                Gold & Burgundy started in a small home kitchen with a simple passion: to create cakes and catering menus that look like fine art and taste like heaven. Over the past decade, we have grown into a premier full-service catering brand, serving hundreds of weddings, corporate events, and family celebrations.
              </p>
              <p style="margin-bottom: 24px; color: var(--text-muted); line-height: 1.8;">
                Our signature blend of rich European pastry techniques and bold local culinary flavors ensures that every dish is an adventure. From hot crispy samosas and smokey party Jollof rice to intricate wedding cakes dusted in gold leaf, we pour love and elegance into everything we serve.
              </p>
              <div style="display: flex; gap: 40px;">
                <div>
                  <h4 style="font-size: 2rem; color: var(--primary-burgundy); font-weight: 800;">500+</h4>
                  <p style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; font-weight:700;">Events Catered</p>
                </div>
                <div>
                  <h4 style="font-size: 2rem; color: var(--primary-burgundy); font-weight: 800;">10,000+</h4>
                  <p style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; font-weight:700;">Happy Guests</p>
                </div>
                <div>
                  <h4 style="font-size: 2rem; color: var(--primary-burgundy); font-weight: 800;">100%</h4>
                  <p style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; font-weight:700;">Love & Quality</p>
                </div>
              </div>
            </div>
            
            <div class="animate-fade-in" style="position: relative;">
              <div style="border: 4px solid var(--accent-gold); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md);">
                <img src="assets/carousel-catering.png" alt="Chef Preparing Food" style="width: 100%; height: 400px; object-fit: cover;">
              </div>
              <div style="position: absolute; bottom: -20px; left: -20px; background-color: var(--primary-burgundy); color: white; padding: 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-md); z-index: 10; max-width: 250px;">
                <p style="font-size: 1.10rem; font-family: 'Playfair Display', serif; font-style: italic; color: var(--accent-gold);">
                  "Food is not just nourishment, it is the center of celebration."
                </p>
                <p style="font-size: 0.8rem; margin-top: 8px; text-align: right; text-transform: uppercase; letter-spacing: 1px;">- Chef Aurelia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vision & Values -->
      <section class="section section-shaded">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Our Philosophy</span>
            <h2 class="section-title">Core Culinary Values</h2>
            <p class="section-subtitle">What drives us to deliver outstanding catering services day in and day out.</p>
          </div>
          
          <div class="grid-3">
            <div class="highlight-card" style="background-color: var(--card-bg);">
              <div class="highlight-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
              </div>
              <h3>Culinary Artistry</h3>
              <p>We believe plates are canvases. Every item is detailed with garnishes, custom glazes, and artistic balance, leaving guests visually enchanted.</p>
            </div>
            
            <div class="highlight-card" style="background-color: var(--card-bg);">
              <div class="highlight-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <h3>Uncompromised Taste</h3>
              <p>Appearance is half the battle; taste is the victory. We adjust seasonings, smoke signatures, and moisture layers to guarantee pure gastronomic pleasure.</p>
            </div>

            <div class="highlight-card" style="background-color: var(--card-bg);">
              <div class="highlight-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
              <h3>Warm Hospitality</h3>
              <p>Our serving personnel, kitchen crews, and coordinators treat your guests with absolute respect, bringing friendly smiles and prompt efficiency to every event.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Meet the Team -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Talented Artisans</span>
            <h2 class="section-title">Meet Our Kitchen Masters</h2>
            <p class="section-subtitle">The creative minds crafting your menus and designing your custom event themes.</p>
          </div>
          
          <div class="grid-3">
            ${teamHTML}
          </div>
        </div>
      </section>
    `;
  },
  
  init: (state) => {
    // No specific dynamic actions required on About Us page
  }
};
