# Deployment Guide - Business Hub

## Quick Start Deployment to Vercel

### Option 1: Git-Based Deployment (Recommended)

1. **Initialize Git Repository**
```bash
cd "c:\Users\rahul\OneDrive\Desktop\pravin"
git init
git add .
git commit -m "Initial commit: Business Hub app"
```

2. **Push to GitHub**
- Create a new repository on GitHub
- Push your code:
```bash
git remote add origin https://github.com/yourusername/business-hub.git
git branch -M main
git push -u origin main
```

3. **Deploy on Vercel**
- Visit [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Click "Deploy"
- Vercel will automatically detect Next.js and configure everything

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd "c:\Users\rahul\OneDrive\Desktop\pravin"
vercel

# For production
vercel --prod
```

### Option 3: Manual Deployment (Advanced)

```bash
# Build the project
npm run build

# Start production server locally to test
npm start

# If everything works, deploy using your hosting provider
```

## Pre-Deployment Checklist

- [ ] Update company name and details in `components/Footer.tsx`
- [ ] Update contact information in `app/profile/page.tsx`
- [ ] Add real social media links
- [ ] Update WhatsApp and phone numbers
- [ ] Replace placeholder product/service data
- [ ] Test all forms and validations locally
- [ ] Test dark/light mode toggle
- [ ] Test mobile responsiveness
- [ ] Update SEO meta tags in `app/layout.tsx`
- [ ] Configure custom domain (optional)

## Environment Variables

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Domain Configuration

1. **Connect Custom Domain on Vercel**
   - Go to Vercel Dashboard
   - Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Setup**
   - Update DNS records with your domain provider
   - Vercel provides specific records to add
   - Wait for DNS propagation (usually 24-48 hours)

## Performance Monitoring

After deployment, check:

1. **Vercel Analytics**
   - Dashboard shows Core Web Vitals
   - Monitor real user metrics

2. **Google PageSpeed Insights**
   - https://pagespeed.web.dev
   - Test your deployed URL

3. **Google Search Console**
   - Submit your sitemap
   - Monitor search performance

## Continuous Deployment

Once set up:
- Every push to `main` branch auto-deploys
- Preview deployments for pull requests
- Rollback to previous versions anytime

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
npm run build -- --no-cache
vercel build
```

### Slow Performance
- Check image optimization
- Review bundle size: `npm run build`
- Reduce animations on slow networks
- Enable ISR (Incremental Static Regeneration)

### Static Export (Optional)
```bash
# Generate static site
npm run export

# Deploy to any static hosting
```

## Post-Deployment

1. **Set Up Monitoring**
   - Add Sentry for error tracking
   - Add analytics (Google Analytics, Mixpanel)

2. **Form Integration**
   - Connect enquiry form to email service:
     - SendGrid
     - AWS SES
     - Firebase
     - Custom API

3. **SEO Optimization**
   - Submit sitemap to Google Search Console
   - Set up XML sitemaps
   - Add structured data

4. **Security**
   - Enable HTTPS (automatic on Vercel)
   - Set security headers
   - Enable rate limiting

## Advanced Configuration

### Redirect HTTP to HTTPS
Already handled by Vercel

### Cache Headers
Update `next.config.js`:
```js
headers: async () => {
  return [{
    source: '/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=3600' }
    ]
  }]
}
```

### Add API Routes
Create `app/api/contact/route.ts`:
```ts
export async function POST(request: Request) {
  const data = await request.json();
  // Process enquiry
  return Response.json({ success: true });
}
```

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Get help: https://vercel.com/support

---

**Your Business Hub is now live! 🚀**
