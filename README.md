# Business Hub - Multi-Business Platform

A professional, mobile-first Next.js application for managing two businesses: Mushroom Products & Packaging and Solar Panel Services.

## 🚀 Features

### Core Pages
- **Home**: Hero section, business overview, statistics, testimonials, and CTAs
- **Products**: Fresh mushrooms, dried products, and eco-friendly packaging with filtering
- **Services**: Solar cleaning, maintenance, and comprehensive AMC plans
- **Enquiry**: Professional form with validation, real-time feedback
- **Profile**: Company information, contact details, social links

### UI/UX Excellence
- ✨ **Glassmorphism Design** - Modern frosted glass effects
- 🎨 **Dark/Light Mode** - Smooth theme switching with persistence
- 📱 **Mobile-First** - Fully responsive from mobile to desktop
- ⚡ **Smooth Animations** - Framer Motion powered transitions
- 🎯 **Bottom Navigation** - iOS-style navigation tabs
- 🌐 **Production-Ready** - Optimized for Vercel deployment

### Business Features
- 🍄 **Mushroom Products Section** - Green-themed with product categories
- ☀️ **Solar Services Section** - Blue/Orange-themed with AMC plans
- 📋 **Smart Form Validation** - Real-time feedback and error handling
- 🔔 **Success Notifications** - Toast-like notifications
- 📞 **Multi-Channel Contact** - Call, Email, WhatsApp, Live Chat
- 🎯 **SEO Optimized** - Metadata and structured data ready

## 📋 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page
│   ├── products/page.tsx   # Products page
│   ├── services/page.tsx   # Services page
│   ├── enquiry/page.tsx    # Enquiry form page
│   └── profile/page.tsx    # Company profile page
├── components/
│   ├── ThemeProvider.tsx   # Dark mode provider
│   ├── Header.tsx          # Sticky header
│   ├── BottomNavigation.tsx # Mobile navigation
│   └── Footer.tsx          # Footer component
├── hooks/
│   └── useTheme.ts         # Theme management hook
├── lib/
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── globals.css             # Global styles & tailwind imports
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

## 🎨 Color Scheme

### Mushroom Business
- Primary: Green (`#22c55e` - `#15803d`)
- Secondary: Slate
- Theme: Organic, Natural, Fresh

### Solar Business
- Primary: Orange/Red (`#ef4444` - `#b91c1c`)
- Secondary: Blue accents
- Theme: Energy, Efficiency, Modern

### General UI
- Accent: Primary Blue (`#0ea5e9`)
- Background: White/Dark Slate
- Text: Slate 900/50

## 🛠️ Tech Stack

- **Framework**: Next.js 14.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Validation**: Zod
- **Theme**: next-themes

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

1. **Install dependencies**
```bash
npm install
```

2. **Install Next.js dependencies**
```bash
npm install next react react-dom
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 🚀 Deployment on Vercel

### One-Click Deployment
```bash
vercel deploy
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Build & Production
```bash
# Build for production
npm run build

# Start production server
npm start

# Export static site (optional)
npm run export
```

## 📱 Mobile Optimization

- ✅ Touch-friendly buttons and navigation
- ✅ Responsive images and layouts
- ✅ Mobile-first CSS
- ✅ Bottom navigation tabs
- ✅ Optimized for 375px+ screens
- ✅ Performance optimized for 4G

## 🎯 Features Breakdown

### Home Page
- Dynamic hero section with animations
- Business overview cards
- Statistics dashboard (5000+ customers)
- Testimonials carousel
- Multiple CTAs

### Products Page
- Category filtering (Fresh, Dried, Packaging)
- Product cards with details
- Stock information
- Price display
- Product details section
- Bulk order CTA

### Services Page
- Service cards with pricing
- Benefits showcase
- AMC plans comparison
- Process timeline
- Client testimonials
- Free assessment CTA

### Enquiry Page
- Multi-step form validation
- Real-time error checking
- Phone number formatting
- Email validation
- Auto-dismiss success message
- FAQ section

### Profile Page
- Company mission & vision
- Team information
- Contact details
- Social media integration
- Quick action buttons
- Why choose us section

## 🔒 Security Features

- ✅ Security headers configured
- ✅ XSS protection
- ✅ CSRF protection ready
- ✅ Content Security Policy headers
- ✅ No sensitive data in frontend

## ⚡ Performance

- 🚀 Optimized Next.js build
- 📦 Code splitting & lazy loading
- 🖼️ Image optimization
- ✨ CSS minification
- 🔥 Font optimization (Google Fonts)
- ⏱️ LCP < 2.5s target

## 📊 SEO

- ✅ Meta tags and descriptions
- ✅ Open Graph support
- ✅ Twitter card support
- ✅ Robots.txt ready
- ✅ Sitemap ready
- ✅ Structured data ready

## 🎨 Customization

### Update Company Details
Edit these files:
- `components/Footer.tsx` - Company name, contact
- `app/profile/page.tsx` - Company info, mission, vision
- `globals.css` - Brand colors and fonts

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  mushroom: { ... },
  solar: { ... },
  primary: { ... }
}
```

### Add Products/Services
Edit the respective page arrays:
- `app/products/page.tsx` - `products` array
- `app/services/page.tsx` - `services` array and `amcPlans` array

## 📞 Support & Customization

This is a starter template. Customize:
- Company names and branding
- Product/service lists and pricing
- Contact information
- Social media links
- Business hours
- Custom integrations

## 🔄 Continuous Updates

The application includes:
- Form submission handling ready for API integration
- WhatsApp Business API integration points
- Email service integration points
- Payment gateway integration ready
- Analytics integration ready

## 📄 License

This project is provided as-is for business use.

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)

---

**Built with ❤️ for modern businesses**

<!-- Force build trigger -->
