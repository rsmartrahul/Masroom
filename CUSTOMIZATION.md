# Quick Start Guide

## Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
cd "c:\Users\rahul\OneDrive\Desktop\pravin"
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Explore the App
- **Home**: Hero section and overview
- **Products**: Browse mushroom products
- **Services**: View solar services and AMC plans
- **Enquiry**: Fill and submit contact form
- **Profile**: Company information

## 🎨 Customization Guide

### Change Company Name
Edit `app/layout.tsx` line 11:
```tsx
title: 'Your Company Name - Products & Services'
```

Edit `components/Header.tsx` line 13:
```tsx
<span className="hidden sm:inline font-bold text-lg gradient-text">Your Name</span>
```

### Update Contact Information

**Phone Numbers:**
- `components/Footer.tsx` - Line 63-64
- `app/profile/page.tsx` - Line 88-89
- All enquiry buttons

**Email:**
- `components/Footer.tsx` - Line 72
- `app/profile/page.tsx` - Line 98

**Address:**
- `app/profile/page.tsx` - Line 138-143

### Add/Modify Products

Edit `app/products/page.tsx`:
```ts
const products: Product[] = [
  {
    id: 'your-product-id',
    name: 'Product Name',
    category: 'fresh', // or 'dried', 'packaging'
    price: '₹100',
    unit: 'per kg',
    description: 'Product description',
    features: ['Feature 1', 'Feature 2'],
    image: '🍄', // emoji placeholder
    stock: '500 kg',
    rating: 4.8,
  },
  // Add more...
];
```

### Add/Modify Services

Edit `app/services/page.tsx`:
```ts
const services = [
  {
    icon: Zap,
    title: 'Service Name',
    description: 'Description',
    features: ['Feature 1', 'Feature 2'],
    price: '₹500',
    unit: 'per service',
  },
  // Add more...
];
```

### Change Colors

Edit `tailwind.config.js`:

**Mushroom Business Green:**
```js
mushroom: {
  500: '#22c55e', // Change to your color
  600: '#16a34a',
  700: '#15803d',
}
```

**Solar Business Orange:**
```js
solar: {
  500: '#ef4444', // Change to your color
  600: '#dc2626',
  700: '#b91c1c',
}
```

### Modify Animations

Edit `globals.css` or `tailwind.config.js` keyframes section:
```css
@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
```

### Update Social Media Links

Edit `app/profile/page.tsx` social media section (around line 130):
```tsx
{ icon: Facebook, label: 'Facebook', url: 'https://facebook.com/yourpage', ... }
```

Edit `components/Footer.tsx` social links (around line 35-42).

## 📝 Form Customization

### Add New Form Fields

Edit `app/enquiry/page.tsx`:

1. Add field to `FormData` interface:
```ts
interface FormData {
  // ... existing fields
  newField: string;
}
```

2. Add to form JSX and validation:
```tsx
<div>
  <label>New Field *</label>
  <input
    value={formData.newField}
    onChange={(e) => setFormData({ ...formData, newField: e.target.value })}
  />
</div>
```

### Form Validation

Update `validateForm()` function:
```ts
if (!formData.newField) newErrors.newField = 'Required message';
```

## 🎯 SEO Customization

Edit `app/layout.tsx` metadata:
```ts
export const metadata: Metadata = {
  title: 'Your Title',
  description: 'Your description',
  keywords: ['keyword1', 'keyword2'],
};
```

## 🌙 Theme Management

- Theme is automatically detected from system preference
- Stored in localStorage with key 'theme'
- Use `useThemeContext()` hook for theme access

## 📱 Responsive Breakpoints

- Mobile: 0px - 640px (sm)
- Tablet: 640px - 1024px (md)
- Desktop: 1024px+ (lg)

Test with Tailwind prefixes: `sm:`, `md:`, `lg:`

## 🔧 Build & Deploy

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm start

# Export static site
npm run export

# Lint code
npm lint
```

## 📦 Adding Packages

```bash
# Add new package
npm install package-name

# Save dev dependency
npm install --save-dev package-name

# Remove package
npm uninstall package-name
```

## 🐛 Debugging

Enable debug mode in `next.config.js`:
```js
env: {
  DEBUG: 'true',
}
```

Check browser console for errors and Next.js dev server logs.

## 📊 Page Structure

Each page includes:
1. **Hero Section** - Title and description
2. **Main Content** - Page-specific content
3. **Features Section** - Highlights or details
4. **Benefits/Stats** - Key metrics
5. **Testimonials** - Social proof (optional)
6. **CTA Section** - Call to action

## ✨ Common Customizations

### Change Hero Background Gradient
```tsx
className="bg-gradient-to-br from-primary-50 to-mushroom-50"
// Change colors or direction
```

### Modify Card Styles
Look for `glass-card` class in `globals.css` - affects all glass-effect cards.

### Update Navigation Tabs
Edit `components/BottomNavigation.tsx` tabs array.

### Change Footer Text
Edit `components/Footer.tsx` - All copyright and description text.

## 🚀 Performance Tips

- Use `next/image` for images
- Use `next/link` for internal navigation
- Minimize animations on low-end devices
- Use `dynamic()` for heavy components
- Enable ISR for static pages

## 🔐 Security Notes

- Never commit `.env` file
- Always use `.env.local` for local variables
- Validate all user inputs on backend
- Use HTTPS in production (automatic on Vercel)
- Keep dependencies updated: `npm update`

## 📚 Component Reuse

All components are designed to be reusable:
- `glass-card` - Reusable card styling
- `btn-primary`, `btn-secondary` - Button styles
- `section-container` - Consistent spacing
- `gradient-text` - Gradient text styling

## 🎯 Next Steps

1. Update company information
2. Add real products and services
3. Set up form backend
4. Connect analytics
5. Deploy to Vercel
6. Monitor and optimize

---

**Happy coding! Need help? Check README.md or DEPLOYMENT.md**
