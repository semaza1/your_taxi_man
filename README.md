# Your Taxi Man — Premium Transportation & Tourism Website

A modern, professional, responsive website for **Your Taxi Man**, a private transportation and driving-experience service based in Kigali, Rwanda.

Designed with inspiration from the Figma Community "Rent Car - Landing Page" prototype and adapted for private chauffeur hospitality, airport transfers, city mobility, and bespoke Rwanda tourism exploration.

---

## 🚀 Getting Started

### Development Server
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Code Quality Check
```bash
npm run lint
```

---

## 🎨 Brand Identity & Design Tokens

- **Primary Black**: `#111111`
- **Deep Charcoal**: `#1C1C1C`
- **Brand Yellow**: `#F5C400` (Hover: `#E5B700`)
- **Light Surface Background**: `#F7F7F5`
- **Body Text**: `#555555`
- **Typography**: Plus Jakarta Sans (Google Fonts)

---

## 📁 Project Structure

```
your_tax_man/
├── public/
│   ├── images/
│   │   ├── hero-vehicle.jpg      # Scenic executive vehicle in Rwanda
│   │   ├── about-kigali.jpg      # Chauffeur at Kigali Convention Centre
│   │   └── rwanda-scenic.jpg     # Panoramic view of Lake Kivu & terraced hills
│   └── favicon.svg
├── src/
│   ├── config/
│   │   └── business.js           # Central business config (WhatsApp, Instagram, etc.)
│   ├── components/
│   │   ├── Navbar.jsx            # Sticky navigation with mobile menu
│   │   ├── Hero.jsx              # Hero banner with value badges and CTAs
│   │   ├── BookingBar.jsx        # Floating segmented booking bar with validation
│   │   ├── Services.jsx          # 6 tailored service cards with specs
│   │   ├── About.jsx             # Business & chauffeur introduction
│   │   ├── WhyChooseUs.jsx       # 4 core values & 3-step booking flow
│   │   ├── RwandaTravelPreview.jsx # Scenic tourism inspiration
│   │   ├── ContactCta.jsx        # High-contrast contact & quick inquiry card
│   │   ├── Footer.jsx            # Sleek dark footer with dynamic year
│   │   ├── WhatsAppModal.jsx     # Formatted booking message preview & copy action
│   │   └── InstagramIcon.jsx     # Reusable SVG Instagram icon
│   ├── App.jsx                   # Main homepage assembly
│   ├── index.css                 # Tailwind directives, base styles, reduced-motion
│   └── main.jsx                  # Application entry point
├── index.html                    # SEO metadata and font preconnects
├── tailwind.config.js            # Custom color palette and design tokens
└── package.json
```

---

## ⚙️ Business Configuration & Next Steps

Business contact details are configured in `src/config/business.js`:

```javascript
export const BUSINESS_CONFIG = {
  name: "Your Taxi Man",
  // Update with confirmed WhatsApp international number (e.g. "250788123456")
  whatsappNumber: "", 
  whatsappDisplay: "+250 (Pending Owner Confirmation)",
  phoneNumber: "+250 (Pending Owner Confirmation)",
  email: "inquiries@yourtaximan.rw",
  instagramUrl: "https://www.instagram.com/your_taxi_man/",
  instagramHandle: "@your_taxi_man",
};
```

*Note: When `whatsappNumber` is provided, the booking bar will directly launch WhatsApp with the pre-filled message. While in placeholder mode, the system safely presents a formatted message modal with 1-click clipboard copy and a direct link to the verified Instagram account.*
