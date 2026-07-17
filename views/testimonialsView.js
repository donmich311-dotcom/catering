export const TestimonialsView = {
  render: (state) => {
    // Calculate aggregate score
    const totalReviews = state.reviews.length;
    const averageRating = totalReviews > 0
      ? (state.reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
      : "5.0";

    // Count distributions for stars
    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    state.reviews.forEach(r => {
      const rounded = Math.round(r.rating);
      if (starCounts[rounded] !== undefined) {
        starCounts[rounded]++;
      }
    });

    // Generate distributions html
    const distributionsHTML = [5, 4, 3, 2, 1].map(star => {
      const count = starCounts[star] || 0;
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      return `
        <div class="rating-breakdown-row">
          <span style="width: 50px; font-weight:600;">${star} Stars</span>
          <div class="rating-bar-track">
            <div class="rating-bar-fill" style="width: ${percentage}%"></div>
          </div>
          <span style="width: 30px; text-align: right; color:var(--text-muted);">${count}</span>
        </div>
      `;
    }).join('');

    // Generate reviews items list
    const reviewsHTML = state.reviews.map(rev => `
      <div class="testimonial-card animate-fade-in">
        <div class="testi-header">
          <div>
            <h3 class="testi-author" style="font-family:'Plus Jakarta Sans'; font-size:1.1rem;">${rev.name}</h3>
            <span style="font-size:0.8rem; color:var(--text-muted);">${rev.event}</span>
          </div>
          <div class="stars-list" style="font-size: 1.15rem; margin: 0;">
            ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
          </div>
        </div>
        <p class="testi-comment">"${rev.comment}"</p>
        <div class="testi-footer">
          <span>Verified Client</span>
          <span>${rev.date}</span>
        </div>
      </div>
    `).join('');

    return `
      <!-- Page Header -->
      <section class="section section-shaded" style="padding: 40px 0; text-align: center; border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <span class="section-tag">Client Reviews</span>
          <h1 style="font-size: 2.5rem; margin-bottom: 8px;">Customer Testimonials</h1>
          <p class="section-subtitle" style="max-width: 600px; margin: 0 auto;">Read genuine stories of clients who have celebrated weddings, birthdays, and conferences with our catering.</p>
        </div>
      </section>

      <!-- Rating Stats & Reviews -->
      <section class="section">
        <div class="container">
          <div class="grid-3" style="grid-template-columns: 1fr 2fr; gap: 40px; align-items: start;">
            <!-- Aggregates Card -->
            <div class="testimonials-summary animate-fade-in">
              <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average Rating</span>
              <div class="rating-score-huge">${averageRating}</div>
              <div class="stars-list">
                ${'★'.repeat(Math.round(averageRating))}${'☆'.repeat(5 - Math.round(averageRating))}
              </div>
              <p style="font-size: 0.85rem; color:var(--text-muted); margin-bottom: 24px;">Based on ${totalReviews} customer reviews</p>
              
              <div class="rating-breakdown">
                ${distributionsHTML}
              </div>
              
              <div class="receipt-divider"></div>
              
              <h4 style="font-family:'Playfair Display', serif; font-size:1.25rem; margin-bottom: 8px; color:var(--primary-burgundy-dark)">Share Your Experience</h4>
              <p style="font-size: 0.85rem; color:var(--text-muted); margin-bottom: 16px;">Were you happy with our small chops, cakes or catering? Write a review below.</p>
              <button class="btn btn-secondary btn-block btn-sm" id="btn-open-review-form">Write a Review</button>
            </div>

            <!-- Reviews List -->
            <div style="display:flex; flex-direction:column; gap:20px;">
              <h2 style="font-size:1.75rem; color:var(--primary-burgundy-dark); font-family:'Playfair Display',serif; margin-bottom: 10px;">Recent Client Reviews</h2>
              <div style="display:flex; flex-direction:column; gap:20px;" id="testimonials-list-container">
                ${reviewsHTML}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Review Form Modal Overlay -->
      <div class="modal-overlay" id="review-modal">
        <div class="modal-content animate-fade-in">
          <button class="close-modal-btn" id="review-modal-close">&times;</button>
          
          <h2 style="font-family:'Playfair Display', serif; font-size:1.8rem; margin-bottom: 8px; color:var(--primary-burgundy-dark);">Submit a Review</h2>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom: 24px;">We appreciate your honest feedback. Your review will be published instantly.</p>
          
          <form id="customer-review-form">
            <div class="form-group">
              <label class="form-label">Your Rating</label>
              <div class="star-rating-input" id="review-stars-select">
                <span class="active" data-star="1">★</span>
                <span class="active" data-star="2">★</span>
                <span class="active" data-star="3">★</span>
                <span class="active" data-star="4">★</span>
                <span class="active" data-star="5">★</span>
              </div>
              <input type="hidden" id="review-rating-value" value="5">
            </div>

            <div class="form-group">
              <label class="form-label" for="review-author-name">Full Name</label>
              <input type="text" class="form-input" id="review-author-name" placeholder="John Doe" required>
            </div>

            <div class="admin-form-row">
              <div class="form-group">
                <label class="form-label" for="review-event-type">Event Type</label>
                <select class="form-input" id="review-event-type" required>
                  <option value="Wedding Reception">Wedding Celebration</option>
                  <option value="Birthday Party" selected>Birthday Party</option>
                  <option value="Corporate Lunch">Corporate Lunch</option>
                  <option value="Anniversary Party">Anniversary Party</option>
                  <option value="Private Dinner">Private Dinner</option>
                  <option value="Other Celebrations">Other Occasion</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="review-event-date">Event Date</label>
                <input type="date" class="form-input" id="review-event-date" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="review-comment">Review Description</label>
              <textarea class="form-input" id="review-comment" rows="4" placeholder="How did the cake look? How was the service? Mention your favorite items..." required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-block">Publish Review</button>
          </form>
        </div>
      </div>
    `;
  },

  init: (state) => {
    const btnOpen = document.getElementById('btn-open-review-form');
    const modal = document.getElementById('review-modal');
    const btnClose = document.getElementById('review-modal-close');
    const form = document.getElementById('customer-review-form');
    const starsSelect = document.getElementById('review-stars-select');
    const ratingValue = document.getElementById('review-rating-value');

    // Pre-populate details if user logged in
    if (state.currentUser) {
      const nameField = document.getElementById('review-author-name');
      if (nameField) nameField.value = state.currentUser.name;
    }

    // Set default date to today
    const dateField = document.getElementById('review-event-date');
    if (dateField) {
      dateField.value = new Date().toISOString().split('T')[0];
    }

    // Modal toggling
    if (btnOpen && modal) {
      btnOpen.addEventListener('click', () => {
        modal.classList.add('active');
      });
    }

    function closeModal() {
      if (modal) modal.classList.remove('active');
    }

    if (btnClose) {
      btnClose.addEventListener('click', closeModal);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // Interactive Star Choice
    if (starsSelect && ratingValue) {
      starsSelect.addEventListener('click', (e) => {
        const star = e.target.closest('span');
        if (star) {
          const val = parseInt(star.getAttribute('data-star'), 10);
          ratingValue.value = val;
          
          // Toggle active class on stars
          const stars = starsSelect.querySelectorAll('span');
          stars.forEach(s => {
            const sVal = parseInt(s.getAttribute('data-star'), 10);
            if (sVal <= val) {
              s.classList.add('active');
            } else {
              s.classList.remove('active');
            }
          });
        }
      });
    }

    // Handle Form Submit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const rating = parseInt(ratingValue.value, 10);
        const name = document.getElementById('review-author-name').value;
        const event = document.getElementById('review-event-type').value;
        const date = dateField.value;
        const comment = document.getElementById('review-comment').value;

        const newReview = {
          id: "rev_" + Date.now(),
          name,
          rating,
          comment,
          date,
          event
        };

        window.app.addReview(newReview);
        
        // Reset and close
        form.reset();
        ratingValue.value = 5;
        const stars = starsSelect.querySelectorAll('span');
        stars.forEach(s => s.classList.add('active'));
        closeModal();

        window.app.showToast("Thank you for your feedback! Your review has been published.", "success");
      });
    }
  }
};
