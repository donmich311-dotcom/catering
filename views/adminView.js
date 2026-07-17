export const AdminView = {
  render: (state) => {
    // 1. Authenticate check: If current user is not admin, show admin login gateway
    const isAdmin = state.currentUser && (state.currentUser.email === "admin@goldandburgundy.com" || state.currentUser.role === "admin");
    
    if (!isAdmin) {
      return `
        <section class="section">
          <div class="container animate-fade-in" style="max-width: 450px; padding: 60px 0;">
            <div class="checkout-section-box text-center" style="text-align: center; margin-bottom: 0;">
              <div style="width: 70px; height: 70px; border-radius: 50%; background-color: rgba(96,11,20,0.1); color: var(--primary-burgundy); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <svg style="width:36px;height:36px;fill:currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h2 style="font-family:'Playfair Display', serif; font-size:1.75rem; margin-bottom: 8px; color:var(--primary-burgundy-dark)">Admin Gateway Portal</h2>
              <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom: 24px;">This section is restricted to administrative personnel. Log in below or bypass to explore the dashboard.</p>
              
              <form id="admin-login-gateway-form">
                <div class="form-group" style="text-align: left;">
                  <label class="form-label" for="admin-email">Admin Email</label>
                  <input type="email" class="form-input" id="admin-email" value="admin@goldandburgundy.com" required>
                </div>
                <div class="form-group" style="text-align: left;">
                  <label class="form-label" for="admin-password">Secure Password</label>
                  <input type="password" class="form-input" id="admin-password" placeholder="••••••••" required>
                </div>
                
                <button type="submit" class="btn btn-primary btn-block">Sign In As Admin</button>
                <div class="receipt-divider"></div>
                <button type="button" class="btn btn-gold btn-block btn-sm" id="btn-admin-bypass">Bypass with Mock Admin</button>
              </form>
            </div>
          </div>
        </section>
      `;
    }

    // 2. Authenticated Admin View: Render layout with sidebar and tabs
    const activeTab = state.adminActiveTab || "overview";

    return `
      <!-- Admin Top bar -->
      <section class="section section-shaded" style="padding: 30px 0; border-bottom: 1px solid var(--border-color);">
        <div class="nav-container" style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span class="section-tag" style="margin-bottom:2px;">Staff Operations</span>
            <h1 style="font-size: 2.2rem; line-height: 1.1;">Admin Control Center</h1>
          </div>
          <div style="display:flex; align-items:center; gap: 12px;">
            <span style="font-size:0.85rem; color:var(--text-muted);">Logged in: <strong>Administrator</strong></span>
            <button class="btn btn-secondary btn-sm" id="admin-logout-btn">Log Out</button>
          </div>
        </div>
      </section>

      <!-- Main Layout -->
      <section class="section" style="padding: 40px 0;">
        <div class="container">
          <div class="admin-layout">
            <!-- Sidebar navigation -->
            <div class="admin-sidebar animate-fade-in">
              <ul class="admin-menu-list" id="admin-tab-menu">
                <li class="admin-menu-item ${activeTab === 'overview' ? 'active' : ''}" data-target-tab="overview">
                  <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                  Overview
                </li>
                <li class="admin-menu-item ${activeTab === 'products' ? 'active' : ''}" data-target-tab="products">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                  Products
                </li>
                <li class="admin-menu-item ${activeTab === 'orders' ? 'active' : ''}" data-target-tab="orders">
                  <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                  Orders (${state.orders.length})
                </li>
                <li class="admin-menu-item ${activeTab === 'inquiries' ? 'active' : ''}" data-target-tab="inquiries">
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  Inquiries (${state.inquiries.length})
                </li>
                <li class="admin-menu-item ${activeTab === 'subscribers' ? 'active' : ''}" data-target-tab="subscribers">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                  Newsletter (${state.subscribers.length})
                </li>
              </ul>
            </div>
            
            <!-- Dashboard Content Container -->
            <div class="admin-content-box animate-fade-in" id="admin-tab-content-mount">
              <!-- Content injected dynamically in init() -->
              Loading panel content...
            </div>
          </div>
        </div>
      </section>
      
      <!-- Add Product Modal Form -->
      <div class="modal-overlay" id="admin-product-modal">
        <div class="modal-content animate-fade-in">
          <button class="close-modal-btn" id="admin-product-modal-close">&times;</button>
          <h2 style="font-family:'Playfair Display', serif; font-size:1.8rem; margin-bottom: 8px; color:var(--primary-burgundy-dark);" id="product-modal-title">Add New Menu Item</h2>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom: 24px;">Publish a catering food, cake, drink or small chops package onto the store front.</p>
          
          <form id="admin-product-form">
            <input type="hidden" id="edit-product-id" value="">
            
            <div class="form-group">
              <label class="form-label" for="new-product-name">Product Name</label>
              <input type="text" class="form-input" id="new-product-name" placeholder="e.g. Red Velvet Deluxe" required>
            </div>

            <div class="admin-form-row">
              <div class="form-group">
                <label class="form-label" for="new-product-category">Category</label>
                <select class="form-input" id="new-product-category" required>
                  <option value="Cakes">Cakes</option>
                  <option value="Small Chops">Small Chops</option>
                  <option value="Pastries">Pastries</option>
                  <option value="Meals">Meals</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Event Catering">Event Catering</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="new-product-price">Unit Price ($)</label>
                <input type="number" step="0.01" class="form-input" id="new-product-price" placeholder="45.00" required>
              </div>
            </div>

            <div class="admin-form-row">
              <div class="form-group">
                <label class="form-label" for="new-product-stock">Stock Availability</label>
                <input type="number" class="form-input" id="new-product-stock" placeholder="20" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="new-product-image">Visual Image Template</label>
                <select class="form-input" id="new-product-image">
                  <option value="assets/carousel-wedding.png">Wedding Style</option>
                  <option value="assets/carousel-birthday.png">Birthday Style</option>
                  <option value="assets/carousel-cupcakes.png">Cupcake Style</option>
                  <option value="assets/carousel-chops.png" selected>Small Chops Platter</option>
                  <option value="assets/carousel-dessert.png">Dessert Selection</option>
                  <option value="assets/carousel-catering.png">Catered Buffet</option>
                  <option value="assets/carousel-pastry.png">Pastries Baker</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="new-product-desc">Item Description</label>
              <textarea class="form-input" id="new-product-desc" rows="3" placeholder="Explain the ingredients, serving counts..." required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="btn-product-submit">Publish Item</button>
          </form>
        </div>
      </div>
    `;
  },

  renderOverviewTab: (state) => {
    // Calculations
    const totalOrders = state.orders.length;
    const totalRevenue = state.orders.reduce((acc, curr) => curr.status !== 'Cancelled' ? acc + curr.total : acc, 0);
    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00";
    
    // Unique customers count
    const uniqueCustomers = new Set(state.orders.map(o => o.customerId)).size;

    // Categories graph heights calculation
    const categoryTotals = { Cakes: 0, "Small Chops": 0, Pastries: 0, Meals: 0, Drinks: 0, "Event Catering": 0 };
    state.orders.forEach(ord => {
      if (ord.status === 'Cancelled') return;
      ord.items.forEach(i => {
        if (categoryTotals[i.category] !== undefined) {
          categoryTotals[i.category] += (i.price * i.quantity);
        }
      });
    });

    const maxCatTotal = Math.max(...Object.values(categoryTotals), 100);
    
    const chartBarsHTML = Object.entries(categoryTotals).map(([cat, val]) => {
      const heightPercent = (val / maxCatTotal) * 150; // clamp max visual height to 150px
      return `
        <div class="admin-chart-bar-col">
          <div class="admin-chart-bar" style="height: ${heightPercent}px" data-value="$${val.toFixed(0)}"></div>
          <span class="admin-chart-label">${cat}</span>
        </div>
      `;
    }).join('');

    // Renders brief list of recent orders
    const recentOrdersRows = state.orders.slice(-5).reverse().map(o => {
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid var(--border-color); font-size:0.85rem;">
          <div>
            <strong>#${o.id.slice(-6).toUpperCase()}</strong> - ${o.delivery.name}<br>
            <span style="color:var(--text-muted); font-size:0.75rem;">${o.date} | ${o.items.length} item(s)</span>
          </div>
          <div style="text-align:right;">
            <strong>$${o.total.toFixed(2)}</strong><br>
            <span style="font-size:0.7rem; font-weight:700; color:var(--primary-burgundy-light);">${o.status}</span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <h2 style="font-family:'Playfair Display', serif; font-size:1.8rem; margin-bottom: 24px; color:var(--primary-burgundy-dark);">Sales Overview</h2>
      
      <!-- Stats widgets -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card">
          <span class="admin-stat-label">Total Sales</span>
          <div class="admin-stat-value">$${totalRevenue.toFixed(2)}</div>
        </div>
        <div class="admin-stat-card">
          <span class="admin-stat-label">Orders Placed</span>
          <div class="admin-stat-value">${totalOrders}</div>
        </div>
        <div class="admin-stat-card">
          <span class="admin-stat-label">Average Ticket</span>
          <div class="admin-stat-value">$${avgOrderValue}</div>
        </div>
        <div class="admin-stat-card">
          <span class="admin-stat-label">Unique Clients</span>
          <div class="admin-stat-value">${uniqueCustomers}</div>
        </div>
      </div>

      <!-- Chart & Recent log side-by-side -->
      <div class="grid-2" style="grid-template-columns: 1.5fr 1fr; gap: 30px;">
        <!-- Chart -->
        <div class="admin-chart-box">
          <h3 style="font-family:'Playfair Display', serif; font-size:1.25rem; margin-bottom: 16px;">Revenue By Culinary Category</h3>
          <div class="admin-chart-visual">
            ${chartBarsHTML}
          </div>
        </div>
        
        <!-- Recents panel -->
        <div class="admin-chart-box" style="background-color: var(--card-bg);">
          <h3 style="font-family:'Playfair Display', serif; font-size:1.25rem; margin-bottom: 16px;">Recent Orders</h3>
          <div>
            ${recentOrdersRows || '<p style="color:var(--text-muted); font-size:0.85rem;">No recent orders listed.</p>'}
          </div>
        </div>
      </div>
    `;
  },

  renderProductsTab: (state) => {
    const productsRows = state.products.map(p => `
      <tr>
        <td>
          <img src="${p.image}" alt="${p.name}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
        </td>
        <td><strong>${p.name}</strong></td>
        <td>${p.category}</td>
        <td><strong>$${p.price.toFixed(2)}</strong></td>
        <td>${p.stock}</td>
        <td>
          <button class="btn btn-secondary btn-sm edit-prod-btn" data-id="${p.id}" style="padding: 4px 8px; font-size:0.75rem; border-color: #3b82f6; color:#3b82f6;">Edit</button>
          <button class="btn btn-secondary btn-sm delete-prod-btn" data-id="${p.id}" style="padding: 4px 8px; font-size:0.75rem; border-color: #ef4444; color:#ef4444;">Delete</button>
        </td>
      </tr>
    `).join('');

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
        <h2 style="font-family:'Playfair Display', serif; font-size:1.8rem; color:var(--primary-burgundy-dark);">Manage Menu Products</h2>
        <button class="btn btn-primary btn-sm" id="btn-admin-add-product">Add Product</button>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Unit Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${productsRows}
          </tbody>
        </table>
      </div>
    `;
  },

  renderOrdersTab: (state) => {
    const orderRows = state.orders.slice().reverse().map(o => {
      const itemsList = o.items.map(i => `${i.name} (x${i.quantity})`).join('<br>');
      
      return `
        <tr>
          <td><strong style="font-family:monospace; color:var(--primary-burgundy-light);">#${o.id.slice(-6).toUpperCase()}</strong></td>
          <td>
            <strong>${o.delivery.name}</strong><br>
            <span style="font-size:0.75rem; color:var(--text-muted);">${o.delivery.phone}</span>
          </div>
          </td>
          <td style="font-size:0.8rem; max-width:200px; overflow-wrap:break-word;">${itemsList}</td>
          <td><strong>$${o.total.toFixed(2)}</strong></td>
          <td>
            <select class="form-input admin-status-select" data-order-id="${o.id}" style="padding: 4px 8px; font-size: 0.8rem; border-radius:4px; width:auto; font-weight:600; cursor:pointer;">
              <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Preparing" ${o.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
              <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
              <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <h2 style="font-family:'Playfair Display', serif; font-size:1.8rem; margin-bottom: 24px; color:var(--primary-burgundy-dark);">Manage Customer Orders</h2>
      
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Details</th>
              <th>Items Ordered</th>
              <th>Grand Total</th>
              <th>Order Progress Status</th>
            </tr>
          </thead>
          <tbody>
            ${orderRows || '<tr><td colspan="5" style="text-align:center; padding:30px; color:var(--text-muted);">No orders placed yet.</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  },

  renderInquiriesTab: (state) => {
    const inquiryCards = state.inquiries.slice().reverse().map(inq => {
      // Check details breakdown
      let detailsHTML = '';
      if (inq.type === 'Custom Cake Design') {
        detailsHTML = `
          <strong>Tiers:</strong> ${inq.details.tiers} | <strong>Size:</strong> ${inq.details.size}<br>
          <strong>Flavor:</strong> ${inq.details.flavor} | <strong>Frosting:</strong> ${inq.details.frosting}<br>
          <strong>Icing text:</strong> "${inq.details.pipingText}"<br>
          <strong>Estimated Quote:</strong> <span style="color:var(--primary-burgundy); font-weight:700;">${inq.details.estimatedPrice}</span>
        `;
      } else if (inq.type === 'Event Catering Booking') {
        detailsHTML = `
          <strong>Category:</strong> ${inq.details.eventCategory} | <strong>Package:</strong> ${inq.details.preferredPackage}<br>
          <strong>Expected Guests:</strong> ${inq.details.expectedGuests} guests | <strong>Proposed Date:</strong> ${inq.details.proposedEventDate}
        `;
      } else {
        // Contact message
        detailsHTML = `<strong>Subject:</strong> ${inq.details.subject}`;
      }

      return `
        <div class="highlight-card" style="text-align:left; background-color: var(--bg-cream-light); margin-bottom:16px; padding:24px;">
          <div style="display:flex; justify-content:between; align-items:start; margin-bottom: 12px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
            <div style="flex-grow:1;">
              <span class="product-category" style="font-size:0.75rem;">${inq.type}</span>
              <h3 style="font-family:'Playfair Display',serif; font-size:1.25rem; margin-top:2px;">Ticket ID: #INQ-${inq.id.slice(-6).toUpperCase()}</h3>
            </div>
            <span style="font-size:0.75rem; color:var(--text-muted);">${inq.date}</span>
          </div>
          
          <div style="font-size:0.85rem; margin-bottom: 12px; line-height: 1.5;">
            <strong>Client Name:</strong> ${inq.customer.name}<br>
            <strong>Email / Phone:</strong> ${inq.customer.email} / ${inq.customer.phone}
          </div>

          <div style="background-color: white; border:1px solid var(--border-color); border-radius:6px; padding:12px; font-size:0.85rem; margin-bottom:16px; line-height: 1.5;">
            ${detailsHTML}
            ${inq.details.notes ? `<br><strong style="display:block; margin-top:8px;">Custom Notes:</strong> "${inq.details.notes}"` : ''}
          </div>
          
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="badge-status badge-status-pending">${inq.status}</span>
            <button class="btn btn-secondary btn-sm mark-read-inq-btn" data-inq-id="${inq.id}" style="padding:4px 10px; font-size:0.75rem;">Mark as Processed</button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <h2 style="font-family:'Playfair Display', serif; font-size:1.8rem; margin-bottom: 24px; color:var(--primary-burgundy-dark);">Messages & Design Inquiries</h2>
      <div style="display:flex; flex-direction:column;">
        ${inquiryCards || '<p style="color:var(--text-muted); font-size:0.95rem;">No customer inquiries or submissions yet.</p>'}
      </div>
    `;
  },

  renderSubscribersTab: (state) => {
    const listHTML = state.subscribers.map((email, idx) => `
      <tr>
        <td><strong>${idx + 1}</strong></td>
        <td>${email}</td>
        <td><span class="badge-status badge-status-completed">Active Subscriber</span></td>
      </tr>
    `).join('');

    return `
      <h2 style="font-family:'Playfair Display', serif; font-size:1.8rem; margin-bottom: 24px; color:var(--primary-burgundy-dark);">Newsletter Subscribers List</h2>
      
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 80px;">Index</th>
              <th>Subscriber Email Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${listHTML || '<tr><td colspan="3" style="text-align:center; padding:30px; color:var(--text-muted);">No newsletter subscribers registered yet.</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  },

  init: (state) => {
    // Check if authenticated
    const isAdmin = state.currentUser && (state.currentUser.email === "admin@goldandburgundy.com" || state.currentUser.role === "admin");
    
    if (!isAdmin) {
      const loginForm = document.getElementById('admin-login-gateway-form');
      const bypassBtn = document.getElementById('btn-admin-bypass');

      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('admin-email').value;
          const pass = document.getElementById('admin-password').value;

          const success = window.app.login(email, pass);
          if (success) {
            // Re-render admin view
            window.location.reload();
          } else {
            window.app.showToast("Incorrect password. Or use the quick Test Bypass button.", "danger");
          }
        });
      }

      if (bypassBtn) {
        bypassBtn.addEventListener('click', () => {
          // Force login admin details
          const adminObj = {
            name: "Head Administrator",
            email: "admin@goldandburgundy.com",
            role: "admin"
          };
          window.app.loginAsAdmin(adminObj);
        });
      }
      return;
    }

    // Authenticated panel initialization
    const menuContainer = document.getElementById('admin-tab-menu');
    const contentMount = document.getElementById('admin-tab-content-mount');
    const logoutBtn = document.getElementById('admin-logout-btn');

    let currentTab = state.adminActiveTab || "overview";

    function mountTab(tab) {
      currentTab = tab;
      state.adminActiveTab = tab; // save tab state
      
      if (!contentMount) return;

      // Update menu items selection
      document.querySelectorAll('#admin-tab-menu .admin-menu-item').forEach(el => {
        if (el.getAttribute('data-target-tab') === tab) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });

      // Render correct HTML
      if (tab === 'overview') {
        contentMount.innerHTML = AdminView.renderOverviewTab(state);
      } else if (tab === 'products') {
        contentMount.innerHTML = AdminView.renderProductsTab(state);
      } else if (tab === 'orders') {
        contentMount.innerHTML = AdminView.renderOrdersTab(state);
      } else if (tab === 'inquiries') {
        contentMount.innerHTML = AdminView.renderInquiriesTab(state);
      } else if (tab === 'subscribers') {
        contentMount.innerHTML = AdminView.renderSubscribersTab(state);
      }
    }

    // Mount initial tab
    mountTab(currentTab);

    // Sidebar tab clicks
    if (menuContainer) {
      menuContainer.addEventListener('click', (e) => {
        const item = e.target.closest('.admin-menu-item');
        if (item) {
          const tab = item.getAttribute('data-target-tab');
          mountTab(tab);
        }
      });
    }

    // Log out button
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        window.app.logout();
      });
    }

    // Delegation handler for Dynamic mount tab content (order status change, product editing/adding)
    if (contentMount) {
      contentMount.addEventListener('change', (e) => {
        // Status select dropdown change
        if (e.target.classList.contains('admin-status-select')) {
          const orderId = e.target.getAttribute('data-order-id');
          const newStatus = e.target.value;
          window.app.updateOrderStatus(orderId, newStatus);
        }
      });

      contentMount.addEventListener('click', (e) => {
        // Process Inquiry button
        const btnMark = e.target.closest('.mark-read-inq-btn');
        if (btnMark) {
          const inqId = btnMark.getAttribute('data-inq-id');
          window.app.updateInquiryStatus(inqId, "Processed & Filed");
          mountTab('inquiries');
        }

        // Add Product trigger (opens modal)
        if (e.target.id === 'btn-admin-add-product') {
          openProductModal();
        }

        // Edit Product trigger (loads data into modal)
        const btnEdit = e.target.closest('.edit-prod-btn');
        if (btnEdit) {
          const pid = btnEdit.getAttribute('data-id');
          const prod = state.products.find(p => p.id === pid);
          if (prod) {
            openProductModal(prod);
          }
        }

        // Delete Product trigger
        const btnDelete = e.target.closest('.delete-prod-btn');
        if (btnDelete) {
          const pid = btnDelete.getAttribute('data-id');
          if (confirm("Are you sure you want to delete this menu item?")) {
            window.app.deleteProduct(pid);
            mountTab('products');
          }
        }
      });
    }

    // Modal product nodes
    const prodModal = document.getElementById('admin-product-modal');
    const prodModalClose = document.getElementById('admin-product-modal-close');
    const prodForm = document.getElementById('admin-product-form');
    const editIdInput = document.getElementById('edit-product-id');
    const modalTitle = document.getElementById('product-modal-title');
    const btnSubmit = document.getElementById('btn-product-submit');

    function openProductModal(product = null) {
      if (!prodModal) return;
      
      if (product) {
        // Edit Mode
        modalTitle.innerText = "Edit Menu Item Details";
        editIdInput.value = product.id;
        document.getElementById('new-product-name').value = product.name;
        document.getElementById('new-product-category').value = product.category;
        document.getElementById('new-product-price').value = product.price;
        document.getElementById('new-product-stock').value = product.stock;
        document.getElementById('new-product-image').value = product.image;
        document.getElementById('new-product-desc').value = product.description;
        btnSubmit.innerText = "Save Changes";
      } else {
        // Add Mode
        modalTitle.innerText = "Add New Menu Item";
        editIdInput.value = "";
        if (prodForm) prodForm.reset();
        btnSubmit.innerText = "Publish Item";
      }
      
      prodModal.classList.add('active');
    }

    function closeProductModal() {
      if (prodModal) prodModal.classList.remove('active');
    }

    if (prodModalClose) {
      prodModalClose.addEventListener('click', closeProductModal);
    }

    if (prodModal) {
      prodModal.addEventListener('click', (e) => {
        if (e.target === prodModal) {
          closeProductModal();
        }
      });
    }

    // Save/Add Product Form Submit
    if (prodForm) {
      prodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const pid = editIdInput.value;
        const name = document.getElementById('new-product-name').value.trim();
        const category = document.getElementById('new-product-category').value;
        const price = parseFloat(document.getElementById('new-product-price').value);
        const stock = parseInt(document.getElementById('new-product-stock').value, 10);
        const image = document.getElementById('new-product-image').value;
        const description = document.getElementById('new-product-desc').value.trim();

        if (pid) {
          // Save Edit
          const updated = { id: pid, name, category, price, stock, image, description, rating: 5.0 };
          window.app.editProduct(updated);
          window.app.showToast("Product updated successfully!", "success");
        } else {
          // Add New
          const newProd = {
            id: "p_" + Date.now(),
            name,
            category,
            price,
            stock,
            image,
            description,
            rating: 5.0
          };
          window.app.addProduct(newProd);
          window.app.showToast("New product published successfully!", "success");
        }

        closeProductModal();
        mountTab('products');
      });
    }
  }
};
