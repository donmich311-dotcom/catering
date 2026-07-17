// Main application bootstrap and router logic
import { defaultProducts, defaultCateringPackages, defaultReviews, faqs, teamMembers } from './data.js';
import { HomeView } from './views/homeView.js';
import { AboutView } from './views/aboutView.js';
import { MenuView } from './views/menuView.js';
import { CakesView } from './views/cakesView.js';
import { ServicesView } from './views/servicesView.js';
import { GalleryView } from './views/galleryView.js';
import { TestimonialsView } from './views/testimonialsView.js';
import { ContactView } from './views/contactView.js';
import { AuthView } from './views/authView.js';
import { CheckoutView } from './views/checkoutView.js';
import { AdminView } from './views/adminView.js';

class CateringApp {
  constructor() {
    this.state = {
      products: [],
      cateringPackages: defaultCateringPackages,
      reviews: [],
      faqs: faqs,
      teamMembers: teamMembers,
      cart: [],
      orders: [],
      inquiries: [],
      subscribers: [],
      users: [],
      currentUser: null,
      latestOrder: null,
      
      // router temporary status helpers
      menuActiveCategory: "All",
      menuSearchQuery: "",
      adminActiveTab: "overview",
      authActiveTab: "login"
    };

    this.routes = {
      "": HomeView,
      "/": HomeView,
      "/about": AboutView,
      "/menu": MenuView,
      "/cakes": CakesView,
      "/services": ServicesView,
      "/gallery": GalleryView,
      "/testimonials": TestimonialsView,
      "/contact": ContactView,
      "/auth": AuthView,
      "/checkout": CheckoutView,
      "/admin": AdminView
    };

    this.initDatabase();
    this.initEventListeners();
    
    // Mount app global pointer for views access
    window.app = this;
    
    // Boot route
    this.handleRouting();
  }

  // Initialize LocalStorage with default data if empty
  initDatabase() {
    // Products
    if (!localStorage.getItem('gb_products')) {
      localStorage.setItem('gb_products', JSON.stringify(defaultProducts));
    }
    this.state.products = JSON.parse(localStorage.getItem('gb_products'));

    // Reviews
    if (!localStorage.getItem('gb_reviews')) {
      localStorage.setItem('gb_reviews', JSON.stringify(defaultReviews));
    }
    this.state.reviews = JSON.parse(localStorage.getItem('gb_reviews'));

    // Cart
    this.state.cart = JSON.parse(localStorage.getItem('gb_cart')) || [];

    // Orders
    this.state.orders = JSON.parse(localStorage.getItem('gb_orders')) || [];

    // Subscriptions
    this.state.subscribers = JSON.parse(localStorage.getItem('gb_subscribers')) || [];

    // Inquiries (Quotes/Messages)
    this.state.inquiries = JSON.parse(localStorage.getItem('gb_inquiries')) || [];

    // User Accounts
    if (!localStorage.getItem('gb_users')) {
      // Seed a default customer and a default admin
      const defaultUsers = [
        { name: "John Customer", email: "customer@goldandburgundy.com", password: "customer123", role: "customer" },
        { name: "Executive Chef Admin", email: "admin@goldandburgundy.com", password: "admin123", role: "admin" }
      ];
      localStorage.setItem('gb_users', JSON.stringify(defaultUsers));
    }
    this.state.users = JSON.parse(localStorage.getItem('gb_users'));

    // Active session user
    this.state.currentUser = JSON.parse(localStorage.getItem('gb_session_user')) || null;
  }

  // Routing Handler
  handleRouting() {
    // Clear home screen intervals if navigating away
    if (window.homeCarouselCleanup) {
      window.homeCarouselCleanup();
      window.homeCarouselCleanup = null;
    }

    const hash = window.location.hash || "#/";
    const routePath = hash.replace("#", "").split("?")[0];
    
    // Parse query params (e.g. ?category=Cakes)
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const params = {};
    if (queryString) {
      const pairs = queryString.split("&");
      pairs.forEach(p => {
        const parts = p.split("=");
        params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || "");
      });
    }

    // Set parameters inside State
    if (params.category) {
      this.state.menuActiveCategory = params.category;
    }

    // Match View
    const matchedView = this.routes[routePath] || HomeView;

    // Render HTML in main mount container
    const appContent = document.getElementById("app-content");
    if (appContent) {
      appContent.innerHTML = matchedView.render(this.state);
      
      // Initialize view specific listeners/scripts
      matchedView.init(this.state);
    }

    // Scroll to top of viewport
    window.scrollTo({ top: 0, behavior: "instant" });

    // Sync Navigation menu links active status
    this.updateActiveNavLinks(routePath);
  }

  // Highlight active link in header bar
  updateActiveNavLinks(path) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.replace("#", "") === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Global listeners (cart drawer overlay, scroll triggers)
  initEventListeners() {
    // Route changes
    window.addEventListener("hashchange", () => this.handleRouting());

    // Scroll changes (header shrink)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mobile Hamburger Toggle
    const hamburger = document.getElementById('hamburger-toggle');
    const navLinks = document.getElementById('nav-links-menu');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
      });
      // Close mobile menu when nav links clicked
      navLinks.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
        }
      });
    }

    // Shopping Cart Drawer triggers
    const cartOpenBtn = document.getElementById('header-cart-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartOverlay = document.getElementById('cart-drawer-overlay');

    if (cartOpenBtn) {
      cartOpenBtn.addEventListener('click', () => this.openCartDrawer());
    }

    if (cartCloseBtn) {
      cartCloseBtn.addEventListener('click', () => this.closeCartDrawer());
    }

    if (cartOverlay) {
      cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
          this.closeCartDrawer();
        }
      });
    }

    // Cart drawer modification list clicks
    const drawerContainer = document.getElementById('cart-drawer-items');
    if (drawerContainer) {
      drawerContainer.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.cart-item-remove');
        if (removeBtn) {
          const id = removeBtn.getAttribute('data-id');
          this.removeFromCart(id);
        }
      });
    }

    // Sync initial Cart UI indicators
    this.updateCartBadge();
    this.updateCartDrawer();
    this.updateNavbarUserBadge();
  }

  // Cart Management
  addToCart(productId, qty) {
    const product = this.state.products.find(p => p.id === productId);
    if (!product) return;

    // Check inventory stock limits
    const existing = this.state.cart.find(item => item.id === productId);
    const currentQty = existing ? existing.quantity : 0;
    const requested = currentQty + qty;

    if (requested > product.stock) {
      this.showToast(`Insufficient stock available. We only have ${product.stock} units remaining.`, "warning");
      return;
    }

    if (existing) {
      existing.quantity = requested;
    } else {
      this.state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        quantity: qty
      });
    }

    this.saveCart();
    this.updateCartBadge();
    this.updateCartDrawer();
    this.showToast(`Added ${qty} x "${product.name}" to cart successfully!`, "success");
    this.openCartDrawer();
  }

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartBadge();
    this.updateCartDrawer();
    this.showToast("Item removed from your cart.", "info");
  }

  saveCart() {
    localStorage.setItem('gb_cart', JSON.stringify(this.state.cart));
  }

  openCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) overlay.classList.add('active');
  }

  closeCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  updateCartBadge() {
    const badges = document.querySelectorAll('.cart-count');
    const totalQty = this.state.cart.reduce((acc, curr) => acc + curr.quantity, 0);
    badges.forEach(b => {
      b.innerText = totalQty;
      b.style.display = totalQty > 0 ? 'flex' : 'none';
    });
  }

  updateCartDrawer() {
    const listEl = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    const checkoutBtn = document.getElementById('cart-drawer-checkout-btn');

    if (!listEl) return;

    if (this.state.cart.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color:var(--text-muted);">
          <svg style="width:48px;height:48px;fill:#c7b4a7;margin-bottom:12px;" viewBox="0 0 24 24">
            <path d="M17.21 9l-4.38-6.56c-.18-.28-.5-.44-.83-.44-.33 0-.65.16-.83.44L6.79 9H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h18.21l-1.92 6.6c-.15.52-.63.9-1.18.9H5.89c-.55 0-1.03-.38-1.18-.9L3 13H1v1c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-1.17c0-.55-.38-1.03-.9-1.18L19.21 9h-2zm-5.21-4.8L15.2 9H8.8l3.2-4.8z"/>
          </svg>
          <p style="font-size:0.9rem;">Your shopping cart is currently empty.</p>
        </div>
      `;
      if (subtotalEl) subtotalEl.innerText = "$0.00";
      if (checkoutBtn) checkoutBtn.style.display = 'none';
      return;
    }

    listEl.innerHTML = this.state.cart.map(item => `
      <div class="cart-item animate-fade-in">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
          <div class="cart-item-actions">
            <span style="font-size:0.8rem; font-weight:700; color:var(--primary-burgundy)">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="cart-item-remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    const subtotal = this.state.cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    if (checkoutBtn) checkoutBtn.style.display = 'block';
  }

  // Checkout Placement
  placeOrder(orderObj) {
    // Append order to state
    this.state.orders.push(orderObj);
    localStorage.setItem('gb_orders', JSON.stringify(this.state.orders));

    // Deduct stock levels in product database
    this.state.cart.forEach(cartItem => {
      const dbProd = this.state.products.find(p => p.id === cartItem.id);
      if (dbProd) {
        dbProd.stock = Math.max(0, dbProd.stock - cartItem.quantity);
      }
    });
    localStorage.setItem('gb_products', JSON.stringify(this.state.products));

    // Clear cart
    this.state.cart = [];
    this.saveCart();
    this.updateCartBadge();
    this.updateCartDrawer();

    // Cache latest order to trigger receipt display
    this.state.latestOrder = orderObj;

    // Reload view at checkout path
    this.handleRouting();
    
    this.showToast("Order placed successfully! Receipt generated.", "success");
  }

  // User Auth Actions
  register(name, email, password) {
    const existing = this.state.users.find(u => u.email === email);
    if (existing) {
      this.showToast("An account with this email address already exists.", "warning");
      return false;
    }

    const newUser = { name, email, password, role: "customer" };
    this.state.users.push(newUser);
    localStorage.setItem('gb_users', JSON.stringify(this.state.users));
    this.showToast("Account created successfully! Logging you in...", "success");
    return true;
  }

  login(email, password) {
    const user = this.state.users.find(u => u.email === email && u.password === password);
    if (!user) {
      this.showToast("Invalid email or password credentials.", "danger");
      return false;
    }

    this.state.currentUser = user;
    localStorage.setItem('gb_session_user', JSON.stringify(user));
    this.updateNavbarUserBadge();
    this.showToast(`Welcome back, ${user.name}!`, "success");
    return true;
  }

  // Specific method for test panel bypass clicks
  loginAsAdmin(adminObj) {
    this.state.currentUser = adminObj;
    localStorage.setItem('gb_session_user', JSON.stringify(adminObj));
    this.updateNavbarUserBadge();
    this.showToast("Bypass Access: Authenticated as Administrator", "success");
    window.location.reload();
  }

  logout() {
    this.state.currentUser = null;
    localStorage.removeItem('gb_session_user');
    this.updateNavbarUserBadge();
    this.showToast("Logged out successfully.", "info");
    
    // Redirect home
    window.location.hash = "#/";
  }

  updateNavbarUserBadge() {
    const badge = document.getElementById('nav-user-badge');
    const userLink = document.getElementById('nav-user-link');
    
    if (this.state.currentUser) {
      if (badge) {
        badge.innerHTML = `
          <svg style="width:20px;height:20px;fill:currentColor;" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
          <span style="font-size:0.75rem; font-weight:700;">${this.state.currentUser.name.split(" ")[0]}</span>
        `;
      }
      if (userLink) userLink.setAttribute('href', '#/auth');
    } else {
      if (badge) {
        badge.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        `;
      }
      if (userLink) userLink.setAttribute('href', '#/auth');
    }
  }

  // Database additions
  addReview(reviewObj) {
    this.state.reviews.unshift(reviewObj);
    localStorage.setItem('gb_reviews', JSON.stringify(this.state.reviews));
    
    // Reload view if we are on testimonials to show updates
    if (window.location.hash.split("?")[0] === "#/testimonials") {
      this.handleRouting();
    }
  }

  addInquiry(inqObj) {
    this.state.inquiries.push(inqObj);
    localStorage.setItem('gb_inquiries', JSON.stringify(this.state.inquiries));
  }

  subscribeNewsletter(email) {
    if (!this.state.subscribers.includes(email)) {
      this.state.subscribers.push(email);
      localStorage.setItem('gb_subscribers', JSON.stringify(this.state.subscribers));
    }
    this.showToast("Subscribed successfully! Thank you.", "success");
  }

  // Admin operational routines
  updateOrderStatus(orderId, newStatus) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      localStorage.setItem('gb_orders', JSON.stringify(this.state.orders));
      this.showToast(`Order status updated to "${newStatus}"`, "success");
    }
  }

  updateInquiryStatus(inqId, newStatus) {
    const inq = this.state.inquiries.find(i => i.id === inqId);
    if (inq) {
      inq.status = newStatus;
      localStorage.setItem('gb_inquiries', JSON.stringify(this.state.inquiries));
      this.showToast("Inquiry processed successfully.", "success");
    }
  }

  addProduct(newProd) {
    this.state.products.push(newProd);
    localStorage.setItem('gb_products', JSON.stringify(this.state.products));
  }

  editProduct(updatedProd) {
    const idx = this.state.products.findIndex(p => p.id === updatedProd.id);
    if (idx !== -1) {
      // Retain rating details
      updatedProd.rating = this.state.products[idx].rating;
      this.state.products[idx] = updatedProd;
      localStorage.setItem('gb_products', JSON.stringify(this.state.products));
    }
  }

  deleteProduct(productId) {
    this.state.products = this.state.products.filter(p => p.id !== productId);
    localStorage.setItem('gb_products', JSON.stringify(this.state.products));
    this.showToast("Product deleted from menu database.", "info");
  }

  // Toast Alerts system
  showToast(message, type = "success") {
    const container = document.getElementById('toast-mount-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Add simple icon based on type
    let icon = `
      <svg style="width:20px;height:20px;fill:currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    `;

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // Auto-remove after 4s
    setTimeout(() => {
      toast.style.animation = "slideInRight 0.3s ease reverse";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Instantiate on document loaded
document.addEventListener("DOMContentLoaded", () => {
  new CateringApp();
});
