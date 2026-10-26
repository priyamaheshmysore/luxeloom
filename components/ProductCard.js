/**
 * LuxeLoom E-Commerce - 3D Flip Product Card Component
 * 
 * Clean, modular component structured for VS Code Copilot generation and reuse.
 * Provides both Tailwind CSS implementation and Vanilla CSS implementation.
 * 
 * Features:
 * - Front Side: Dark-themed image gallery media, wishlist trigger (top-right),
 *   quick-view hover bar, category, title, pricing (current/original/discount),
 *   rating stars, and "ADD TO WARDROBE" CTA.
 * - Back Side: 3D flip rotation (180deg) on hover revealing fabric & material care,
 *   available size selectors, color palette swatches, quick summary, and instant wardrobe CTA.
 * - 3D Animation: CSS perspective, transform-style: preserve-3d, and backface-visibility: hidden.
 */

/**
 * @typedef {Object} ColorVariant
 * @property {string} name - Color name (e.g., 'Camel Tan')
 * @property {string} hex - Color hex code (e.g., '#b58d57')
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Unique product identifier
 * @property {string} name - Product display name
 * @property {string} category - Category slug ('men' | 'women' | 'couture')
 * @property {string} categoryLabel - Display category label
 * @property {number} price - Current retail price
 * @property {number} [originalPrice] - Previous price before markdown
 * @property {number} [discountPercent] - Discount percentage (e.g., 15)
 * @property {number} rating - Customer review score (0.0 - 5.0)
 * @property {number} reviewCount - Number of customer reviews
 * @property {string} image - Main high-resolution editorial image URL
 * @property {string[]} [gallery] - Additional gallery image URLs
 * @property {string} description - Editorial product description
 * @property {string[]} [sizes] - Available garment sizes
 * @property {ColorVariant[]} [colors] - Available color swatches
 * @property {string[]} [details] - Textile & craftsmanship specifications
 */

// ============================================================================
// 1. TAILWIND CSS COMPONENT (Preferred for Modern Utility-First Stacks)
// ============================================================================

/**
 * Generates an interactive 3D Flip Product Card using Tailwind CSS classes.
 * Uses Tailwind arbitrary values for 3D transforms ([perspective:1200px], [transform-style:preserve-3d], etc.)
 * 
 * @param {Product} product - Product data object
 * @param {boolean} [isWishlisted=false] - Whether product is currently in wishlist
 * @returns {string} HTML string of the product card
 */
export function create3DProductCardTailwind(product, isWishlisted = false) {
  const primarySize = product.sizes && product.sizes.length ? product.sizes[0] : 'M';
  const discountBadge = product.discountPercent
    ? `<span class="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">-${product.discountPercent}%</span>`
    : '';

  return `
    <article 
      class="group [perspective:1200px] relative w-full min-h-[365px] rounded-xl bg-transparent select-none"
      data-id="${product.id}"
      data-selected-size="${primarySize}"
    >
      <!-- 3D Flipper Container -->
      <div class="relative w-full h-full flex flex-col [transform-style:preserve-3d] transition-transform duration-600 ease-[cubic-bezier(0.34,1.25,0.64,1)] group-hover:[transform:rotateY(180deg)] group-[.is-flipped]:[transform:rotateY(180deg)]">
        
        <!-- ================= FRONT SIDE ================= -->
        <div class="relative w-full h-full flex flex-col bg-[#171717] border border-[#C6A15B]/25 rounded-xl overflow-hidden shadow-2xl [backface-visibility:hidden] [transform:rotateY(0deg)] z-10 transition-colors duration-300 group-hover:border-[#C6A15B]/50">
          
          <!-- Image & Actions (Constrained Height: h-48 / 192px) -->
          <div class="relative w-full h-48 max-h-[192px] overflow-hidden bg-[#111111]">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="w-full h-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            <!-- Top-Right Wishlist Trigger Icon -->
            <div class="absolute top-2 right-2 z-20">
              <button 
                class="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                  isWishlisted 
                    ? 'bg-red-600 text-white' 
                    : 'bg-black/60 backdrop-blur-md border border-[#C6A15B]/40 text-[#DFBF7A] hover:bg-[#C6A15B] hover:text-[#171717]'
                }"
                data-action="wishlist"
                data-id="${product.id}"
                title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                aria-label="Wishlist toggle"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>

            <!-- Top-Left 3D Flip Hint Badge -->
            <div class="absolute top-2 left-2 z-20 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-[#C6A15B]/40 text-[#DFBF7A] text-[9px] font-bold tracking-wider uppercase pointer-events-none group-hover:bg-[#C6A15B] group-hover:text-black transition-colors duration-300">
              <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
              <span>3D Flip</span>
            </div>

            <!-- Quick View Overlay Bar (Reveals on Hover) -->
            <button 
              class="absolute bottom-0 left-0 w-full py-1.5 bg-black/85 backdrop-blur-sm border-t border-[#C6A15B]/30 text-white hover:text-black hover:bg-[#DFBF7A] text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10"
              data-action="quickview" 
              data-id="${product.id}"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Quick View
            </button>
          </div>

          <!-- Product Details Body: Pure White Background (#FFFFFF) & Compact Spacing (py-2.5) -->
          <div class="px-3.5 py-2.5 flex flex-col flex-1 bg-white text-neutral-900 border-t border-[#C6A15B]/20">
            <!-- Category & Rating Row (Tight mb-0.5) -->
            <div class="flex items-center justify-between mb-0.5">
              <span class="text-[10px] uppercase tracking-wider font-bold text-[#9E7B34]">
                ${product.categoryLabel || "Couture"}
              </span>
              <div class="flex items-center gap-1 text-[10px] font-semibold text-[#7D6124]">
                <svg class="w-2.5 h-2.5 fill-[#C6A15B]" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>${product.rating.toFixed(1)}</span>
                <span class="text-neutral-500 font-normal">(${product.reviewCount})</span>
              </div>
            </div>

            <!-- Product Title (Tight mb-1) -->
            <h3 class="text-xs font-bold text-[#141414] tracking-wide truncate mb-1 group-hover:text-[#9E7B34] transition-colors" title="${product.name}">
              ${product.name}
            </h3>

            <!-- Price Details Row (Tight mb-2 mt-0.5) -->
            <div class="flex items-baseline gap-1.5 mb-2 mt-0.5">
              <span class="text-sm font-extrabold text-[#111111]">$${product.price}</span>
              ${product.originalPrice ? `<span class="text-[11px] text-neutral-500 line-through">$${product.originalPrice}</span>` : ''}
              ${discountBadge}
            </div>

            <!-- Add to Wardrobe Button (Compact py-1.5 px-3) -->
            <button 
              class="w-full py-1.5 px-3 rounded-md bg-gradient-to-r from-[#C6A15B] to-[#A8843E] hover:from-[#DFBF7A] hover:to-[#C6A15B] text-neutral-950 font-bold text-[10px] tracking-wider uppercase flex items-center justify-center gap-1 shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98] border border-[#B38F46]/35"
              data-action="add-cart"
              data-id="${product.id}"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              ADD TO WARDROBE
            </button>
          </div>
        </div>

        <!-- ================= BACK SIDE (Revealed upon 3D Rotate) ================= -->
        <div class="absolute inset-0 w-full h-full flex flex-col justify-between p-3 bg-gradient-to-b from-[#1C1C1C] via-[#161616] to-[#111111] border border-[#C6A15B]/40 rounded-xl overflow-hidden shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] text-neutral-200 z-0">
          
          <!-- Back Header -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-1.5">
                <span class="text-[9px] uppercase tracking-wider font-bold text-[#C6A15B]">
                  ${product.categoryLabel || "Couture"}
                </span>
                <span class="text-[8px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-[#C6A15B]/15 border border-[#C6A15B]/30 text-[#DFBF7A]">
                  &#10022; Atelier Specs
                </span>
              </div>
              <button 
                class="w-5 h-5 rounded-full bg-white/5 border border-[#C6A15B]/30 text-[#DFBF7A] hover:bg-[#C6A15B] hover:text-black flex items-center justify-center transition-transform hover:-rotate-180" 
                data-action="flip-card" 
                data-id="${product.id}" 
                title="Flip to front"
              >
                <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
              </button>
            </div>

            <!-- Title & Price Summary -->
            <div class="flex items-baseline justify-between gap-1 mb-1">
              <h4 class="text-xs font-serif font-bold text-white truncate" title="${product.name}">
                ${product.name}
              </h4>
              <span class="text-xs font-extrabold text-[#DFBF7A] whitespace-nowrap">$${product.price}</span>
            </div>

            <!-- Quick Summary Description -->
            <p class="text-[11px] italic text-neutral-400 line-clamp-1 leading-normal mb-1.5">
              ${product.description}
            </p>

            <!-- Fabric Material & Care Instructions -->
            <div class="p-2 rounded-md bg-white/[0.03] border border-[#C6A15B]/20 mb-1.5">
              <div class="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#C6A15B] mb-1">
                <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                <span>Fabric &amp; Craftsmanship</span>
              </div>
              <ul class="text-[10px] text-neutral-300 space-y-0.5">
                ${(product.details && product.details.length > 0 
                  ? product.details.slice(0, 2) 
                  : ['100% Certified Luxury Textile', 'Master atelier tailored finish']
                ).map(detail => `
                  <li class="flex items-center gap-1">
                    <span class="text-[#C6A15B] text-[7px]">&diams;</span>
                    <span class="truncate">${detail}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Available Sizes Selection -->
            <div class="mb-1.5">
              <span class="block text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">Available Sizes</span>
              <div class="flex flex-wrap gap-1">
                ${(product.sizes || ['S', 'M', 'L', 'XL']).map((size, idx) => `
                  <button 
                    type="button" 
                    class="px-1.5 py-0.5 rounded text-[10px] font-semibold border transition-all ${
                      idx === 0 
                        ? 'bg-[#C6A15B] text-black border-[#C6A15B] font-bold' 
                        : 'bg-white/5 border-[#C6A15B]/30 text-neutral-300 hover:border-[#DFBF7A] hover:text-white'
                    }"
                    data-action="select-size" 
                    data-size="${size}"
                  >
                    ${size}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Color Variants Swatches -->
            <div class="mb-1">
              <span class="block text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">Color Palette</span>
              <div class="flex items-center gap-1.5">
                ${(product.colors || [{ name: 'Noir', hex: '#171717' }, { name: 'Gold Dune', hex: '#C6A15B' }]).map(c => `
                  <span 
                    class="w-3 h-3 rounded-full border border-white/40 hover:scale-125 transition-transform cursor-pointer" 
                    style="background-color: ${c.hex};" 
                    title="${c.name}"
                  ></span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Back Actions Row -->
          <div class="flex items-center gap-1.5 mt-auto pt-1.5">
            <button 
              class="flex-1 py-1.5 px-2.5 rounded-md bg-gradient-to-r from-[#C6A15B] to-[#A8843E] hover:from-[#DFBF7A] hover:to-[#C6A15B] text-neutral-950 font-bold text-[10px] tracking-wider uppercase flex items-center justify-center gap-1 shadow-sm hover:shadow transition-all"
              data-action="add-cart"
              data-id="${product.id}"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              ADD TO WARDROBE
            </button>
            <button 
              class="w-7 h-7 rounded-md bg-white/5 border border-[#C6A15B]/30 text-[#DFBF7A] hover:bg-[#C6A15B] hover:text-black flex items-center justify-center transition-colors"
              data-action="quickview"
              data-id="${product.id}"
              title="Open Lookbook Details"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>

        </div>

      </div>
    </article>
  `;
}

// ============================================================================
// 2. VANILLA HTML & CSS COMPONENT
// ============================================================================

/**
 * Generates an interactive 3D Flip Product Card using semantic CSS classes.
 * Compatible with `css/style.css` in LuxeLoom.
 * 
 * @param {Product} product - Product data object
 * @param {boolean} [isWishlisted=false] - Whether product is currently in wishlist
 * @returns {string} HTML string
 */
export function create3DProductCardCSS(product, isWishlisted = false) {
  const primarySize = product.sizes && product.sizes.length ? product.sizes[0] : 'M';

  return `
    <article class="product-card-3d product-card reveal-on-scroll" data-id="${product.id}" data-selected-size="${primarySize}">
      <div class="product-card-flipper">
        
        <!-- FRONT SIDE -->
        <div class="product-card-face product-card-front">
          <div class="product-card-media">
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">

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

            <div class="card-flip-badge" data-action="flip-card" data-id="${product.id}" title="Hover or click to flip in 3D">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
              <span>3D FLIP</span>
            </div>

            <button class="card-quick-view-btn" data-action="quickview" data-id="${product.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Quick View
            </button>
          </div>

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

        <!-- BACK SIDE -->
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

          <p class="product-back-desc">${product.description}</p>

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

          <div class="product-back-sizes">
            <div class="product-back-label">Available Sizes</div>
            <div class="product-size-pills">
              ${(product.sizes || ['S', 'M', 'L', 'XL']).map((sz, idx) => `
                <button type="button" class="product-size-chip ${idx === 0 ? 'active' : ''}" data-action="select-size" data-size="${sz}">${sz}</button>
              `).join('')}
            </div>
          </div>

          <div class="product-back-colors">
            <div class="product-back-label">Color Variants</div>
            <div class="product-color-swatches">
              ${(product.colors || [{ name: 'Noir Black', hex: '#171717' }, { name: 'Gold Dune', hex: '#C6A15B' }]).map(c => `
                <span class="product-color-dot" style="background-color: ${c.hex};" title="${c.name}" aria-label="${c.name}"></span>
              `).join('')}
            </div>
          </div>

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
}
