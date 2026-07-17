export const ContactView = {
  render: (state) => {
    // Generate FAQs HTML
    const faqsHTML = state.faqs.map((faq, idx) => `
      <div class="faq-card animate-fade-in" data-index="${idx}">
        <div class="faq-header">
          <h3>${faq.question}</h3>
          <span class="faq-icon-toggle">+</span>
        </div>
        <div class="faq-body">
          <p>${faq.answer}</p>
        </div>
      </div>
    `).join('');

    return `
      <!-- Page Header -->
      <section class="section section-shaded" style="padding: 40px 0; text-align: center; border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <span class="section-tag">Let's Connect</span>
          <h1 style="font-size: 2.5rem; margin-bottom: 8px;">Contact Us & FAQs</h1>
          <p class="section-subtitle" style="max-width: 600px; margin: 0 auto;">Have questions about our catering packages, custom cakes, or pricing? Drop us a line or consult our FAQ guide.</p>
        </div>
      </section>

      <!-- Contact Info & Message Form -->
      <section class="section">
        <div class="container">
          <div class="contact-layout animate-fade-in">
            <!-- Left Info Panel -->
            <div class="contact-info-panel">
              <h2 style="font-family:'Playfair Display', serif; font-size:1.75rem; color:var(--primary-burgundy-dark); margin-bottom: 10px;">Contact Information</h2>
              <p style="color:var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">We operate a central commercial kitchen for cooking and collections. Consultations are available by appointment.</p>
              
              <div class="contact-method-card">
                <div class="contact-method-icon">
                  <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div class="contact-method-details">
                  <h3>Catering Kitchen Location</h3>
                  <p>15 Elegance Avenue, Culinary District, Lagos, Nigeria</p>
                </div>
              </div>

              <div class="contact-method-card">
                <div class="contact-method-icon">
                  <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.149 15.149 0 0 0 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </div>
                <div class="contact-method-details">
                  <h3>Phone & WhatsApp support</h3>
                  <p>+234 812 345 6789 (Mon - Sat, 8 AM - 6 PM)</p>
                </div>
              </div>

              <div class="contact-method-card">
                <div class="contact-method-icon">
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div class="contact-method-details">
                  <h3>Email Communications</h3>
                  <p>hello@goldandburgundy.com<br>orders@goldandburgundy.com</p>
                </div>
              </div>

              <!-- Map Visual -->
              <div class="map-container">
                <div class="mock-map-canvas">
                  <div class="mock-map-marker"></div>
                  <h4 style="font-family:'Playfair Display', serif; font-size:1.15rem; color:var(--primary-burgundy-dark); margin-bottom: 2px;">Gold & Burgundy Kitchen</h4>
                  <p style="font-size:0.75rem; color:var(--text-muted);">15 Elegance Avenue, Lagos</p>
                  <a href="https://maps.google.com" target="_blank" class="btn btn-secondary btn-sm" style="margin-top: 10px; padding: 4px 12px; font-size: 0.75rem;">View on Google Maps</a>
                </div>
              </div>
            </div>

            <!-- Right Message Form -->
            <div class="checkout-section-box">
              <h2 class="checkout-section-title" style="font-size: 1.75rem; color: var(--primary-burgundy-dark); margin-bottom: 12px;">Send Us a Message</h2>
              <p style="color:var(--text-muted); font-size: 0.85rem; margin-bottom: 24px;">Got a general inquiry or feedback? Use this form, and our hospitality team will write back shortly.</p>
              
              <form id="contact-message-form">
                <div class="form-group">
                  <label class="form-label" for="contact-name">Your Full Name</label>
                  <input type="text" class="form-input" id="contact-name" placeholder="John Doe" required>
                </div>
                
                <div class="form-group">
                  <label class="form-label" for="contact-email">Email Address</label>
                  <input type="email" class="form-input" id="contact-email" placeholder="john@example.com" required>
                </div>

                <div class="form-group">
                  <label class="form-label" for="contact-subject">Inquiry Subject</label>
                  <input type="text" class="form-input" id="contact-subject" placeholder="e.g. Menu question, partnership, feedback" required>
                </div>

                <div class="form-group">
                  <label class="form-label" for="contact-body">Message Description</label>
                  <textarea class="form-input" id="contact-body" rows="6" placeholder="Type your message in detail here..." required></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-block">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- Collapsible FAQs -->
      <section class="section section-shaded" id="faq-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Common Inquiries</span>
            <h2 class="section-title">Frequently Asked Questions</h2>
            <p class="section-subtitle">Read quick answers to questions regarding booking policies, cancellations, and deliveries.</p>
          </div>
          
          <div class="faq-grid" id="contact-faq-grid">
            ${faqsHTML}
          </div>
        </div>
      </section>
    `;
  },

  init: (state) => {
    const form = document.getElementById('contact-message-form');
    const faqGrid = document.getElementById('contact-faq-grid');

    // Pre-populate details if logged in
    if (state.currentUser) {
      const nameField = document.getElementById('contact-name');
      const emailField = document.getElementById('contact-email');
      if (nameField) nameField.value = state.currentUser.name;
      if (emailField) emailField.value = state.currentUser.email;
    }

    // Contact Form Submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const body = document.getElementById('contact-body').value;

        const inquiry = {
          id: "msg_" + Date.now(),
          type: "Contact Form Message",
          date: new Date().toISOString().split('T')[0],
          customer: { name, email, phone: "N/A" },
          details: { subject, notes: body },
          status: "Unread"
        };

        window.app.addInquiry(inquiry);
        
        form.reset();
        window.app.showToast("Your message was sent successfully! Our team will reply to your email shortly.", "success");
      });
    }

    // Accordion FAQ Toggles
    if (faqGrid) {
      faqGrid.addEventListener('click', (e) => {
        const header = e.target.closest('.faq-header');
        if (header) {
          const card = header.closest('.faq-card');
          if (card) {
            const isActive = card.classList.contains('active');
            
            // Close all FAQ cards first
            document.querySelectorAll('.faq-card').forEach(c => {
              c.classList.remove('active');
              c.querySelector('.faq-icon-toggle').innerText = '+';
            });

            // Toggle selected card
            if (!isActive) {
              card.classList.add('active');
              card.querySelector('.faq-icon-toggle').innerText = '−';
            }
          }
        }
      });
    }
  }
};
