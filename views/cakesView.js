export const CakesView = {
  render: (state) => {
    return `
      <!-- Page Header -->
      <section class="section section-shaded" style="padding: 40px 0; text-align: center; border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <span class="section-tag">Sweet Designs</span>
          <h1 style="font-size: 2.5rem; margin-bottom: 8px;">Interactive Cake Customizer</h1>
          <p class="section-subtitle" style="max-width: 600px; margin: 0 auto;">Design your dream cake, choose flavors, frosting, and custom text, get an instant estimate, and send us your inquiry.</p>
        </div>
      </section>

      <!-- Cake Designer Interactive Area -->
      <section class="section">
        <div class="container">
          <div class="cake-designer-layout">
            <!-- Visual Preview Panel -->
            <div class="cake-visual-preview animate-fade-in">
              <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Live Custom Preview</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Watch your customized cake come to life below</p>
              
              <div class="cake-visual-graphic">
                <!-- Tier 3 (Top) -->
                <div class="cake-tier cake-tier-3 cake-frosting-cream" id="visual-tier-3"></div>
                <!-- Tier 2 (Middle) -->
                <div class="cake-tier cake-tier-2 cake-frosting-cream" id="visual-tier-2"></div>
                <!-- Tier 1 (Bottom) -->
                <div class="cake-tier cake-tier-1 cake-frosting-cream" id="visual-tier-1">
                  <div class="cake-text-overlay" id="visual-cake-text">Happy Birthday</div>
                </div>
              </div>
              
              <div class="cake-estimate-box">
                <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Estimated Price</span>
                <div class="cake-estimate-price" id="custom-cake-price">$65.00</div>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">*Estimates depend on standard decorator labor. Complex custom sculptures may incur additional fees.</p>
              </div>
            </div>

            <!-- Customizer Selection Form -->
            <div class="checkout-section-box animate-fade-in" style="margin-bottom: 0;">
              <h2 class="checkout-section-title" style="font-size: 1.5rem; color: var(--primary-burgundy-dark);">Customize Cake Specifications</h2>
              
              <form id="cake-customizer-form">
                <div class="form-group">
                  <label class="form-label" for="cake-tiers">Number of Tiers</label>
                  <select class="form-input" id="cake-tiers" required>
                    <option value="1" selected>1 Tier (Standard)</option>
                    <option value="2">2 Tiers (+ $45.00)</option>
                    <option value="3">3 Tiers (+ $90.00)</option>
                  </select>
                </div>

                <div class="admin-form-row">
                  <div class="form-group">
                    <label class="form-label" for="cake-size">Base Tier Size</label>
                    <select class="form-input" id="cake-size" required>
                      <option value="6">6 Inch Diameter (Serves 8-10)</option>
                      <option value="8" selected>8 Inch Diameter (Serves 15-20, + $15.00)</option>
                      <option value="10">10 Inch Diameter (Serves 25-30, + $35.00)</option>
                      <option value="12">12 Inch Diameter (Serves 40-50, + $65.00)</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label" for="cake-flavor">Cake Flavor</label>
                    <select class="form-input" id="cake-flavor" required>
                      <option value="vanilla" selected>Vanilla Bean</option>
                      <option value="chocolate">Double Chocolate (+ $5.00)</option>
                      <option value="red-velvet">Red Velvet (+ $8.00)</option>
                      <option value="strawberry">Luscious Strawberry (+ $5.00)</option>
                      <option value="lemon">Lemon Zest (+ $4.00)</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="cake-frosting">Frosting & Color Style</label>
                  <select class="form-input" id="cake-frosting" required>
                    <option value="cream" selected>Vanilla Buttercream (Cream White)</option>
                    <option value="chocolate">Chocolate Ganache (Rich Dark Brown, + $5.00)</option>
                    <option value="strawberry">Strawberry Buttercream (Pastel Pink)</option>
                    <option value="velvet">Red Velvet Crumbs (Warm Crimson, + $5.00)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="cake-text">Custom Text Overlay (Piped Icing)</label>
                  <input type="text" class="form-input" id="cake-text" placeholder="e.g. Happy 30th Birthday, Sarah!" maxlength="30" value="Happy Birthday">
                </div>

                <div class="receipt-divider"></div>
                
                <h3 style="font-size: 1.2rem; margin-bottom: 16px; color: var(--primary-burgundy-dark); font-family: 'Playfair Display', serif;">Your Contact Details</h3>
                
                <div class="admin-form-row">
                  <div class="form-group">
                    <label class="form-label" for="cake-customer-name">Full Name</label>
                    <input type="text" class="form-input" id="cake-customer-name" placeholder="John Doe" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="cake-customer-phone">Phone Number</label>
                    <input type="tel" class="form-input" id="cake-customer-phone" placeholder="e.g. +1 234 567 890" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="cake-customer-email">Email Address</label>
                  <input type="email" class="form-input" id="cake-customer-email" placeholder="john@example.com" required>
                </div>

                <div class="form-group">
                  <label class="form-label" for="cake-notes">Special Instructions & Custom Decor Requests</label>
                  <textarea class="form-input" id="cake-notes" rows="4" placeholder="Describe toppings, delivery dates, theme request (e.g. Unicorn theme, floral details, colors)..."></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-block" style="margin-top: 10px;">Submit Custom Inquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: (state) => {
    // Selection nodes
    const selectTiers = document.getElementById('cake-tiers');
    const selectSize = document.getElementById('cake-size');
    const selectFlavor = document.getElementById('cake-flavor');
    const selectFrosting = document.getElementById('cake-frosting');
    const inputText = document.getElementById('cake-text');
    const form = document.getElementById('cake-customizer-form');

    // Visual nodes
    const tier1 = document.getElementById('visual-tier-1');
    const tier2 = document.getElementById('visual-tier-2');
    const tier3 = document.getElementById('visual-tier-3');
    const textOverlay = document.getElementById('visual-cake-text');
    const priceDisplay = document.getElementById('custom-cake-price');

    // Pre-populate details if user logged in
    if (state.currentUser) {
      const nameField = document.getElementById('cake-customer-name');
      const emailField = document.getElementById('cake-customer-email');
      if (nameField) nameField.value = state.currentUser.name;
      if (emailField) emailField.value = state.currentUser.email;
    }

    function calculateEstimate() {
      if (!selectTiers) return;
      
      const tiers = parseInt(selectTiers.value, 10);
      const size = parseInt(selectSize.value, 10);
      const flavor = selectFlavor.value;
      const frosting = selectFrosting.value;
      const customText = inputText.value;

      // Base Cake Cost
      let cost = 50.00; 

      // Tier Cost additions
      if (tiers === 2) cost += 45.00;
      if (tiers === 3) cost += 90.00;

      // Size Cost additions
      if (size === 8) cost += 15.00;
      if (size === 10) cost += 35.00;
      if (size === 12) cost += 65.00;

      // Flavor cost additions
      if (flavor === 'chocolate') cost += 5.00;
      if (flavor === 'red-velvet') cost += 8.00;
      if (flavor === 'strawberry') cost += 5.00;
      if (flavor === 'lemon') cost += 4.00;

      // Frosting additions
      if (frosting === 'chocolate') cost += 5.00;
      if (frosting === 'velvet') cost += 5.00;

      // Update price display
      if (priceDisplay) priceDisplay.innerText = `$${cost.toFixed(2)}`;

      // Update Visual Graphic
      // Show/Hide Tiers
      if (tier2 && tier3) {
        if (tiers === 1) {
          tier2.style.display = 'none';
          tier3.style.display = 'none';
        } else if (tiers === 2) {
          tier2.style.display = 'block';
          tier3.style.display = 'none';
        } else if (tiers === 3) {
          tier2.style.display = 'block';
          tier3.style.display = 'block';
        }
      }

      // Update Frosting colors
      const allVisualTiers = [tier1, tier2, tier3];
      allVisualTiers.forEach(tier => {
        if (!tier) return;
        tier.className = tier.className.replace(/\bcake-frosting-\S+/g, '');
        tier.classList.add(`cake-frosting-${frosting}`);
      });

      // Update Text Overlay
      if (textOverlay) {
        textOverlay.innerText = customText || '';
        // If frosting is chocolate, make text white/gold, otherwise charcoal
        if (frosting === 'chocolate') {
          textOverlay.style.color = '#fff';
        } else {
          textOverlay.style.color = 'var(--text-dark)';
        }
      }
    }

    // Set up listeners for calculations
    const controlElements = [selectTiers, selectSize, selectFlavor, selectFrosting];
    controlElements.forEach(el => {
      if (el) el.addEventListener('change', calculateEstimate);
    });

    if (inputText) {
      inputText.addEventListener('input', calculateEstimate);
    }

    // Run initial calculation to update graphical display at start
    calculateEstimate();

    // Form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const tiers = selectTiers.value;
        const size = selectSize.value;
        const flavor = selectFlavor.value;
        const frosting = selectFrosting.value;
        const text = inputText.value;
        
        const customerName = document.getElementById('cake-customer-name').value;
        const customerPhone = document.getElementById('cake-customer-phone').value;
        const customerEmail = document.getElementById('cake-customer-email').value;
        const notes = document.getElementById('cake-notes').value;
        const price = priceDisplay.innerText;

        const inquiry = {
          id: "inq_" + Date.now(),
          type: "Custom Cake Design",
          date: new Date().toISOString().split('T')[0],
          customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone
          },
          details: {
            tiers: `${tiers} Tier(s)`,
            size: `${size} inch diameter`,
            flavor: flavor,
            frosting: frosting,
            pipingText: text,
            notes: notes,
            estimatedPrice: price
          },
          status: "Pending Review"
        };

        window.app.addInquiry(inquiry);
        
        // Reset form details
        form.reset();
        inputText.value = "Happy Birthday";
        calculateEstimate();
        
        window.app.showToast("Inquiry submitted! Our chef will review your design and reach out to you within 24 hours.", "success");
      });
    }
  }
};
