export const ServicesView = {
  render: (state) => {
    // Generate package cards from seed packages
    const packagesHTML = state.cateringPackages.map(pkg => `
      <div class="package-card animate-fade-in">
        <div class="package-img-wrapper">
          <img src="${pkg.image}" alt="${pkg.name}">
        </div>
        <div class="package-body">
          <h3 class="package-title">${pkg.name}</h3>
          <span class="package-tagline">${pkg.tagline}</span>
          <div class="package-price">${pkg.price}</div>
          <ul class="package-features">
            ${pkg.features.map(feat => `
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>${feat}</span>
              </li>
            `).join('')}
          </ul>
          <button class="btn btn-primary select-pkg-btn" data-package="${pkg.name}">Inquire About Package</button>
        </div>
      </div>
    `).join('');

    return `
      <!-- Page Header -->
      <section class="section section-shaded" style="padding: 40px 0; text-align: center; border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <span class="section-tag">Professional Event Catering</span>
          <h1 style="font-size: 2.5rem; margin-bottom: 8px;">Catering Services & Event Packages</h1>
          <p class="section-subtitle" style="max-width: 600px; margin: 0 auto;">Review our customized event catering packages, or request a custom culinary quote for your private celebrations.</p>
        </div>
      </section>

      <!-- Packages Grid -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Signature Options</span>
            <h2 class="section-title">Tailored Catering Packages</h2>
            <p class="section-subtitle">We adapt to your budget, themes, and guest list count, ensuring high-end dining setups.</p>
          </div>
          
          <div class="grid-3">
            ${packagesHTML}
          </div>
        </div>
      </section>

      <!-- Catering Inquiry Form -->
      <section class="section section-shaded">
        <div class="container" style="max-width: 800px;">
          <div class="checkout-section-box animate-fade-in" style="margin-bottom: 0;">
            <div class="section-header" style="margin-bottom: 30px;">
              <span class="section-tag">Book Your Date</span>
              <h2 class="section-title" style="font-size: 2rem;">Request Event Catering Quote</h2>
              <p class="section-subtitle" style="font-size: 0.9rem;">Fill out the form below. Our coordination director will review your event details and draft a proposal.</p>
            </div>
            
            <form id="catering-inquiry-form">
              <div class="admin-form-row">
                <div class="form-group">
                  <label class="form-label" for="event-type">Event Category</label>
                  <select class="form-input" id="event-type" required>
                    <option value="" disabled selected>Select event type...</option>
                    <option value="Wedding">Wedding Reception</option>
                    <option value="Corporate">Corporate Lunch / Gala</option>
                    <option value="Birthday">Birthday Party Celebration</option>
                    <option value="Bridal/Baby Shower">Bridal / Baby Shower</option>
                    <option value="Other Soiree">Private House Party / Dinner</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label class="form-label" for="event-package">Preferred Package</label>
                  <select class="form-input" id="event-package" required>
                    <option value="Custom Quote" selected>Custom Menu Proposal (Tailored)</option>
                    <option value="Royal Wedding Buffet">Royal Wedding Buffet</option>
                    <option value="Corporate Elegance Gala">Corporate Elegance Gala</option>
                    <option value="Intimate Social Soirée">Intimate Social Soirée</option>
                  </select>
                </div>
              </div>

              <div class="admin-form-row">
                <div class="form-group">
                  <label class="form-label" for="event-guests">Estimated Guest Count</label>
                  <input type="number" class="form-input" id="event-guests" placeholder="e.g. 50" min="10" required>
                </div>
                
                <div class="form-group">
                  <label class="form-label" for="event-date">Proposed Date</label>
                  <input type="date" class="form-input" id="event-date" required>
                </div>
              </div>

              <div class="receipt-divider"></div>
              
              <h3 style="font-size: 1.25rem; margin-bottom: 16px; color: var(--primary-burgundy-dark); font-family: 'Playfair Display', serif;">Your Contact Information</h3>
              
              <div class="admin-form-row">
                <div class="form-group">
                  <label class="form-label" for="event-customer-name">Full Name</label>
                  <input type="text" class="form-input" id="event-customer-name" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="event-customer-phone">Phone Number</label>
                  <input type="tel" class="form-input" id="event-customer-phone" placeholder="e.g. +1 234 567 890" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="event-customer-email">Email Address</label>
                <input type="email" class="form-input" id="event-customer-email" placeholder="john@example.com" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="event-notes">Describe Your Vision (Dietary preferences, theme, food preferences...)</label>
                <textarea class="form-input" id="event-notes" rows="4" placeholder="What food do you want served? Any specific desserts, small chops, cocktails? Do you require staff?"></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-block">Submit Catering Proposal Request</button>
            </form>
          </div>
        </div>
      </section>
    `;
  },

  init: (state) => {
    const form = document.getElementById('catering-inquiry-form');
    const selectPackage = document.getElementById('event-package');
    const container = document.querySelector('.grid-3');

    // Pre-populate details if user logged in
    if (state.currentUser) {
      const nameField = document.getElementById('event-customer-name');
      const emailField = document.getElementById('event-customer-email');
      if (nameField) nameField.value = state.currentUser.name;
      if (emailField) emailField.value = state.currentUser.email;
    }

    // Set today's date + 7 days as minimum for catering dates
    const dateInput = document.getElementById('event-date');
    if (dateInput) {
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 7);
      dateInput.min = minDate.toISOString().split('T')[0];
    }

    // Handle package selection clicking from cards
    if (container) {
      container.addEventListener('click', (e) => {
        const btn = e.target.closest('.select-pkg-btn');
        if (btn) {
          const pkgName = btn.getAttribute('data-package');
          if (selectPackage) {
            selectPackage.value = pkgName;
            // Scroll to form smoothly
            const formEl = document.getElementById('catering-inquiry-form');
            if (formEl) {
              formEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      });
    }

    // Submit listener
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const category = document.getElementById('event-type').value;
        const packageChoice = selectPackage.value;
        const guests = document.getElementById('event-guests').value;
        const date = dateInput.value;
        
        const customerName = document.getElementById('event-customer-name').value;
        const customerPhone = document.getElementById('event-customer-phone').value;
        const customerEmail = document.getElementById('event-customer-email').value;
        const notes = document.getElementById('event-notes').value;

        const inquiry = {
          id: "inq_" + Date.now(),
          type: "Event Catering Booking",
          date: new Date().toISOString().split('T')[0],
          customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone
          },
          details: {
            eventCategory: category,
            preferredPackage: packageChoice,
            expectedGuests: guests,
            proposedEventDate: date,
            notes: notes
          },
          status: "Pending Review"
        };

        window.app.addInquiry(inquiry);
        
        // Reset form details
        form.reset();
        window.app.showToast("Catering inquiry submitted! Our events coordination director will review details and send a proposal.", "success");
      });
    }
  }
};
