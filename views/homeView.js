export const HomeView = {
  render: (state) => {
    // Get featured items
    const featuredList = state.products.filter(p => p.featured).slice(0, 4);
    
    // Render featured cards
    const featuredHTML = featuredList.map(item => `
      <div class="product-card animate-fade-in">
        <div class="product-img-wrapper">
          <img src="${item.image}" alt="${item.name}">
          <span class="product-badge">Featured</span>
          <div class="product-rating">
            <svg style="width:14px;height:14px;fill:var(--accent-gold)" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span>${item.rating}</span>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${item.category}</span>
          <h3 class="product-title">${item.name}</h3>
          <p class="product-desc">${item.description}</p>
          <div class="product-footer">
            <span class="product-price">$${item.price.toFixed(2)}</span>
            <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');

    // Featured Reviews preview
    const topReviews = state.reviews.slice(0, 3).map(rev => `
      <div class="testimonial-card">
        <div class="testi-header">
          <span class="testi-author">${rev.name}</span>
          <div class="stars-list" style="font-size: 1rem; margin: 0;">
            ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
          </div>
        </div>
        <p class="testi-comment">"${rev.comment}"</p>
        <div class="testi-footer">
          <span>${rev.event}</span>
          <span>${rev.date}</span>
        </div>
      </div>
    `).join('');

    return `
      <!-- Hero Carousel -->
      <section class="hero">
        <div class="carousel-container">
          <!-- Slide 1: Wedding -->
          <div class="carousel-slide active" data-slide="0">
            <img class="carousel-image" src="assets/carousel-wedding.png" alt="Wedding cakes">
            <div class="carousel-content">
              <span class="section-tag" style="color:var(--accent-gold)">Premium Creations</span>
              <h1>Bespoke Wedding Cakes</h1>
              <p>Handcrafted, multi-tiered luxury cakes decorated with gold leaf accents and delicate sugar florals for your dream wedding.</p>
              <a href="#/menu?category=Cakes" class="btn btn-gold">Order Cake</a>
            </div>
          </div>
          
          <!-- Slide 2: Birthday -->
          <div class="carousel-slide" data-slide="1">
            <img class="carousel-image" src="assets/carousel-birthday.png" alt="Birthday cakes">
            <div class="carousel-content">
              <span class="section-tag" style="color:var(--accent-gold)">Celebrate in Style</span>
              <h1>Vibrant Birthday Cakes</h1>
              <p>Custom layered cakes, macarons, and rich chocolate drips designed to spark joy and create sweet, unforgettable memories.</p>
              <a href="#/menu?category=Cakes" class="btn btn-gold">Custom Design</a>
            </div>
          </div>

          <!-- Slide 3: Cupcakes -->
          <div class="carousel-slide" data-slide="2">
            <img class="carousel-image" src="assets/carousel-cupcakes.png" alt="Gourmet Cupcakes">
            <div class="carousel-content">
              <span class="section-tag" style="color:var(--accent-gold)">Little Delights</span>
              <h1>Artisan Cupcakes</h1>
              <p>Soft, fluffy cupcake boxes piped with luxury cream cheese frostings and topped with elegant gold sprinkles.</p>
              <a href="#/menu?category=Cakes" class="btn btn-gold">Browse Cupcakes</a>
            </div>
          </div>

          <!-- Slide 4: Small Chops -->
          <div class="carousel-slide" data-slide="3">
            <img class="carousel-image" src="assets/carousel-chops.png" alt="Small Chops">
            <div class="carousel-content">
              <span class="section-tag" style="color:var(--accent-gold)">Savory Platter</span>
              <h1>Premium Small Chops</h1>
              <p>Freshly fried golden puff puff, crunchy spring rolls, savory samosas, and spicy peppered gizzard skewers.</p>
              <a href="#/menu?category=Small Chops" class="btn btn-gold">Order Platters</a>
            </div>
          </div>

          <!-- Slide 5: Desserts -->
          <div class="carousel-slide" data-slide="4">
            <img class="carousel-image" src="assets/carousel-dessert.png" alt="Desserts">
            <div class="carousel-content">
              <span class="section-tag" style="color:var(--accent-gold)">Sweet Endings</span>
              <h1>Event Dessert Bars</h1>
              <p>Mini fruit tarts, elegant chocolate mousse shooters, and colorful French macarons curated for your special events.</p>
              <a href="#/menu?category=Pastries" class="btn btn-gold">Order Desserts</a>
            </div>
          </div>

          <!-- Slide 6: Catering Services -->
          <div class="carousel-slide" data-slide="5">
            <img class="carousel-image" src="assets/carousel-catering.png" alt="Catering services">
            <div class="carousel-content">
              <span class="section-tag" style="color:var(--accent-gold)">Delicious Events</span>
              <h1>Professional Catering</h1>
              <p>Luxurious buffet layouts, friendly serving staff, and rich gourmet dishes customized for corporate events or private celebrations.</p>
              <a href="#/services" class="btn btn-gold">Catering Packages</a>
            </div>
          </div>

          <!-- Slide 7: Pastries -->
          <div class="carousel-slide" data-slide="6">
            <img class="carousel-image" src="assets/carousel-pastry.png" alt="Pastries">
            <div class="carousel-content">
              <span class="section-tag" style="color:var(--accent-gold)">Baked Daily</span>
              <h1>Fresh Bakery Pastries</h1>
              <p>Buttery, golden croissants, hot sausage rolls, and fruit danishes baked fresh every single morning.</p>
              <a href="#/menu?category=Pastries" class="btn btn-gold">Order Pastries</a>
            </div>
          </div>
          
          <!-- Arrows -->
          <button class="carousel-arrow carousel-arrow-left" id="home-carousel-prev" aria-label="Previous slide">
            <svg style="width:24px;height:24px;fill:currentColor" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          </button>
          <button class="carousel-arrow carousel-arrow-right" id="home-carousel-next" aria-label="Next slide">
            <svg style="width:24px;height:24px;fill:currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
          
          <!-- Dots -->
          <div class="carousel-dots" id="home-carousel-dots">
            <button class="carousel-dot active" data-index="0" aria-label="Slide 1"></button>
            <button class="carousel-dot" data-index="1" aria-label="Slide 2"></button>
            <button class="carousel-dot" data-index="2" aria-label="Slide 3"></button>
            <button class="carousel-dot" data-index="3" aria-label="Slide 4"></button>
            <button class="carousel-dot" data-index="4" aria-label="Slide 5"></button>
            <button class="carousel-dot" data-index="5" aria-label="Slide 6"></button>
            <button class="carousel-dot" data-index="6" aria-label="Slide 7"></button>
          </div>
        </div>
      </section>

      <!-- Welcome Banner -->
      <section class="section">
        <div class="container text-center" style="text-align: center; max-width: 800px;">
          <span class="section-tag">Welcome to Gold & Burgundy</span>
          <h2 class="section-title">Delicious Catering for Every Occasion</h2>
          <p class="section-subtitle" style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px;">
            We believe that extraordinary food is the heartbeat of any memorable gathering. From intimate birthday parties and bespoke wedding cakes to high-end corporate galas, our team brings culinary artistry, exquisite flavors, and premium presentation to your table.
          </p>
          <div style="display:flex; justify-content:center; gap: 16px;">
            <a href="#/menu" class="btn btn-primary">Order Online</a>
            <a href="#/contact" class="btn btn-secondary">Get Free Quote</a>
          </div>
        </div>
      </section>

      <!-- Category Showcase Grid -->
      <section class="section section-shaded">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Freshly Prepared</span>
            <h2 class="section-title">Browse Our Collections</h2>
            <p class="section-subtitle">Explore our wide selection of delicious catering items tailored to satisfy your cravings.</p>
          </div>
          
          <div class="grid-3">
            <a href="#/menu?category=Cakes" class="category-card animate-fade-in">
              <img src="assets/carousel-birthday.png" alt="Cakes Category">
              <div class="category-card-content">
                <span>Decadent & Sweet</span>
                <h3>Custom Cakes</h3>
              </div>
            </a>
            <a href="#/menu?category=Small Chops" class="category-card animate-fade-in">
              <img src="assets/carousel-chops.png" alt="Small Chops Category">
              <div class="category-card-content">
                <span>Party Favorites</span>
                <h3>Small Chops</h3>
              </div>
            </a>
            <a href="#/menu?category=Pastries" class="category-card animate-fade-in">
              <img src="assets/carousel-pastry.png" alt="Pastries Category">
              <div class="category-card-content">
                <span>Flaky & Golden</span>
                <h3>Pastries & Snacks</h3>
              </div>
            </a>
            <a href="#/menu?category=Meals" class="category-card animate-fade-in">
              <img src="assets/carousel-catering.png" alt="Meals Category">
              <div class="category-card-content">
                <span>Warm Buffet Mains</span>
                <h3>Gourmet Meals</h3>
              </div>
            </a>
            <a href="#/menu?category=Drinks" class="category-card animate-fade-in">
              <img src="assets/carousel-dessert.png" alt="Drinks Category">
              <div class="category-card-content">
                <span>Refreshing Punch</span>
                <h3>Mocktails & Drinks</h3>
              </div>
            </a>
            <a href="#/services" class="category-card animate-fade-in">
              <img src="assets/carousel-wedding.png" alt="Events Category">
              <div class="category-card-content">
                <span>Full-Service</span>
                <h3>Event Catering</h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Featured Menu Items -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Chef's Recommendations</span>
            <h2 class="section-title">Featured Delicacies</h2>
            <p class="section-subtitle">A sneak peek of the popular items our clients can't get enough of.</p>
          </div>
          
          <div class="grid-4" id="home-featured-container">
            ${featuredHTML}
          </div>
          
          <div style="text-align: center; margin-top: 50px;">
            <a href="#/menu" class="btn btn-secondary">Explore Entire Menu</a>
          </div>
        </div>
      </section>

      <!-- Highlights section -->
      <section class="section section-shaded">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Why Choose Us</span>
            <h2 class="section-title">The Gold & Burgundy Standard</h2>
            <p class="section-subtitle">We commit to excellence in every single bite and every minor detail.</p>
          </div>
          
          <div class="grid-3">
            <div class="highlight-card">
              <div class="highlight-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
              </div>
              <h3>Premium Ingredients</h3>
              <p>We source only high-quality local organics, fresh cream butter, and premium chocolates to ensure superior taste.</p>
            </div>
            
            <div class="highlight-card">
              <div class="highlight-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              </div>
              <h3>Artisan Presentation</h3>
              <p>Our team treats every dish and cake as a masterpiece. Elegant styling, gold accents, and tailored buffet decorations.</p>
            </div>

            <div class="highlight-card">
              <div class="highlight-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              </div>
              <h3>Prompt Logistics</h3>
              <p>All items are delivered in specialized temperature-controlled boxes ensuring freshness and perfect presentation.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonial carousel teaser -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Client Love</span>
            <h2 class="section-title">Words From Our Clients</h2>
            <p class="section-subtitle">Read feedback from our recent celebrations and catered events.</p>
          </div>
          
          <div class="grid-3">
            ${topReviews}
          </div>
          
          <div style="text-align: center; margin-top: 40px;">
            <a href="#/testimonials" class="btn btn-secondary">Read All Testimonials</a>
          </div>
        </div>
      </section>

      <!-- Newsletter sign up -->
      <section class="newsletter-section">
        <div class="newsletter-container">
          <h2 class="newsletter-title">Subscribe to Our Newsletter</h2>
          <p class="newsletter-desc">Get culinary inspiration, exclusive promotions, and recipes delivered to your inbox weekly.</p>
          <form class="newsletter-form" id="home-newsletter-form">
            <input type="email" placeholder="Your Email Address" required id="home-newsletter-email">
            <button type="submit" class="btn btn-gold">Subscribe</button>
          </form>
          <div id="newsletter-status" style="margin-top: 15px; font-weight: 600; color: var(--accent-gold); display: none;"></div>
        </div>
      </section>
    `;
  },
  
  init: (state) => {
    // Carousel logic
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const slideCount = slides.length;
    let carouselInterval;

    function showSlide(index) {
      if (slides.length === 0) return;
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      currentSlide = (index + slideCount) % slideCount;
      slides[currentSlide].classList.add('active');
      const activeDot = document.querySelector(`.carousel-dot[data-index="${currentSlide}"]`);
      if (activeDot) activeDot.classList.add('active');
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    // Start auto slide
    function startCarousel() {
      stopCarousel();
      carouselInterval = setInterval(nextSlide, 5000);
    }

    function stopCarousel() {
      if (carouselInterval) clearInterval(carouselInterval);
    }

    const prevBtn = document.getElementById('home-carousel-prev');
    const nextBtn = document.getElementById('home-carousel-next');
    const dotsContainer = document.getElementById('home-carousel-dots');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startCarousel(); // reset timer
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startCarousel(); // reset timer
      });
    }

    if (dotsContainer) {
      dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('carousel-dot')) {
          const idx = parseInt(e.target.getAttribute('data-index'), 10);
          showSlide(idx);
          startCarousel(); // reset timer
        }
      });
    }

    startCarousel();
    
    // Store cleanup function in window to clear interval on route change
    window.homeCarouselCleanup = stopCarousel;

    // Add to cart buttons
    const featuredContainer = document.getElementById('home-featured-container');
    if (featuredContainer) {
      featuredContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
          const id = btn.getAttribute('data-id');
          window.app.addToCart(id, 1);
        }
      });
    }

    // Newsletter submit
    const newsletterForm = document.getElementById('home-newsletter-form');
    const newsletterEmail = document.getElementById('home-newsletter-email');
    const newsletterStatus = document.getElementById('newsletter-status');

    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterEmail.value.trim();
        if (email) {
          window.app.subscribeNewsletter(email);
          newsletterEmail.value = '';
          if (newsletterStatus) {
            newsletterStatus.innerText = 'Thank you for subscribing to Gold & Burgundy!';
            newsletterStatus.style.display = 'block';
            setTimeout(() => {
              newsletterStatus.style.display = 'none';
            }, 5000);
          }
        }
      });
    }
  }
};
