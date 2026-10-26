/**
 * LuxeLoom - Master Interactive Application Logic
 * Implements high-end fashion e-commerce behaviors, local storage persistence,
 * search & filter engine, cart drawer, quick view, checkout, and luxury micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  let state = {
    cart: JSON.parse(localStorage.getItem('luxeloom_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('luxeloom_wishlist') || '[]'),
    activeCategory: 'all',
    searchQuery: '',
    maxPrice: 600,
    sortBy: 'featured',
    currentTestimonialIndex: 0,
    quickViewProduct: null,
    selectedSize: null,
    selectedColor: null,
    selectedQty: 1
  };

  // Helper to persist state
  const saveCart = () => {
    localStorage.setItem('luxeloom_cart', JSON.stringify(state.cart));
    updateCartBadges();
    renderCartDrawer();
  };

  const saveWishlist = () => {
    localStorage.setItem('luxeloom_wishlist', JSON.stringify(state.wishlist));
    updateWishlistBadges();
    renderWishlistModal();
    renderProducts();
  };

  // ==========================================
  // CUSTOM LUXURY CURSOR
  // ==========================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    // Interactive elements hover feedback
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, input, select, .category-card, .product-card');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    };
    addHoverListeners();
    // Refresh hover listeners after dynamic DOM updates
    window.refreshHoverListeners = addHoverListeners;
  }

  // ==========================================
  // HEADER SCROLL & MOBILE DRAWER
  // ==========================================
  const siteHeader = document.getElementById('siteHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavCloseBtn = document.getElementById('mobileNavCloseBtn');

  // Sticky header background transition & Active Nav Scroll Spy
  const navSections = ['hero', 'gallery', 'shop', 'about', 'services', 'reviews', 'contact'];

  const updateActiveNavLink = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    const scrollPos = window.scrollY + 140;
    let currentId = 'hero';

    for (const id of navSections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        currentId = id;
      }
    }

    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // Mobile menu open/close
  const toggleMobileNav = (open) => {
    if (open) {
      mobileNavDrawer.classList.add('open');
      mobileNavBackdrop.classList.add('open');
      hamburgerBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNavDrawer.classList.remove('open');
      mobileNavBackdrop.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.contains('open');
      toggleMobileNav(!isOpen);
    });
  }

  if (mobileNavCloseBtn) {
    mobileNavCloseBtn.addEventListener('click', () => toggleMobileNav(false));
  }
  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', () => toggleMobileNav(false));
  }

  // Close mobile drawer on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(false));
  });

  // Header quick search
  const headerSearchForm = document.getElementById('headerSearchForm');
  const headerSearchInput = document.getElementById('headerSearchInput');
  const productSearchInput = document.getElementById('productSearchInput');

  if (headerSearchForm) {
    headerSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = headerSearchInput.value.trim();
      state.searchQuery = val;
      if (productSearchInput) productSearchInput.value = val;
      
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
      renderProducts();
    });
  }

  // Navigation links in header (Shop, Men, Women)
  document.querySelectorAll('.filter-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      if (category) {
        state.activeCategory = category;
        const shopSection = document.getElementById('shop');
        if (shopSection) {
          shopSection.scrollIntoView({ behavior: 'smooth' });
        }
        renderProducts();
      }
    });
  });

  document.querySelectorAll('a[href="#shop"]:not(.filter-nav-btn)').forEach(link => {
    link.addEventListener('click', () => {
      state.activeCategory = 'all';
      renderProducts();
    });
  });

  // Shop in-page category pills (All, Men's Fashion, Women's Fashion)
  document.querySelectorAll('#shopCategoryPills .category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      state.activeCategory = pill.getAttribute('data-category');
      renderProducts();
    });
  });

  // ==========================================
  // PRODUCT FILTERING & RENDERING ENGINE
  // ==========================================
  const productGrid = document.getElementById('productGrid');
  const priceRangeSlider = document.getElementById('priceRangeSlider');
  const priceDisplay = document.getElementById('priceDisplay');
  const sortSelect = document.getElementById('sortSelect');
  const filterResetBtn = document.getElementById('filterResetBtn');
  const filterCount = document.getElementById('filterCount');

  // Price slider filter
  if (priceRangeSlider) {
    priceRangeSlider.addEventListener('input', (e) => {
      state.maxPrice = Number(e.target.value);
      if (priceDisplay) priceDisplay.textContent = `$${state.maxPrice}`;
      renderProducts();
    });
  }

  // Sort dropdown
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Search input inside filter section
  if (productSearchInput) {
    productSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  const productSearchBtn = document.getElementById('productSearchBtn');
  if (productSearchBtn) {
    productSearchBtn.addEventListener('click', () => {
      state.searchQuery = productSearchInput.value.trim();
      renderProducts();
    });
  }

  // Reset filters
  if (filterResetBtn) {
    filterResetBtn.addEventListener('click', () => {
      state.activeCategory = 'all';
      state.searchQuery = '';
      state.maxPrice = 600;
      state.sortBy = 'featured';

      if (productSearchInput) productSearchInput.value = '';
      if (headerSearchInput) headerSearchInput.value = '';
      if (priceRangeSlider) priceRangeSlider.value = 600;
      if (priceDisplay) priceDisplay.textContent = '$600';
      if (sortSelect) sortSelect.value = 'featured';

      renderProducts();
    });
  }

  // Main 3D Flip Product Card HTML Generator
  const createProductCard = (product) => {
    const isWishlisted = state.wishlist.includes(product.id);
    const primarySize = product.sizes && product.sizes.length ? product.sizes[0] : 'M';

    return `
      <article class="product-card-3d product-card reveal-on-scroll" data-id="${product.id}" data-selected-size="${primarySize}">
        <div class="product-card-flipper">
          
          <!-- FRONT SIDE -->
          <div class="product-card-face product-card-front">
            <!-- Image & Actions -->
            <div class="product-card-media ${product.id === 'll-brand-w03' ? 'circular-frame-media' : ''}">
              ${product.id === 'll-brand-w03' ? `
                <div class="circular-product-frame">
                  <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    class="circular-frame-img" 
                    loading="lazy"
                  >
                </div>
              ` : `
                <img 
                  src="${product.image}" 
                  alt="${product.name}" 
                  class="product-img" 
                  loading="lazy"
                >
              `}

              <!-- Quick Action Buttons (Wishlist) -->
              <div class="product-card-actions">
                <button 
                  class="card-action-btn ${isWishlisted ? 'active' : ''}" 
                  data-action="wishlist" 
                  data-id="${product.id}" 
                  title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                  aria-label="Wishlist toggle"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>

              <!-- 3D Flip Hint Badge -->
              <div class="card-flip-badge" data-action="flip-card" data-id="${product.id}" title="Hover or click to flip in 3D">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
                <span>3D FLIP</span>
              </div>

              <!-- Quick View Hover Bar -->
              <button class="card-quick-view-btn" data-action="quickview" data-id="${product.id}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Quick View
              </button>
            </div>

            <!-- Product Details -->
            <div class="product-card-body">
              <div class="product-meta-row">
                <span class="product-category-tag">${product.categoryLabel || (product.category === 'men' ? "Men's Fashion" : "Women's Fashion")}</span>
                <div class="product-rating" title="${product.rating} out of 5 stars">
                  <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <span>${product.rating.toFixed(1)}</span>
                  <span style="color: #9C988F; font-size: 0.7rem;">(${product.reviewCount})</span>
                </div>
              </div>

              <h3 class="product-name" title="${product.name}">${product.name}</h3>

              <div class="product-pricing-row">
                <span class="product-current-price">$${product.price}</span>
                ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice}</span>` : ''}
                ${product.discountPercent ? `<span class="product-discount-label">-${product.discountPercent}%</span>` : ''}
              </div>

              <button class="product-add-cart-btn" data-action="add-cart" data-id="${product.id}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                ADD TO WARDROBE
              </button>
            </div>
          </div>

          <!-- BACK SIDE (Revealed upon 3D Rotate/Flip) -->
          <div class="product-card-face product-card-back">
            <div class="product-back-header">
              <div class="product-back-badge-wrap">
                <span class="product-category-tag">${product.categoryLabel || "Couture"}</span>
                <span class="product-back-atelier-tag">&#10022; Atelier Specs</span>
              </div>
              <button class="card-flip-btn" data-action="flip-card" data-id="${product.id}" title="Flip to front" aria-label="Flip back">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
              </button>
            </div>

            <div class="product-back-title-wrap">
              <h4 class="product-back-title" title="${product.name}">${product.name}</h4>
              <div class="product-back-price-tag">
                <span class="product-back-price">$${product.price}</span>
                ${product.originalPrice ? `<span class="product-back-orig-price">$${product.originalPrice}</span>` : ''}
              </div>
            </div>

            <!-- Quick Summary -->
            <p class="product-back-desc">${product.description}</p>

            <!-- Fabric Material & Care Instructions -->
            <div class="product-back-specs">
              <div class="product-spec-title">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                Fabric &amp; Craftsmanship
              </div>
              <ul class="product-spec-list">
                ${(product.details && product.details.length > 0 
                  ? product.details.slice(0, 3) 
                  : ['100% Bespoke Luxury Textile', 'Hand-stitched tailoring', 'Sculpted silhouette']
                ).map(detail => `
                  <li><span class="spec-bullet">&diams;</span><span>${detail}</span></li>
                `).join('')}
              </ul>
              <div class="product-care-line">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                <span>Care: Professional Dry Clean &bull; Low Heat Steam</span>
              </div>
            </div>

            <!-- Available Sizes -->
            <div class="product-back-sizes">
              <div class="product-back-label">Available Sizes</div>
              <div class="product-size-pills">
                ${(product.sizes || ['S', 'M', 'L', 'XL']).map((sz, idx) => `
                  <button type="button" class="product-size-chip ${idx === 0 ? 'active' : ''}" data-action="select-size" data-size="${sz}">${sz}</button>
                `).join('')}
              </div>
            </div>

            <!-- Color Palette Variants -->
            <div class="product-back-colors">
              <div class="product-back-label">Color Variants</div>
              <div class="product-color-swatches">
                ${(product.colors || [{ name: 'Noir Black', hex: '#171717' }, { name: 'Gold Dune', hex: '#C6A15B' }]).map(c => `
                  <span class="product-color-dot" style="background-color: ${c.hex};" title="${c.name}" aria-label="${c.name}"></span>
                `).join('')}
              </div>
            </div>

            <!-- Back Actions -->
            <div class="product-back-actions">
              <button class="product-add-cart-btn" data-action="add-cart" data-id="${product.id}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                ADD TO WARDROBE
              </button>
              <button class="product-back-quickview-btn" data-action="quickview" data-id="${product.id}" title="Quick View Modal">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>

          </div>
        </div>
      </article>
    `;
  };

  // Render main Trending / Filtered grid
  const renderProducts = () => {
    if (!productGrid) return;

    let filtered = PRODUCTS.filter(item => {
      // Category filter
      if (state.activeCategory !== 'all' && item.category !== state.activeCategory) {
        return false;
      }
      // Price filter
      if (item.price > state.maxPrice) {
        return false;
      }
      // Search query
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc) return false;
      }
      return true;
    });

    // Sorting
    if (state.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'newest') {
      filtered.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
    } else if (state.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      // featured
      filtered.sort((a, b) => (b.isTrending === a.isTrending ? 0 : b.isTrending ? 1 : -1));
    }

    if (filterCount) {
      filterCount.textContent = `Showing ${filtered.length} style${filtered.length === 1 ? '' : 's'}`;
    }

    // Sync active category pill UI
    document.querySelectorAll('#shopCategoryPills .category-pill').forEach(pill => {
      const cat = pill.getAttribute('data-category');
      pill.classList.toggle('active', cat === state.activeCategory);
    });

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <h3 class="empty-state-title">No Couture Pieces Found</h3>
          <p class="empty-state-desc">We couldn't find any designs matching your specific filters. Try loosening your search criteria or price range.</p>
          <button class="btn btn-primary-gold" onclick="document.getElementById('filterResetBtn').click()">
            Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    productGrid.innerHTML = filtered.map(createProductCard).join('');
    setupScrollReveal();
    if (window.refreshHoverListeners) window.refreshHoverListeners();
  };



  // ==========================================
  // WISHLIST LOGIC
  // ==========================================
  const wishlistCount = document.getElementById('wishlistCount');
  const wishlistModalCount = document.getElementById('wishlistModalCount');
  const wishlistTriggerBtn = document.getElementById('wishlistTriggerBtn');
  const wishlistOverlay = document.getElementById('wishlistOverlay');
  const wishlistCloseBtn = document.getElementById('wishlistCloseBtn');
  const wishlistItemsContainer = document.getElementById('wishlistItemsContainer');

  const updateWishlistBadges = () => {
    const count = state.wishlist.length;
    if (wishlistCount) wishlistCount.textContent = count;
    if (wishlistModalCount) wishlistModalCount.textContent = count;
  };

  const toggleWishlist = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const index = state.wishlist.indexOf(productId);
    if (index > -1) {
      state.wishlist.splice(index, 1);
      showToast('Removed from Wishlist', product.name, product.image);
    } else {
      state.wishlist.push(productId);
      showToast('Saved to Wishlist', product.name, product.image);
    }
    saveWishlist();
  };

  const renderWishlistModal = () => {
    if (!wishlistItemsContainer) return;

    if (state.wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--color-text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" stroke-width="1.5" style="margin: 0 auto 12px; display: block;">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <p>Your luxury wishlist is currently empty.</p>
          <a href="#shop" class="btn btn-sm btn-primary-gold" style="margin-top: 14px;" onclick="document.getElementById('wishlistOverlay').classList.remove('open')">Discover Collection</a>
        </div>
      `;
      return;
    }

    const savedProducts = PRODUCTS.filter(p => state.wishlist.includes(p.id));
    wishlistItemsContainer.innerHTML = savedProducts.map(p => `
      <div style="display: flex; gap: 16px; align-items: center; padding: 12px; background: var(--color-bg-cream); border-radius: 6px; border: 1px solid var(--color-border);">
        <img src="${p.image}" alt="${p.name}" style="width: 60px; height: 75px; object-fit: cover; border-radius: 4px;">
        <div style="flex: 1;">
          <h4 style="font-family: var(--font-serif); font-size: 0.95rem; margin-bottom: 4px;">${p.name}</h4>
          <span style="font-weight: 700; color: var(--color-primary); font-size: 0.9rem;">$${p.price}</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-sm btn-primary-gold" data-action="wishlist-to-cart" data-id="${p.id}">
            Add to Cart
          </button>
          <button class="btn btn-sm" data-action="wishlist-remove" data-id="${p.id}" style="color: #B93838; border: 1px solid #E0D7C6;">
            &times;
          </button>
        </div>
      </div>
    `).join('');
  };

  if (wishlistTriggerBtn && wishlistOverlay) {
    wishlistTriggerBtn.addEventListener('click', () => {
      renderWishlistModal();
      wishlistOverlay.classList.add('open');
    });
  }
  if (wishlistCloseBtn && wishlistOverlay) {
    wishlistCloseBtn.addEventListener('click', () => wishlistOverlay.classList.remove('open'));
    wishlistOverlay.addEventListener('click', (e) => {
      if (e.target === wishlistOverlay) wishlistOverlay.classList.remove('open');
    });
  }

  // ==========================================
  // SHOPPING CART & SIDE DRAWER
  // ==========================================
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartDrawerBackdrop = document.getElementById('cartDrawerBackdrop');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartCount = document.getElementById('cartCount');
  const cartDrawerCount = document.getElementById('cartDrawerCount');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartSubtotalVal = document.getElementById('cartSubtotalVal');
  const cartDiscountVal = document.getElementById('cartDiscountVal');
  const discountRow = document.getElementById('discountRow');
  const cartTotalVal = document.getElementById('cartTotalVal');
  const cartPromoInput = document.getElementById('cartPromoInput');
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');

  const toggleCartDrawer = (open) => {
    if (open) {
      cartDrawer.classList.add('open');
      cartDrawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      cartDrawer.classList.remove('open');
      cartDrawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (cartTriggerBtn) {
    cartTriggerBtn.addEventListener('click', () => toggleCartDrawer(true));
  }
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', () => toggleCartDrawer(false));
  }
  if (cartDrawerBackdrop) {
    cartDrawerBackdrop.addEventListener('click', () => toggleCartDrawer(false));
  }

  const updateCartBadges = () => {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
      cartCount.textContent = totalItems;
      cartCount.classList.add('bump');
      setTimeout(() => cartCount.classList.remove('bump'), 300);
    }
    if (cartDrawerCount) cartDrawerCount.textContent = totalItems;
  };

  const addToCart = (productId, size = null, color = null, qty = 1) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');

    // Check if duplicate item exists with same size & color
    const existingIndex = state.cart.findIndex(
      item => item.id === productId && item.size === chosenSize && item.color === chosenColor
    );

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += qty;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        categoryLabel: product.categoryLabel,
        size: chosenSize,
        color: chosenColor,
        quantity: qty
      });
    }

    saveCart();
    showToast('Added to Wardrobe', `${product.name} (${chosenSize})`, product.image);
    toggleCartDrawer(true);
  };

  const updateCartQty = (index, delta) => {
    if (!state.cart[index]) return;
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
  };

  const removeCartItem = (index) => {
    if (!state.cart[index]) return;
    const item = state.cart[index];
    state.cart.splice(index, 1);
    saveCart();
    showToast('Removed from Cart', item.name, item.image);
  };

  const renderCartDrawer = () => {
    if (!cartItemsContainer) return;

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-message">
          <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h4 style="font-family: var(--font-serif); font-size: 1.1rem; margin-bottom: 6px;">Your Wardrobe is Empty</h4>
          <p style="font-size: 0.85rem; margin-bottom: 20px;">Explore our signature runway pieces and tailor your style.</p>
          <a href="#shop" class="btn btn-primary-gold btn-sm" onclick="document.getElementById('cartCloseBtn').click()">
            Explore Collections
          </a>
        </div>
      `;
      if (cartSubtotalVal) cartSubtotalVal.textContent = '$0.00';
      if (cartTotalVal) cartTotalVal.textContent = '$0.00';
      if (discountRow) discountRow.style.display = 'none';
      if (proceedCheckoutBtn) proceedCheckoutBtn.disabled = true;
      return;
    }

    if (proceedCheckoutBtn) proceedCheckoutBtn.disabled = false;

    // Render items
    cartItemsContainer.innerHTML = state.cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-variants">Size: ${item.size} &bull; ${item.color}</span>
          <span class="cart-item-price">$${item.price}</span>
          
          <div class="cart-item-bottom-row">
            <div class="cart-item-qty">
              <button class="cart-item-qty-btn" data-action="cart-qty" data-index="${index}" data-delta="-1">&minus;</button>
              <span class="cart-item-qty-val">${item.quantity}</span>
              <button class="cart-item-qty-btn" data-action="cart-qty" data-index="${index}" data-delta="1">&plus;</button>
            </div>
            <button class="cart-item-remove-btn" data-action="cart-remove" data-index="${index}">
              Remove
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Calculations
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartSubtotalVal) cartSubtotalVal.textContent = `$${total.toFixed(2)}`;
    if (cartTotalVal) cartTotalVal.textContent = `$${total.toFixed(2)}`;
  };

  // ==========================================
  // QUICK VIEW MODAL
  // ==========================================
  const quickViewOverlay = document.getElementById('quickViewOverlay');
  const quickViewContent = document.getElementById('quickViewContent');
  const quickViewCloseBtn = document.getElementById('quickViewCloseBtn');

  const openQuickView = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !quickViewContent) return;

    state.quickViewProduct = product;
    state.selectedSize = product.sizes[0] || 'Standard';
    state.selectedColor = product.colors && product.colors[0] ? product.colors[0].name : 'Default';
    state.selectedQty = 1;

    const galleryThumbs = product.gallery || [product.image];

    quickViewContent.innerHTML = `
      <!-- Gallery Column -->
      <div class="quick-view-gallery">
        <div class="quick-view-main-img-box">
          <img src="${galleryThumbs[0]}" alt="${product.name}" id="quickViewActiveImg" class="quick-view-main-img">
        </div>
        <div class="quick-view-thumbs">
          ${galleryThumbs.map((imgUrl, i) => `
            <button class="quick-view-thumb-btn ${i === 0 ? 'active' : ''}" data-img="${imgUrl}">
              <img src="${imgUrl}" alt="${product.name} thumb" class="quick-view-thumb-img">
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Product Meta Column -->
      <div class="quick-view-details">
        <span class="quick-view-category">${product.categoryLabel || (product.category === 'men' ? "Men's Fashion" : "Women's Fashion")}</span>
        <h2 class="quick-view-title">${product.name}</h2>
        
        <div class="quick-view-price-wrap">
          <span class="quick-view-price">$${product.price}</span>
          <div class="product-rating" style="margin-left: auto;">
            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>${product.rating.toFixed(1)} (${product.reviewCount} reviews)</span>
          </div>
        </div>

        <p class="quick-view-desc">${product.description}</p>

        <!-- Size Selector -->
        <div>
          <div class="option-label">Select Tailored Size: <strong id="selectedSizeLabel" style="color: var(--color-gold-dark);">${state.selectedSize}</strong></div>
          <div class="size-selector-row">
            ${product.sizes.map((s, idx) => `
              <button class="size-btn ${idx === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
            `).join('')}
          </div>
        </div>

        <!-- Color Swatches -->
        <div>
          <div class="option-label">Atelier Palette: <strong id="selectedColorLabel" style="color: var(--color-gold-dark);">${state.selectedColor}</strong></div>
          <div class="color-swatch-row">
            ${product.colors.map((c, idx) => `
              <button class="color-swatch-btn ${idx === 0 ? 'active' : ''}" style="background-color: ${c.hex};" data-color="${c.name}" title="${c.name}"></button>
            `).join('')}
          </div>
        </div>

        <!-- Quantity & Add Button -->
        <div class="quick-view-actions">
          <div class="qty-control">
            <button class="qty-btn" id="modalQtyMinus">&minus;</button>
            <input type="text" class="qty-input" id="modalQtyInput" value="1" readonly>
            <button class="qty-btn" id="modalQtyPlus">&plus;</button>
          </div>
          <button class="btn btn-primary-gold" id="modalAddToCartBtn" style="flex: 1;">
            Add to Wardrobe &bull; $${product.price}
          </button>
        </div>

        <!-- Highlights list -->
        <div style="margin-top: 20px; font-size: 0.78rem; color: var(--color-text-muted); display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${(product.details || ['Pure natural textiles', 'Master atelier tailoring', 'Bespoke finishing', 'Gift packaged']).map(d => `
            <div>&bull; ${d}</div>
          `).join('')}
        </div>
      </div>
    `;

    // Gallery switchers
    const thumbBtns = quickViewContent.querySelectorAll('.quick-view-thumb-btn');
    const activeImg = document.getElementById('quickViewActiveImg');
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        thumbBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeImg.src = btn.getAttribute('data-img');
      });
    });

    // Size selection
    const sizeBtns = quickViewContent.querySelectorAll('.size-btn');
    const sizeLabel = document.getElementById('selectedSizeLabel');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedSize = btn.getAttribute('data-size');
        if (sizeLabel) sizeLabel.textContent = state.selectedSize;
      });
    });

    // Color swatch selection
    const colorBtns = quickViewContent.querySelectorAll('.color-swatch-btn');
    const colorLabel = document.getElementById('selectedColorLabel');
    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedColor = btn.getAttribute('data-color');
        if (colorLabel) colorLabel.textContent = state.selectedColor;
      });
    });

    // Quantity buttons
    const qtyInput = document.getElementById('modalQtyInput');
    const qtyMinus = document.getElementById('modalQtyMinus');
    const qtyPlus = document.getElementById('modalQtyPlus');
    const modalAddBtn = document.getElementById('modalAddToCartBtn');

    if (qtyMinus && qtyPlus && qtyInput) {
      qtyMinus.addEventListener('click', () => {
        if (state.selectedQty > 1) {
          state.selectedQty--;
          qtyInput.value = state.selectedQty;
          modalAddBtn.textContent = `Add to Wardrobe • $${product.price * state.selectedQty}`;
        }
      });
      qtyPlus.addEventListener('click', () => {
        state.selectedQty++;
        qtyInput.value = state.selectedQty;
        modalAddBtn.textContent = `Add to Wardrobe • $${product.price * state.selectedQty}`;
      });
    }

    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', () => {
        addToCart(product.id, state.selectedSize, state.selectedColor, state.selectedQty);
        quickViewOverlay.classList.remove('open');
      });
    }

    quickViewOverlay.classList.add('open');
    if (window.refreshHoverListeners) window.refreshHoverListeners();
  };

  if (quickViewCloseBtn && quickViewOverlay) {
    quickViewCloseBtn.addEventListener('click', () => quickViewOverlay.classList.remove('open'));
    quickViewOverlay.addEventListener('click', (e) => {
      if (e.target === quickViewOverlay) quickViewOverlay.classList.remove('open');
    });
  }

  // ==========================================
  // CHECKOUT DEMO WORKFLOW
  // ==========================================
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutFormStep = document.getElementById('checkoutFormStep');
  const checkoutSuccessStep = document.getElementById('checkoutSuccessStep');
  const checkoutSummaryItems = document.getElementById('checkoutSummaryItems');
  const checkoutSubtotalVal = document.getElementById('checkoutSubtotalVal');
  const checkoutDiscountVal = document.getElementById('checkoutDiscountVal');
  const checkoutDiscountRow = document.getElementById('checkoutDiscountRow');
  const checkoutTotalVal = document.getElementById('checkoutTotalVal');
  const confirmedOrderId = document.getElementById('confirmedOrderId');
  const continueShoppingBtn = document.getElementById('continueShoppingBtn');

  if (proceedCheckoutBtn) {
    proceedCheckoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) return;
      toggleCartDrawer(false);
      openCheckoutModal();
    });
  }

  const openCheckoutModal = () => {
    if (!checkoutOverlay || !checkoutSummaryItems) return;

    checkoutFormStep.style.display = 'block';
    checkoutSuccessStep.style.display = 'none';

    // Summary items
    checkoutSummaryItems.innerHTML = state.cart.map(item => `
      <div style="display: flex; justify-content: space-between;">
        <span>${item.name} (${item.size}) &times; ${item.quantity}</span>
        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
      </div>
    `).join('');

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = subtotal * state.discountRate;
    const total = Math.max(0, subtotal - discount);

    if (checkoutSubtotalVal) checkoutSubtotalVal.textContent = `$${subtotal.toFixed(2)}`;
    if (state.discountRate > 0) {
      if (checkoutDiscountRow) checkoutDiscountRow.style.display = 'flex';
      if (checkoutDiscountVal) checkoutDiscountVal.textContent = `-$${discount.toFixed(2)}`;
    } else {
      if (checkoutDiscountRow) checkoutDiscountRow.style.display = 'none';
    }
    if (checkoutTotalVal) checkoutTotalVal.textContent = `$${total.toFixed(2)}`;

    checkoutOverlay.classList.add('open');
  };

  // Payment option toggle
  document.querySelectorAll('.payment-option-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-option-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('checkoutFirstName').value.trim();
      const lastName = document.getElementById('checkoutLastName').value.trim();
      const email = document.getElementById('checkoutEmail').value.trim();
      const address = document.getElementById('checkoutAddress').value.trim();

      if (!firstName || !lastName || !email || !address) {
        showToast('Required Fields', 'Please complete your delivery details.', null);
        return;
      }

      // Generate realistic LuxeLoom order ID
      const orderRef = 'LX-' + Math.floor(100000 + Math.random() * 900000);
      if (confirmedOrderId) confirmedOrderId.textContent = orderRef;

      // Clear cart
      state.cart = [];
      saveCart();

      checkoutFormStep.style.display = 'none';
      checkoutSuccessStep.style.display = 'block';

      showToast('Order Placed Successfully', `Reference: ${orderRef}`, null);
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      checkoutOverlay.classList.remove('open');
      const shopSection = document.getElementById('shop');
      if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (checkoutCloseBtn && checkoutOverlay) {
    checkoutCloseBtn.addEventListener('click', () => checkoutOverlay.classList.remove('open'));
    checkoutOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutOverlay) checkoutOverlay.classList.remove('open');
    });
  }

  // User Account Modal
  const accountTriggerBtn = document.getElementById('accountTriggerBtn');
  const accountOverlay = document.getElementById('accountOverlay');
  const accountCloseBtn = document.getElementById('accountCloseBtn');

  if (accountTriggerBtn && accountOverlay) {
    accountTriggerBtn.addEventListener('click', () => accountOverlay.classList.add('open'));
  }
  if (accountCloseBtn && accountOverlay) {
    accountCloseBtn.addEventListener('click', () => accountOverlay.classList.remove('open'));
    accountOverlay.addEventListener('click', (e) => {
      if (e.target === accountOverlay) accountOverlay.classList.remove('open');
    });
  }

  // ==========================================
  // GLOBAL EVENT DELEGATION (Clicks on Grids)
  // ==========================================
  document.addEventListener('click', (e) => {
    // 3D Flip Card Toggle (Mobile tap or flip buttons)
    const flipBtn = e.target.closest('[data-action="flip-card"]');
    if (flipBtn) {
      e.preventDefault();
      e.stopPropagation();
      const card = flipBtn.closest('.product-card-3d');
      if (card) {
        card.classList.toggle('is-flipped');
      }
      return;
    }

    // Size Chip Selection on Card Back
    const sizeChip = e.target.closest('[data-action="select-size"]');
    if (sizeChip) {
      e.preventDefault();
      e.stopPropagation();
      const card = sizeChip.closest('.product-card-3d');
      if (card) {
        card.querySelectorAll('[data-action="select-size"]').forEach(chip => chip.classList.remove('active'));
        sizeChip.classList.add('active');
        const chosenSize = sizeChip.getAttribute('data-size');
        card.setAttribute('data-selected-size', chosenSize);
      }
      return;
    }

    // Add to Cart from card button (Front or Back)
    const addCartBtn = e.target.closest('[data-action="add-cart"]');
    if (addCartBtn) {
      const pid = addCartBtn.getAttribute('data-id');
      const card = addCartBtn.closest('.product-card-3d') || addCartBtn.closest('.product-card');
      const chosenSize = card ? card.getAttribute('data-selected-size') : null;
      addToCart(pid, chosenSize);
      addCartBtn.classList.add('added');
      addCartBtn.textContent = 'Added ✓';
      setTimeout(() => {
        addCartBtn.classList.remove('added');
        addCartBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          ADD TO WARDROBE
        `;
      }, 1500);
      return;
    }

    // Wishlist Toggle
    const wishlistBtn = e.target.closest('[data-action="wishlist"]');
    if (wishlistBtn) {
      const pid = wishlistBtn.getAttribute('data-id');
      toggleWishlist(pid);
      return;
    }

    // Quick View Trigger
    const quickViewBtn = e.target.closest('[data-action="quickview"]');
    if (quickViewBtn) {
      const pid = quickViewBtn.getAttribute('data-id');
      openQuickView(pid);
      return;
    }

    // Cart Drawer Quantity Buttons
    const cartQtyBtn = e.target.closest('[data-action="cart-qty"]');
    if (cartQtyBtn) {
      const idx = Number(cartQtyBtn.getAttribute('data-index'));
      const delta = Number(cartQtyBtn.getAttribute('data-delta'));
      updateCartQty(idx, delta);
      return;
    }

    // Cart Drawer Remove Button
    const cartRemoveBtn = e.target.closest('[data-action="cart-remove"]');
    if (cartRemoveBtn) {
      const idx = Number(cartRemoveBtn.getAttribute('data-index'));
      removeCartItem(idx);
      return;
    }

    // Wishlist Modal to Cart
    const wishToCartBtn = e.target.closest('[data-action="wishlist-to-cart"]');
    if (wishToCartBtn) {
      const pid = wishToCartBtn.getAttribute('data-id');
      addToCart(pid);
      toggleWishlist(pid); // Remove from wishlist once added
      return;
    }

    // Wishlist Modal Remove
    const wishRemoveBtn = e.target.closest('[data-action="wishlist-remove"]');
    if (wishRemoveBtn) {
      const pid = wishRemoveBtn.getAttribute('data-id');
      toggleWishlist(pid);
      return;
    }
  });

  // ==========================================
  // CUSTOMER REVIEWS (CAROUSEL)
  // ==========================================
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialDots = document.getElementById('testimonialDots');
  const prevTestimonialBtn = document.getElementById('prevTestimonialBtn');
  const nextTestimonialBtn = document.getElementById('nextTestimonialBtn');

  const renderTestimonials = () => {
    if (!testimonialTrack || !TESTIMONIALS) return;

    testimonialTrack.innerHTML = TESTIMONIALS.map((item, index) => `
      <div class="testimonial-card ${index === state.currentTestimonialIndex ? 'active' : ''}">
        <svg class="testimonial-quote-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>

        <div class="testimonial-stars">
          ${Array(item.rating).fill('★').join('')}
        </div>

        <p class="testimonial-text">"${item.review}"</p>

        <div class="testimonial-author-block">
          <img src="${item.avatar}" alt="${item.name}" class="testimonial-avatar">
          <div>
            <h4 class="testimonial-name">${item.name}</h4>
            <span class="testimonial-role">${item.role}</span>
          </div>
        </div>
      </div>
    `).join('');

    if (testimonialDots) {
      testimonialDots.innerHTML = TESTIMONIALS.map((_, index) => `
        <span class="carousel-dot ${index === state.currentTestimonialIndex ? 'active' : ''}" data-index="${index}"></span>
      `).join('');

      testimonialDots.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          state.currentTestimonialIndex = Number(dot.getAttribute('data-index'));
          renderTestimonials();
        });
      });
    }
  };

  const nextTestimonial = () => {
    state.currentTestimonialIndex = (state.currentTestimonialIndex + 1) % TESTIMONIALS.length;
    renderTestimonials();
  };

  const prevTestimonial = () => {
    state.currentTestimonialIndex = (state.currentTestimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    renderTestimonials();
  };

  if (nextTestimonialBtn) nextTestimonialBtn.addEventListener('click', nextTestimonial);
  if (prevTestimonialBtn) prevTestimonialBtn.addEventListener('click', prevTestimonial);

  // Gentle autoplay
  setInterval(() => {
    const isReviewsVisible = document.getElementById('reviews')?.getBoundingClientRect().top < window.innerHeight;
    if (isReviewsVisible) {
      nextTestimonial();
    }
  }, 7000);



  // ==========================================
  // NEWSLETTER SUBSCRIPTION
  // ==========================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  if (newsletterForm && newsletterEmail && newsletterFeedback) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        newsletterFeedback.className = 'newsletter-feedback error';
        newsletterFeedback.textContent = 'Please enter a valid luxury patron email address.';
        return;
      }

      newsletterFeedback.className = 'newsletter-feedback success';
      newsletterFeedback.textContent = 'Thank you for subscribing. Private voucher SALON15 has been sent to your email.';
      newsletterEmail.value = '';
      showToast('Welcome to LuxeLoom Salon', 'Enjoy 15% off with voucher code SALON15', null);
    });
  }

  // ==========================================
  // CUSTOMER SUPPORT & LEGAL MODALS
  // ==========================================
  const infoModalOverlay = document.getElementById('infoModalOverlay');
  const infoModalTitle = document.getElementById('infoModalTitle');
  const infoModalBody = document.getElementById('infoModalBody');
  const infoModalCloseBtn = document.getElementById('infoModalCloseBtn');

  const INFO_CONTENT = {
    faq: {
      title: 'Frequently Asked Questions',
      body: `
        <h4 style="color: var(--color-primary); margin-top: 10px;">How is LuxeLoom apparel crafted?</h4>
        <p>Every piece is sourced directly from sustainable European spinning mills and woven by master artisans in Florence and Milan.</p>
        <h4 style="color: var(--color-primary); margin-top: 14px;">Do you offer bespoke tailoring?</h4>
        <p>Yes. VIP patrons can contact concierge@luxeloom.com to request custom sizing adjustments and private atelier appointments.</p>
      `
    },
    shipping: {
      title: 'Complimentary White-Glove Delivery',
      body: `
        <p>All orders exceeding $250 receive complimentary insured global priority courier transit (2-4 business days). Each garment is cocooned in bespoke acid-free tissue paper and delivered in signature gold-embossed presentation boxes.</p>
      `
    },
    track: {
      title: 'Track Your Atelier Shipment',
      body: `
        <p>Enter your bespoke order reference code to track your complimentary insured express shipment in real time.</p>
        <div style="margin: 18px 0; display: flex; gap: 8px;">
          <input type="text" placeholder="e.g. LUX-89421" style="flex: 1; padding: 11px 14px; border: 1px solid rgba(198,161,91,0.4); border-radius: 4px; background: rgba(0,0,0,0.03); font-size: 0.9rem;" id="trackOrderInput" value="LUX-94821">
          <button class="btn btn-primary-gold btn-sm" onclick="alert('Order LUX-94821: Dispatched via Global Priority White-Glove Courier. On schedule for arrival.')">Track</button>
        </div>
        <p style="font-size: 0.85rem; color: #737373;">For bespoke couture commissions, your personal VIP Concierge provides continuous milestone updates directly via concierge@luxeloom.com.</p>
      `
    },
    returns: {
      title: 'Refund & Return Policy',
      body: `
        <h4 style="color: var(--color-primary); margin-top: 6px;">Complimentary 30-Day Returns</h4>
        <p>We are delighted to offer complimentary doorstep courier pickup for all returns and exchanges initiated within 30 days of delivery. Items must remain unworn and in original condition with intact security tags.</p>
        <h4 style="color: var(--color-primary); margin-top: 14px;">Swift Concierge Refunds</h4>
        <p>Following gentle inspection at our Milan atelier, full refunds are processed to your original payment method (Visa, Mastercard, or PayPal) within 3 to 5 business days.</p>
      `
    },
    privacy: {
      title: 'Privacy & Discretion Protocol',
      body: `
        <p>At LuxeLoom, patron privacy is paramount. We do not sell or monetize personal browsing or order data. All transactions are safeguarded under end-to-end 256-bit encryption.</p>
      `
    },
    terms: {
      title: 'Terms of Haute Couture Service',
      body: `
        <p>By engaging with LuxeLoom, patrons agree to our standard terms of luxury garment sale, warranty guarantees against manufacturing defects, and respectful client service policies.</p>
      `
    },
    care: {
      title: 'Artisanal Garment Care Guide',
      body: `
        <p>Pure Mulberry silk garments should be professionally dry cleaned or hand-washed in cold water using delicate PH-neutral silk shampoo. Cashmere should be stored flat with cedar balls to preserve loft.</p>
      `
    },
    cookies: {
      title: 'Patron Experience Preferences',
      body: `
        <p>We use essential cookies to retain your saved wishlist items, active cart selections, and VIP aesthetic preferences.</p>
      `
    }
  };

  document.querySelectorAll('.modal-info-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const key = link.getAttribute('data-info');
      if (INFO_CONTENT[key] && infoModalOverlay) {
        infoModalTitle.textContent = INFO_CONTENT[key].title;
        infoModalBody.innerHTML = INFO_CONTENT[key].body;
        infoModalOverlay.classList.add('open');
      }
    });
  });

  if (infoModalCloseBtn && infoModalOverlay) {
    infoModalCloseBtn.addEventListener('click', () => infoModalOverlay.classList.remove('open'));
    infoModalOverlay.addEventListener('click', (e) => {
      if (e.target === infoModalOverlay) infoModalOverlay.classList.remove('open');
    });
  }

  // ==========================================
  // TOAST NOTIFICATION SYSTEM
  // ==========================================
  const toastContainer = document.getElementById('toastContainer');

  function showToast(title, message, imageUrl = null) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="toast-img">` : ''}
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ==========================================
  // SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================
  function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  // ==========================================
  // LUXELOOM FASHION GALLERY & LIGHTBOX
  // ==========================================
  const fashionGalleryGrid = document.getElementById('fashionGalleryGrid');
  const galleryFilterBar = document.getElementById('galleryFilterBar');
  const galleryLightbox = document.getElementById('galleryLightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCatBadge = document.getElementById('lightboxCatBadge');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxShopBtn = document.getElementById('lightboxShopBtn');

  let activeGalleryCategory = 'all';
  let activeGalleryList = typeof GALLERY_ITEMS !== 'undefined' ? [...GALLERY_ITEMS] : [];
  let currentLightboxIndex = 0;

  function renderFashionGallery(category = 'all') {
    if (!fashionGalleryGrid) return;

    activeGalleryCategory = category;
    const items = typeof GALLERY_ITEMS !== 'undefined' ? GALLERY_ITEMS : [];
    
    if (category === 'all') {
      activeGalleryList = items;
    } else {
      activeGalleryList = items.filter(item => item.category === category);
    }

    if (activeGalleryList.length === 0) {
      fashionGalleryGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <p style="font-size: 1.1rem; color: var(--color-text-muted);">No lookbook styles found for this category.</p>
        </div>
      `;
      return;
    }

    fashionGalleryGrid.innerHTML = activeGalleryList.map((item, index) => `
      <div 
        class="fashion-gallery-card" 
        data-id="${item.id}" 
        data-index="${index}" 
        role="button" 
        tabindex="0"
        aria-label="View ${item.title} in Lightbox"
      >
        <div class="gallery-card-media-wrap">
          <img 
            src="${item.image}" 
            alt="${item.title}" 
            class="gallery-card-img" 
            loading="lazy"
          >
        </div>
      </div>
    `).join('');

    // Attach click listeners to cards
    const cards = fashionGalleryGrid.querySelectorAll('.fashion-gallery-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        openGalleryLightbox(idx);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(card.getAttribute('data-index'), 10);
          openGalleryLightbox(idx);
        }
      });
    });
  }

  // Filter Buttons
  if (galleryFilterBar) {
    const filterBtns = galleryFilterBar.querySelectorAll('.gallery-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const filterVal = btn.getAttribute('data-filter');
        renderFashionGallery(filterVal);
      });
    });
  }

  // Lightbox Open & Update
  function openGalleryLightbox(index) {
    if (!activeGalleryList || activeGalleryList.length === 0 || !galleryLightbox) return;
    currentLightboxIndex = (index >= 0 && index < activeGalleryList.length) ? index : 0;
    updateLightboxContent();
    galleryLightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryLightbox() {
    if (!galleryLightbox) return;
    galleryLightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = activeGalleryList[currentLightboxIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      lightboxImg.style.transform = 'scale(0.96)';
      setTimeout(() => {
        lightboxImg.src = item.image;
        lightboxImg.alt = item.title;
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      }, 150);
    }

    if (lightboxCatBadge) lightboxCatBadge.textContent = item.categoryLabel || item.category.toUpperCase();
    if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} of ${activeGalleryList.length}`;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDesc) lightboxDesc.textContent = item.desc;
  }

  function prevLightboxItem() {
    if (!activeGalleryList || activeGalleryList.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
    updateLightboxContent();
  }

  function nextLightboxItem() {
    if (!activeGalleryList || activeGalleryList.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryList.length;
    updateLightboxContent();
  }

  // Lightbox Listeners
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeGalleryLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeGalleryLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightboxItem);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightboxItem);
  if (lightboxShopBtn) {
    lightboxShopBtn.addEventListener('click', () => {
      closeGalleryLightbox();
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (galleryLightbox && galleryLightbox.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeGalleryLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxItem();
      } else if (e.key === 'ArrowRight') {
        nextLightboxItem();
      }
    }
  });

  // ==========================================
  // FOOTER NEWSLETTER SUBSCRIPTION
  // ==========================================
  const footerNewsletterForm = document.getElementById('footerNewsletterForm');
  const footerNewsletterEmail = document.getElementById('footerNewsletterEmail');
  const footerNewsletterFeedback = document.getElementById('footerNewsletterFeedback');

  if (footerNewsletterForm && footerNewsletterEmail) {
    footerNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = footerNewsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        if (footerNewsletterFeedback) {
          footerNewsletterFeedback.className = 'footer-newsletter-feedback error';
          footerNewsletterFeedback.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      if (footerNewsletterFeedback) {
        footerNewsletterFeedback.className = 'footer-newsletter-feedback success';
        footerNewsletterFeedback.textContent = 'Thank you for subscribing! Welcome to LuxeLoom exclusive updates.';
      }
      footerNewsletterEmail.value = '';
      showToast('Exclusive Updates', 'Welcome to the LuxeLoom Private Atelier Circle.');

      setTimeout(() => {
        if (footerNewsletterFeedback) {
          footerNewsletterFeedback.textContent = '';
        }
      }, 6000);
    });
  }

  // FOOTER CURRENCY SELECTOR
  const footerCurrencySelect = document.getElementById('footerCurrencySelect');
  if (footerCurrencySelect) {
    footerCurrencySelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      const currencyNames = {
        USD: 'USD ($) • United States',
        INR: 'INR (₹) • India',
        EUR: 'EUR (€) • European Union',
        GBP: 'GBP (£) • United Kingdom',
        AED: 'AED (د.إ) • UAE'
      };
      showToast('Currency & Region Set', `Viewing catalog in ${currencyNames[selected] || selected}.`, null);
    });
  }

  // Mobile touch interaction for social hover tooltip dock
  const socialDockItems = document.querySelectorAll('.social-dock-item');
  if (socialDockItems.length) {
    socialDockItems.forEach(item => {
      item.addEventListener('touchstart', () => {
        socialDockItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
        item.classList.toggle('active');
      }, { passive: true });
    });

    document.addEventListener('touchstart', (e) => {
      if (!e.target.closest('.social-dock-item')) {
        socialDockItems.forEach(i => i.classList.remove('active'));
      }
    }, { passive: true });
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  updateCartBadges();
  updateWishlistBadges();
  renderProducts();
  renderFashionGallery();
  renderCartDrawer();
  renderTestimonials();
  setupScrollReveal();

});
