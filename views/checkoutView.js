export const CheckoutView = {
  render: (state) => {
    // If cart is empty, redirect or display a notice
    if (state.cart.length === 0 && !state.latestOrder) {
      return `
        <section class="section">
          <div class="container text-center" style="max-width: 500px; padding: 80px 24px; text-align: center;">
            <svg style="width:64px;height:64px;fill:var(--primary-burgundy);margin-bottom:20px;" viewBox="0 0 24 24">
              <path d="M17.21 9l-4.38-6.56c-.18-.28-.5-.44-.83-.44-.33 0-.65.16-.83.44L6.79 9H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h18.21l-1.92 6.6c-.15.52-.63.9-1.18.9H5.89c-.55 0-1.03-.38-1.18-.9L3 13H1v1c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-1.17c0-.55-.38-1.03-.9-1.18L19.21 9h-2zm-5.21-4.8L15.2 9H8.8l3.2-4.8z"/>
            </svg>
            <h2 style="font-family:'Playfair Display', serif; font-size:1.8rem; margin-bottom:12px;">Your Cart is Empty</h2>
            <p style="color:var(--text-muted); margin-bottom: 24px;">Add delicious catering items to your shopping cart before attempting checkout.</p>
            <a href="#/menu" class="btn btn-primary">Browse Food Menu</a>
          </div>
        </section>
      `;
    }

    // If an order was just completed, render the printable Invoice Receipt
    if (state.latestOrder) {
      const order = state.latestOrder;
      const orderItemsHTML = order.items.map(item => `
        <div class="receipt-item-line">
          <span>${item.name} x ${item.quantity}</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `).join('');

      return `
        <section class="section animate-fade-in" style="padding-top: 40px;">
          <div class="container">
            <div style="text-align:center; margin-bottom: 30px;">
              <div style="width: 60px; height: 60px; border-radius: 50%; background-color: #22c55e; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 1.8rem;">✓</div>
              <h1 style="font-size: 2.2rem; margin-bottom: 8px;">Order Placed Successfully!</h1>
              <p style="color:var(--text-muted);">Thank you for choosing Gold & Burgundy. Your invoice has been generated below.</p>
            </div>
            
            <!-- Printer Invoice style -->
            <div class="receipt-box">
              <div class="receipt-header">
                <h2>GOLD & BURGUNDY</h2>
                <p>Premium Event Catering & Cakes</p>
                <p style="font-size:0.75rem; color:var(--text-muted); margin-top: 4px;">15 Elegance Ave, Culinary District, Lagos</p>
              </div>
              
              <div class="receipt-item-line" style="font-size: 0.8rem; color:var(--text-muted); margin-bottom: 16px;">
                <span>Invoice Ref: #GB-${order.id.slice(-6).toUpperCase()}</span>
                <span>Date: ${order.date}</span>
              </div>
              
              <div style="font-size: 0.8rem; margin-bottom: 20px;">
                <strong>Deliver To:</strong><br>
                Name: ${order.delivery.name}<br>
                Phone: ${order.delivery.phone}<br>
                Method: ${order.delivery.method}<br>
                ${order.delivery.method === 'Delivery' ? `Address: ${order.delivery.address}<br>` : ''}
                Schedule: ${order.delivery.date} @ ${order.delivery.time}
              </div>

              <div class="receipt-divider"></div>
              
              <h3 style="font-size: 0.9rem; margin-bottom: 12px; font-weight: bold;">ORDER BREAKDOWN</h3>
              ${orderItemsHTML}
              
              <div class="receipt-divider"></div>
              
              <div class="receipt-item-line" style="font-size:0.85rem;">
                <span>Subtotal</span>
                <span>$${order.subtotal.toFixed(2)}</span>
              </div>
              <div class="receipt-item-line" style="font-size:0.85rem;">
                <span>VAT (5%)</span>
                <span>$${order.tax.toFixed(2)}</span>
              </div>
              <div class="receipt-item-line" style="font-size:0.85rem;">
                <span>Delivery Logistics</span>
                <span>$${order.deliveryFee.toFixed(2)}</span>
              </div>
              
              <div class="receipt-divider"></div>
              
              <div class="receipt-total-line">
                <span>TOTAL AMOUNT</span>
                <span>$${order.total.toFixed(2)}</span>
              </div>
              
              <div class="receipt-divider"></div>
              
              <div style="text-align: center; font-size: 0.75rem; color:var(--text-muted); line-height: 1.4;">
                Payment Method: SECURE ONLINE CARD (PAID)<br>
                Transaction Ref: TXN-${order.id.slice(-8).toUpperCase()}<br><br>
                Thank you for your business! Please keep this receipt handy for delivery confirmation.
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 40px; display:flex; justify-content:center; gap: 16px;">
              <button class="btn btn-secondary" onclick="window.print()">Print Invoice</button>
              <button class="btn btn-primary" id="btn-return-menu">Continue Shopping</button>
            </div>
          </div>
        </section>
      `;
    }

    // Render Checkout Form & Cart review
    const subtotal = state.cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const tax = subtotal * 0.05;
    let deliveryFee = 10.00;
    let total = subtotal + tax + deliveryFee;

    const cartReviewHTML = state.cart.map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; font-size:0.9rem;">
        <span style="color:var(--text-dark);">${item.name} <strong style="color:var(--primary-burgundy-light);">x${item.quantity}</strong></span>
        <span style="font-weight:600;">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');

    return `
      <!-- Page Header -->
      <section class="section section-shaded" style="padding: 40px 0; text-align: center; border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <span class="section-tag">Final Steps</span>
          <h1 style="font-size: 2.5rem; margin-bottom: 8px;">Order Checkout</h1>
          <p class="section-subtitle" style="max-width: 600px; margin: 0 auto;">Review order specifications, choose scheduling times, and execute secure card payment.</p>
        </div>
      </section>

      <!-- Checkout Area -->
      <section class="section">
        <div class="container">
          <div class="checkout-layout">
            <!-- Left: Address & Card Forms -->
            <form id="checkout-payment-form">
              <!-- Delivery logistics -->
              <div class="checkout-section-box animate-fade-in">
                <h3 class="checkout-section-title" style="font-size: 1.3rem; color:var(--primary-burgundy-dark);"><span style="color:var(--accent-gold); margin-right:8px;">1.</span>Delivery Logistics</h3>
                
                <div class="form-group">
                  <label class="form-label" for="ship-method">Service Logistics Method</label>
                  <select class="form-input" id="ship-method" required>
                    <option value="Delivery" selected>Home / Venue Delivery (+$10.00)</option>
                    <option value="Pickup">Self Collection at Central Kitchen (Free)</option>
                  </select>
                </div>

                <div class="admin-form-row">
                  <div class="form-group">
                    <label class="form-label" for="ship-name">Recipient Name</label>
                    <input type="text" class="form-input" id="ship-name" placeholder="John Doe" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="ship-phone">Contact Phone</label>
                    <input type="tel" class="form-input" id="ship-phone" placeholder="e.g. +234 801..." required>
                  </div>
                </div>

                <div class="form-group" id="address-input-group">
                  <label class="form-label" for="ship-address">Delivery Address (Street, Apartment, Venue details)</label>
                  <input type="text" class="form-input" id="ship-address" placeholder="12 Broadway Street, Victoria Island" required>
                </div>

                <div class="admin-form-row">
                  <div class="form-group">
                    <label class="form-label" for="ship-date">Delivery Date</label>
                    <input type="date" class="form-input" id="ship-date" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="ship-time">Delivery Time Target</label>
                    <input type="time" class="form-input" id="ship-time" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="ship-notes">Logistics Notes (Gates, allergies, delivery instructions)</label>
                  <textarea class="form-input" id="ship-notes" rows="2" placeholder="e.g., Dial code 45 at gate, separate small chops platter from cold salads..."></textarea>
                </div>
              </div>

              <!-- Payment credentials -->
              <div class="checkout-section-box animate-fade-in">
                <h3 class="checkout-section-title" style="font-size: 1.3rem; color:var(--primary-burgundy-dark);"><span style="color:var(--accent-gold); margin-right:8px;">2.</span>Secure Card Payment</h3>
                
                <!-- Graphic Card Widget Representation -->
                <div class="card-input-wrapper">
                  <div class="card-type-label" id="card-graphic-brand">VISA / MASTER</div>
                  <div class="card-number-display" id="card-graphic-number">•••• •••• •••• ••••</div>
                  <div class="card-details-display">
                    <div>
                      <span style="display:block; opacity:0.6; font-size:0.6rem;">CARD HOLDER</span>
                      <strong id="card-graphic-holder">YOUR NAME</strong>
                    </div>
                    <div>
                      <span style="display:block; opacity:0.6; font-size:0.6rem; text-align:right;">EXPIRES</span>
                      <strong id="card-graphic-expiry">MM/YY</strong>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="card-holder">Cardholder Full Name</label>
                  <input type="text" class="form-input" id="card-holder" placeholder="JOHN DOE" required style="text-transform: uppercase;">
                </div>

                <div class="form-group">
                  <label class="form-label" for="card-number">Credit Card Number</label>
                  <input type="text" class="form-input" id="card-number" placeholder="4111 2222 3333 4444" minlength="16" maxlength="19" required>
                </div>

                <div class="admin-form-row">
                  <div class="form-group">
                    <label class="form-label" for="card-expiry">Expiration Date (MM/YY)</label>
                    <input type="text" class="form-input" id="card-expiry" placeholder="12/28" maxlength="5" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="card-cvv">Security Code (CVV)</label>
                    <input type="password" class="form-input" id="card-cvv" placeholder="•••" maxlength="4" minlength="3" required>
                  </div>
                </div>

                <button type="submit" class="btn btn-primary btn-block" style="margin-top: 10px;">Execute Payment & Place Order</button>
              </div>
            </form>

            <!-- Right: Order Summary Sidebar -->
            <div class="checkout-section-box animate-fade-in" style="height: fit-content; position: sticky; top: 100px;">
              <h3 class="checkout-section-title" style="font-size: 1.3rem; color:var(--primary-burgundy-dark); border-bottom:1px solid var(--border-color); padding-bottom:10px;">Order Review</h3>
              
              <!-- Items list -->
              <div style="max-height: 250px; overflow-y: auto; margin-bottom: 20px; border-bottom: 1px solid var(--bg-cream-dark); padding-bottom: 10px;">
                ${cartReviewHTML}
              </div>

              <!-- Money summary -->
              <div style="display:flex; flex-direction:column; gap:10px; font-size:0.9rem;">
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted);">Cart Subtotal</span>
                  <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted);">VAT Tax (5%)</span>
                  <span>$${tax.toFixed(2)}</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted);">Delivery Logistics</span>
                  <span id="summary-delivery-charge">$${deliveryFee.toFixed(2)}</span>
                </div>
                
                <div class="receipt-divider" style="margin: 10px 0;"></div>
                
                <div style="display:flex; justify-content:space-between; font-weight:700; font-size: 1.15rem; color:var(--primary-burgundy-dark);">
                  <span>Total Cost</span>
                  <span id="summary-grand-total">$${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: (state) => {
    // Check if showing success receipt
    if (state.latestOrder) {
      const returnBtn = document.getElementById('btn-return-menu');
      if (returnBtn) {
        returnBtn.addEventListener('click', () => {
          // Clear latest order history pointer
          state.latestOrder = null;
          window.location.hash = "#/menu";
        });
      }
      return;
    }

    const shipMethod = document.getElementById('ship-method');
    const addressGroup = document.getElementById('address-input-group');
    const addressInput = document.getElementById('ship-address');
    const deliveryChargeEl = document.getElementById('summary-delivery-charge');
    const grandTotalEl = document.getElementById('summary-grand-total');
    
    // Credit card graphic updater hooks
    const cardHolderInput = document.getElementById('card-holder');
    const cardNumberInput = document.getElementById('card-number');
    const cardExpiryInput = document.getElementById('card-expiry');

    const graphicBrand = document.getElementById('card-graphic-brand');
    const graphicNumber = document.getElementById('card-graphic-number');
    const graphicHolder = document.getElementById('card-graphic-holder');
    const graphicExpiry = document.getElementById('card-graphic-expiry');

    const form = document.getElementById('checkout-payment-form');

    // Pre-populate details if user logged in
    if (state.currentUser) {
      const nameField = document.getElementById('ship-name');
      const emailVal = state.currentUser.email;
      
      if (nameField) nameField.value = state.currentUser.name;
    }

    // Set minimum date to tomorrow for orders
    const dateInput = document.getElementById('ship-date');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // Delivery vs pickup toggle
    if (shipMethod) {
      shipMethod.addEventListener('change', () => {
        const subtotal = state.cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        const tax = subtotal * 0.05;
        let deliveryFee = 0.00;

        if (shipMethod.value === 'Delivery') {
          if (addressGroup) addressGroup.style.display = 'block';
          if (addressInput) addressInput.required = true;
          deliveryFee = 10.00;
          if (deliveryChargeEl) deliveryChargeEl.innerText = "$10.00";
        } else {
          if (addressGroup) addressGroup.style.display = 'none';
          if (addressInput) addressInput.required = false;
          deliveryFee = 0.00;
          if (deliveryChargeEl) deliveryChargeEl.innerText = "$0.00";
        }

        const total = subtotal + tax + deliveryFee;
        if (grandTotalEl) grandTotalEl.innerText = `$${total.toFixed(2)}`;
      });
    }

    // Sync input fields with card graphic widget
    if (cardHolderInput) {
      cardHolderInput.addEventListener('input', (e) => {
        const value = e.target.value.toUpperCase();
        if (graphicHolder) graphicHolder.innerText = value || "YOUR NAME";
      });
    }

    if (cardNumberInput) {
      cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Determine Card Brand
        if (graphicBrand) {
          if (value.startsWith('4')) {
            graphicBrand.innerText = "VISA";
          } else if (value.startsWith('5')) {
            graphicBrand.innerText = "MASTERCARD";
          } else if (value.startsWith('3')) {
            graphicBrand.innerText = "AMEX";
          } else {
            graphicBrand.innerText = "VISA / MASTER";
          }
        }

        // Format spaced: 4111 2222 3333 4444
        let formatted = '';
        for (let i = 0; i < value.length && i < 16; i++) {
          if (i > 0 && i % 4 === 0) formatted += ' ';
          formatted += value[i];
        }
        e.target.value = formatted;
        
        if (graphicNumber) {
          graphicNumber.innerText = formatted || "•••• •••• •••• ••••";
        }
      });
    }

    if (cardExpiryInput) {
      cardExpiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
          value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
        if (graphicExpiry) graphicExpiry.innerText = value || "MM/YY";
      });
    }

    // Submit Order Form
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const method = shipMethod.value;
        const recipientName = document.getElementById('ship-name').value;
        const recipientPhone = document.getElementById('ship-phone').value;
        const address = method === 'Delivery' ? addressInput.value : "Kitchen pickup";
        const date = dateInput.value;
        const time = document.getElementById('ship-time').value;
        const notes = document.getElementById('ship-notes').value;

        // Subtotals calculation
        const subtotal = state.cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        const tax = subtotal * 0.05;
        const deliveryFee = method === 'Delivery' ? 10.00 : 0.00;
        const total = subtotal + tax + deliveryFee;

        const order = {
          id: "ord_" + Date.now(),
          customerId: state.currentUser ? state.currentUser.email : "guest_" + Date.now(),
          date: new Date().toISOString().split('T')[0],
          items: [...state.cart],
          subtotal,
          tax,
          deliveryFee,
          total,
          delivery: {
            method,
            name: recipientName,
            phone: recipientPhone,
            address,
            date,
            time,
            notes
          },
          status: "Pending",
          paymentStatus: "Paid"
        };

        // Submit to global state and clear cart
        window.app.placeOrder(order);
      });
    }
  }
};
