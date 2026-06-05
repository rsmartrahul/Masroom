# Setup & Testing Guide

## 🚀 Quick Setup (2 Steps)

### Step 1: Install Dependencies
```bash
cd "c:\Users\rahul\OneDrive\Desktop\pravin"
npm install
```

Expected output:
```
added 450+ packages
```

### Step 2: Start Development Server
```bash
npm run dev
```

Expected output:
```
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

---

## 📝 Setup Checklist

- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Test all 5 pages (Home, Products, Services, Enquiry, Profile)
- [ ] Test bottom navigation
- [ ] Test dark/light mode toggle
- [ ] Test form submission
- [ ] Test responsive design (mobile view)

---

## 🧪 Testing Guide

### 1. Page Testing

#### Home Page
- [ ] Hero section displays properly
- [ ] All animated elements work smoothly
- [ ] Statistics show correct numbers
- [ ] Testimonials carousel works
- [ ] CTA buttons are clickable

#### Products Page
- [ ] Product grid displays all 9 items
- [ ] Category filters work (All, Fresh, Dried, Packaging)
- [ ] Each product shows price, stock, rating
- [ ] "Add to Cart" button visible
- [ ] "Enquire" button links to form

#### Services Page
- [ ] All 3 services display with pricing
- [ ] AMC plans comparison shows all 3 plans
- [ ] "Most Popular" badge on Premium plan
- [ ] Benefits section shows 4 items
- [ ] Process timeline displays correctly

#### Enquiry Page
- [ ] Form renders with all fields
- [ ] Contact info sidebar displays
- [ ] Product/Service toggle works
- [ ] Form validation works
- [ ] Success message appears after submission
- [ ] FAQ section displays

#### Profile Page
- [ ] Company hero section displays
- [ ] Mission, Vision, Values cards show
- [ ] Contact details display correctly
- [ ] Quick action buttons (Call, WhatsApp, Email)
- [ ] Social media links visible
- [ ] Why choose us section shows 6 items

### 2. Navigation Testing

- [ ] Bottom navigation tabs highlight active page
- [ ] All tab links work correctly
- [ ] Header logo works
- [ ] Theme toggle button works (sun/moon icon)
- [ ] Footer links are clickable

### 3. Responsive Design Testing

**Mobile (375px)**
- [ ] Text readable
- [ ] Buttons clickable
- [ ] Images scale properly
- [ ] Bottom nav visible

**Tablet (768px)**
- [ ] Layout adjusts properly
- [ ] Grid shows 2 columns where appropriate
- [ ] Form fields stack nicely

**Desktop (1024px+)**
- [ ] Full layout displays
- [ ] 3+ column grids work
- [ ] Hero sections look good

### 4. Dark Mode Testing

- [ ] Toggle dark mode with moon icon
- [ ] All text readable in dark mode
- [ ] Cards have proper contrast
- [ ] Images/emojis visible
- [ ] Theme persists after refresh

### 5. Form Testing

**Valid Input:**
```
Name: John Doe
Mobile: 9876543210
Email: john@example.com
Product: Fresh Button Mushrooms
Quantity: 100 kg
Message: I'm interested in bulk orders
```

**Invalid Input Testing:**
- [ ] Empty name shows error
- [ ] Invalid mobile shows error (< 10 digits)
- [ ] Invalid email shows error
- [ ] Empty quantity shows error
- [ ] Empty message shows error

### 6. Performance Testing

Using Lighthouse (Chrome DevTools):
- [ ] Performance: > 90
- [ ] Accessibility: > 95
- [ ] Best Practices: > 90
- [ ] SEO: > 90

Run manually:
1. Open DevTools (F12)
2. Click Lighthouse tab
3. Click "Analyze page load"

### 7. Browser Testing

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (Mac/iPhone)
- [ ] Mobile browser

---

## 🐛 Common Issues & Solutions

### Issue: Module not found
**Solution:**
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: Tailwind styles not working
**Solution:**
```bash
# Restart dev server
npm run dev

# Or rebuild
npm run build
```

### Issue: Dark mode not persisting
**Solution:**
- Clear browser localStorage
- Hard refresh (Ctrl+Shift+R)
- Check browser DevTools > Application > Storage

### Issue: Form validation errors
**Solution:**
- Check console for errors (F12)
- Verify email format
- Verify phone is 10 digits
- Check all fields are filled

---

## 📊 Testing Scenarios

### Scenario 1: Customer Journey
1. User lands on home page
2. Scrolls through testimonials
3. Clicks "Explore Products"
4. Filters to see dried products
5. Clicks enquire on a product
6. Fills form and submits
7. Sees success message

✅ **Expected Result:** Smooth navigation, all pages load, form validation works

### Scenario 2: Mobile User
1. Opens on mobile device
2. Navigates using bottom tabs
3. Reads testimonials
4. Clicks call button
5. Views dark mode

✅ **Expected Result:** Responsive layout, readable text, easy navigation

### Scenario 3: B2B Enquiry
1. Visits services page
2. Reads AMC plan details
3. Clicks "Get Started" on Premium plan
4. Form pre-fills with service selection
5. Submits enquiry
6. Gets success notification

✅ **Expected Result:** Plan selected in form, validation passes, notification shows

---

## 🔧 Build & Optimization Testing

### Development Build
```bash
npm run build
npm start
```

Visit http://localhost:3000 and test all pages.

Expected:
- [ ] All pages load
- [ ] No errors in console
- [ ] Performance metrics good

### Static Export (Optional)
```bash
npm run export
# Generates /out directory with static files
```

### Linting
```bash
npm run lint
```

Expected:
- [ ] No errors
- [ ] All files pass lint checks

---

## 📈 SEO Testing

### Metadata Check
1. View page source (Ctrl+U)
2. Look for meta tags:
   - [ ] Title tag present
   - [ ] Description tag present
   - [ ] Viewport tag present
   - [ ] Og:image tags present

### Sitemap & Robots
- [ ] `/robots.txt` is accessible
- [ ] `/sitemap.xml` is valid XML
- [ ] All pages listed in sitemap

### Schema Testing
Use [Schema.org Validator](https://validator.schema.org/):
- [ ] Organization schema
- [ ] LocalBusiness schema
- [ ] Product schema (optional)

---

## 🚀 Pre-Deployment Testing

### 1. Production Build
```bash
npm run build
# Should complete with no errors
```

### 2. Production Start
```bash
npm start
# Server should start without errors
```

### 3. Final Checks
- [ ] All pages accessible
- [ ] Form submissions work
- [ ] Images load properly
- [ ] No console errors
- [ ] Performance is good
- [ ] Mobile view works

### 4. Deployment Preview
```bash
vercel --prod
# Test on Vercel before final deployment
```

---

## 📋 Quick Command Reference

```bash
# Install dependencies
npm install

# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Export static site
npm run export

# Run linter
npm lint

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

---

## 🎯 Success Criteria

Your app is ready when:

✅ All 5 pages load without errors
✅ Bottom navigation works on all pages
✅ Form validation catches invalid input
✅ Success message appears on form submit
✅ Dark/Light mode toggle works
✅ Mobile view is responsive
✅ No console errors in DevTools
✅ Lighthouse score > 90 for all metrics
✅ All links are functional
✅ Images/emojis display properly

---

## 📞 Troubleshooting Support

### Check These First
1. Run `npm install` again
2. Clear browser cache (Ctrl+Shift+Delete)
3. Close and restart dev server
4. Check console for error messages (F12)
5. Try different browser

### Common Error Messages

**"Cannot find module"**
- Solution: `npm install` the missing package

**"Port 3000 in use"**
- Solution: Kill process on port 3000 or use different port

**"Styling not applied"**
- Solution: Restart dev server and hard refresh browser

**"Form not submitting"**
- Solution: Check browser console, verify form data is valid

---

## 🎓 Next Steps After Testing

1. ✅ Complete all tests above
2. ⏭️ Customize company information
3. ⏭️ Update product/service lists
4. ⏭️ Set up form backend
5. ⏭️ Deploy to Vercel
6. ⏭️ Monitor with analytics

---

**Happy Testing! Your app is production-ready! 🚀**
