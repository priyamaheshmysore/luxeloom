# LuxeLoom – Luxury Online Clothing Shopping Website

> **"Weaving Elegance, Defining Style."**

A luxury fashion e-commerce web platform inspired by the world's most prestigious fashion houses (such as Chanel, Dior, and Ralph Lauren Purple Label). Built with clean semantic **HTML5**, **Vanilla CSS**, and modular **JavaScript**.

---

## 💎 Brand Identity & Palette

- **Primary:** Deep Obsidian Black (`#171717`)
- **Secondary:** Champagne Gold (`#C6A15B`, `#DFBF7A`, `#9C7736`)
- **Background:** Warm Editorial Cream (`#F8F5EF`)
- **Text:** Dark Charcoal (`#242424`) & Muted Clay (`#6B6861`)
- **Surfaces/Cards:** Pure White (`#FFFFFF`)

---

## ✨ Features & Sections

1. **Top Announcement Bar:**
   - Global shipping notice with promo code highlighting (`LUXE20` for 20% off) and quick concierge access.

2. **Sticky Professional Navigation Header:**
   - Minimalist vector **LuxeLoom Monogram & Wordmark** with gold accents.
   - Menu links: *Home*, *Shop*, *Men*, *Women*, *Kids*, *New Arrivals*, and *Offers (-20%)*.
   - Gold underline animation on hover.
   - Real-time search bar with smooth scroll-to-results.
   - Interactive **Wishlist Counter Badge** and **Shopping Cart Badge**.
   - VIP Concierge Account modal.
   - Mobile responsive drawer with animated hamburger toggle.

3. **High-Fashion Hero Section:**
   - Editorial fashion model photography with subtle ambient zoom.
   - Typography: *"Discover Your Signature Style."* / *"Timeless Fashion. Modern Elegance."*
   - Direct CTA buttons: *Shop Collection* and *Explore New Arrivals*.
   - Floating *Atelier Craftsmanship* luxury crest badge.

4. **Shop by Category (4 Signature Cards):**
   - *Men's Fashion*, *Women's Fashion*, *Kids' Collection*, and *Accessories*.
   - Image zoom, smooth overlay transitions, and direct category filter integration.

5. **Trending This Season (Dynamic Catalog):**
   - 8+ curated luxury apparel items across Men, Women, Traditional Wear, Kids, and Accessories.
   - Real-time **keyword search** (searches names, categories, descriptions).
   - **Category filter pills** (*All Styles, Men, Women, Kids, Accessories*).
   - **Price range slider** ($100 – $600).
   - **Sorting engine** (*Featured, Price Low-High, Price High-Low, Newest, Top Rated*).
   - Interactive card controls: Heart Wishlist toggle, Quick View modal, and Add to Wardrobe button.
   - Elegant *"No Couture Pieces Found"* empty state with Reset Filters action.

6. **Quick View Modal:**
   - Multi-angle thumbnail gallery switcher.
   - Tailored size selector (*XS, S, M, L, XL*).
   - Atelier color swatch selector with real-time feedback.
   - Quantity counter and direct cart injection.

7. **Sliding Side Cart Drawer:**
   - Slides smoothly from the right with backdrop blur.
   - List of added garments with thumbnails, sizes, colors, and prices.
   - Live quantity controls (`+` / `–`) and item deletion.
   - Promo voucher input supporting `LUXE20` with 20% discount calculation.
   - Complimentary courier delivery calculation.
   - Persistent across browser sessions via `localStorage`.

8. **Demo Concierge Checkout Modal:**
   - Customer shipping details form (*First Name, Last Name, Email, Address, City, Postal Code*).
   - Payment preference selection (*Credit/Debit Card, Apple Pay, Concierge Delivery*).
   - Real-time order summary.
   - Order confirmation screen displaying a unique order tracking reference (e.g., `LX-849201`).

9. **Fresh Arrivals Section:**
   - European runway debut pieces with signature *"NEW ARRIVAL"* gold badges.

10. **Special Offer Promotional Banner:**
    - Live countdown timer (*Hours, Minutes, Seconds*).
    - Click-to-copy promo voucher button (`LUXE20`).
    - Direct *"Explore Offers"* CTA button.

11. **Why Choose LuxeLoom:**
    - 4 feature cards: *Premium Quality*, *Secure Payments*, *Fast Delivery*, and *Easy Returns*.

12. **Customer Reviews Carousel:**
    - Testimonials from international patrons in Paris, London, Milan, and New York.
    - 5-star ratings, quotes, verified avatars, and arrow/dot pagination controls.

13. **Newsletter Subscription:**
    - Email regex validation with feedback and exclusive `SALON15` invitation code.

14. **Professional 4-Column Footer:**
    - Brand description and social media links.
    - Quick links and Customer Support modals (*FAQs, Shipping, Returns, Privacy, Terms, Garment Care*).
    - Concierge contact details and accepted payment methods (*Visa, Mastercard, Amex, Apple Pay, PayPal*).

15. **Luxury Custom Cursor:**
    - Smooth gold tracking dot and expanding ring on hover over clickable elements (automatically disabled on touchscreens).

---

## 🚀 How to Run Locally

You can run LuxeLoom using any local static web server or simply by opening `index.html` in your modern web browser:

### Option A: Using Python (Recommended)
```bash
python -m http.server 8080
```
Then visit: `http://localhost:8080` in your web browser.

### Option B: Using Node / npx
```bash
npx serve .
```

### Option C: Direct Browser Opening
Double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.

---

## 📁 File Structure

```
Luxeloom/
├── index.html              # Main HTML5 homepage & modals
├── css/
│   └── style.css           # Vanilla CSS luxury design system
├── js/
│   ├── products.js         # Curated catalog & review dataset
│   └── app.js              # State, cart, filters, search, animations
├── assets/
│   └── images/             # Image directory
└── README.md               # Documentation & setup guide
```
