export const AuthView = {
  render: (state) => {
    // Check if the user is already logged in
    const isLoggedIn = state.currentUser !== null;

    if (isLoggedIn) {
      const user = state.currentUser;
      const userOrders = state.orders.filter(o => o.customerId === user.email);

      // Render Order History Rows or Cards
      let ordersListHTML = "";
      if (userOrders.length === 0) {
        ordersListHTML = `
          <div style="text-align: center; padding: 40px 24px; background-color: var(--card-bg); border-radius: var(--radius-md); border: 1px dashed var(--border-color); width: 100%;">
            <svg style="width: 48px; height: 48px; fill: var(--text-muted); margin-bottom: 16px;" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px; font-family: 'Playfair Display', serif;">No Orders Placed Yet</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 20px;">You haven't placed any online orders with this account yet.</p>
            <a href="#/menu" class="btn btn-secondary btn-sm">Browse Food Menu</a>
          </div>
        `;
      } else {
        ordersListHTML = userOrders.slice().reverse().map(order => {
          const statusClass = `badge-status-${order.status.toLowerCase().replace(/\s+/g, '-')}`;
          const itemsList = order.items.map(item => `
            <div style="display:flex; justify-content:space-between; margin-bottom: 6px;">
              <span>${item.name} <strong style="color:var(--primary-burgundy-light);">x${item.quantity}</strong></span>
              <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          `).join('');

          return `
            <div class="highlight-card animate-fade-in" style="text-align: left; background-color: var(--card-bg); margin-bottom: 20px; padding: 24px;">
              <div style="display:flex; justify-content:space-between; align-items:start; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:12px;">
                <div>
                  <span class="product-category" style="font-size:0.75rem;">ORDER REF: #GB-${order.id.slice(-6).toUpperCase()}</span>
                  <h3 style="font-family:'Playfair Display',serif; font-size:1.25rem; margin-top:2px;">Placed on ${order.date}</h3>
                </div>
                <span class="badge-status ${statusClass}">${order.status}</span>
              </div>
              
              <div style="font-size:0.85rem; margin-bottom:16px; line-height:1.5; color: var(--text-dark);">
                <strong>Delivery Details:</strong><br>
                Method: ${order.delivery.method}<br>
                Scheduled: ${order.delivery.date} @ ${order.delivery.time}<br>
                ${order.delivery.method === 'Delivery' ? `Venue: ${order.delivery.address}` : 'Central Kitchen Collection'}
              </div>

              <div style="background-color: var(--bg-cream-light); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px; font-size: 0.85rem; margin-bottom: 16px;">
                <strong style="display:block; margin-bottom:8px; color:var(--primary-burgundy-dark);">Items Breakdown:</strong>
                ${itemsList}
                <div class="receipt-divider" style="margin: 8px 0; border-top: 1px dashed var(--border-color);"></div>
                <div style="display:flex; justify-content:space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">
                  <span>Subtotal</span>
                  <span>$${order.subtotal.toFixed(2)}</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">
                  <span>VAT (5%)</span>
                  <span>$${order.tax.toFixed(2)}</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size: 0.8rem; color: var(--text-muted);">
                  <span>Logistics Fee</span>
                  <span>$${order.deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; font-weight:700;">
                <span>Total Paid:</span>
                <span style="font-size: 1.2rem; color: var(--primary-burgundy-dark);">$${order.total.toFixed(2)}</span>
              </div>
            </div>
          `;
        }).join('');
      }

      return `
        <!-- Page Header -->
        <section class="section section-shaded" style="padding: 40px 0; border-bottom: 1px solid var(--border-color);">
          <div class="container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap; gap: 20px;">
            <div>
              <span class="section-tag" style="margin-bottom:2px;">Customer Account</span>
              <h1 style="font-size: 2.5rem; line-height: 1.1; font-family: 'Playfair Display', serif;">My Dashboard</h1>
            </div>
            <button class="btn btn-secondary btn-sm" id="auth-logout-btn">Log Out</button>
          </div>
        </section>

        <!-- Dashboard Layout -->
        <section class="section">
          <div class="container">
            <div class="grid-3" style="grid-template-columns: 1fr 2fr; gap: 40px; align-items: start;">
              <!-- Profile Info Card -->
              <div class="testimonials-summary animate-fade-in" style="align-items: flex-start; text-align: left; padding: 30px; border-radius: var(--radius-md);">
                <div style="width: 60px; height: 60px; border-radius: 50%; background-color: rgba(96,11,20,0.1); color: var(--primary-burgundy); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                  <svg style="width:32px;height:32px;fill:currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h2 style="font-family:'Playfair Display', serif; font-size:1.6rem; margin-bottom: 4px; color:var(--primary-burgundy-dark);">${user.name}</h2>
                <span style="font-size:0.75rem; background-color: var(--accent-gold); color: var(--text-dark); padding: 2px 8px; border-radius: 4px; font-weight:700; margin-bottom: 16px; text-transform: uppercase;">${user.role}</span>
                
                <div style="font-size:0.9rem; line-height: 1.6; color: var(--text-muted); width: 100%;">
                  <div style="margin-bottom:8px;">
                    <strong style="color:var(--text-dark);">Email:</strong><br>
                    ${user.email}
                  </div>
                  <div style="margin-bottom:8px;">
                    <strong style="color:var(--text-dark);">Status:</strong><br>
                    Active Member Since 2026
                  </div>
                </div>
                
                <div class="receipt-divider" style="width:100%; margin: 20px 0; border-top: 1px dashed var(--border-color);"></div>
                
                ${user.role === 'admin' ? `
                  <a href="#/admin" class="btn btn-gold btn-block btn-sm" style="text-align: center;">Go to Staff Dashboard</a>
                ` : `
                  <a href="#/menu" class="btn btn-primary btn-block btn-sm" style="text-align: center;">Place New Order</a>
                `}
              </div>

              <!-- Orders History Area -->
              <div>
                <h2 style="font-size:1.75rem; color:var(--primary-burgundy-dark); font-family:'Playfair Display',serif; margin-bottom: 20px;">My Order History</h2>
                <div style="display:flex; flex-direction:column; gap: 10px;">
                  ${ordersListHTML}
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    // Logged-out layout
    const activeTab = state.authActiveTab || "login";
    
    return `
      <!-- Page Header -->
      <section class="section section-shaded" style="padding: 40px 0; text-align: center; border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <span class="section-tag">Member Area</span>
          <h1 style="font-size: 2.5rem; margin-bottom: 8px; font-family: 'Playfair Display', serif;">Customer Portal</h1>
          <p class="section-subtitle" style="max-width: 600px; margin: 0 auto;">Sign in to access your orders, track catering quotes, and view transaction history.</p>
        </div>
      </section>

      <!-- Auth Section -->
      <section class="section">
        <div class="container" style="max-width: 500px;">
          <div class="checkout-section-box animate-fade-in" style="margin-bottom: 0;">
            <!-- Tabs -->
            <div class="auth-tabs" id="auth-tabs-toggle">
              <button class="auth-tab ${activeTab === 'login' ? 'active' : ''}" data-tab="login">Sign In</button>
              <button class="auth-tab ${activeTab === 'register' ? 'active' : ''}" data-tab="register">Register</button>
            </div>

            <!-- Login Form -->
            <div id="auth-login-form-wrapper" style="display: ${activeTab === 'login' ? 'block' : 'none'};">
              <form id="auth-login-form">
                <div class="form-group">
                  <label class="form-label" for="login-email">Email Address</label>
                  <input type="email" class="form-input" id="login-email" value="customer@goldandburgundy.com" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="login-password">Password</label>
                  <input type="password" class="form-input" id="login-password" value="customer123" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
              </form>
              <div class="auth-switch">
                Don't have an account? <span id="switch-to-register" style="color: var(--primary-burgundy); font-weight: 600; cursor: pointer;">Register here</span>
              </div>
            </div>

            <!-- Register Form -->
            <div id="auth-register-form-wrapper" style="display: ${activeTab === 'register' ? 'block' : 'none'};">
              <form id="auth-register-form">
                <div class="form-group">
                  <label class="form-label" for="reg-name">Full Name</label>
                  <input type="text" class="form-input" id="reg-name" placeholder="e.g. John Customer" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="reg-email">Email Address</label>
                  <input type="email" class="form-input" id="reg-email" placeholder="customer@example.com" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="reg-password">Password</label>
                  <input type="password" class="form-input" id="reg-password" placeholder="••••••••" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="reg-confirm">Confirm Password</label>
                  <input type="password" class="form-input" id="reg-confirm" placeholder="••••••••" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Create Account</button>
              </form>
              <div class="auth-switch">
                Already have an account? <span id="switch-to-login" style="color: var(--primary-burgundy); font-weight: 600; cursor: pointer;">Sign in here</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: (state) => {
    // Check if logged in
    const isLoggedIn = state.currentUser !== null;

    if (isLoggedIn) {
      const logoutBtn = document.getElementById('auth-logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          window.app.logout();
        });
      }
      return;
    }

    // Tab buttons selectors
    const tabsToggleContainer = document.getElementById('auth-tabs-toggle');
    const switchToReg = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');

    function selectTab(tabName) {
      state.authActiveTab = tabName;
      window.app.handleRouting();
    }

    if (tabsToggleContainer) {
      tabsToggleContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.auth-tab');
        if (tabBtn) {
          const tab = tabBtn.getAttribute('data-tab');
          selectTab(tab);
        }
      });
    }

    if (switchToReg) {
      switchToReg.addEventListener('click', () => {
        selectTab('register');
      });
    }

    if (switchToLogin) {
      switchToLogin.addEventListener('click', () => {
        selectTab('login');
      });
    }

    // Login Form Submit handler
    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-password').value;

        const success = window.app.login(email, pass);
        if (success) {
          window.app.handleRouting();
        }
      });
    }

    // Register Form Submit handler
    const registerForm = document.getElementById('auth-register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const pass = document.getElementById('reg-password').value;
        const confirmPass = document.getElementById('reg-confirm').value;

        if (pass !== confirmPass) {
          window.app.showToast("Passwords do not match.", "warning");
          return;
        }

        const success = window.app.register(name, email, pass);
        if (success) {
          const loginSuccess = window.app.login(email, pass);
          if (loginSuccess) {
            window.app.handleRouting();
          }
        }
      });
    }
  }
};
