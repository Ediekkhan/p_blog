# Launch Checklist

Use this checklist to prepare your pastor's website for launch.

## Phase 1: Development Setup ✅

- [ ] Clone/download project
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env.local`
- [ ] Create Sanity project and get Project ID
- [ ] Add `NEXT_PUBLIC_SANITY_PROJECT_ID` to `.env.local`
- [ ] Run `npm run dev` and verify site loads
- [ ] Test responsive design on mobile/tablet

## Phase 2: Content Creation

### Sanity Setup
- [ ] Access Sanity Studio
- [ ] Deploy schemas: `npm run sanity deploy`
- [ ] Verify schemas appear in Studio
- [ ] Create 3-5 initial categories

### Content Creation
- [ ] Add 10+ sermons with:
  - [ ] Titles and descriptions
  - [ ] Proper categories
  - [ ] Video/audio/text content
  - [ ] Thumbnail images
  - [ ] Speaker names
  - [ ] Durations
- [ ] Mark 3 sermons as "Featured" for homepage
- [ ] Test all content types (video, audio, text)

## Phase 3: Branding & Customization

### Visual Identity
- [ ] Update color scheme (if different):
  - [ ] Edit `tailwind.config.ts`
  - [ ] Update `src/globals.css` variables
- [ ] Replace logo in `Navbar.tsx`
- [ ] Update favicon in `public/`
- [ ] Add Open Graph image (og-image.png)

### Content Customization
- [ ] Update site title in `src/app/layout.tsx`
- [ ] Update site description
- [ ] Customize hero text on home page
- [ ] Update footer contact information:
  - [ ] Email address
  - [ ] Phone number
  - [ ] Physical address
- [ ] Add social media links to Footer
- [ ] Update pastor name/title throughout

### Messaging
- [ ] Update navbar links/labels
- [ ] Customize hero section text
- [ ] Update category descriptions
- [ ] Add "About" section content
- [ ] Write contact page content

## Phase 4: Testing

### Functionality
- [ ] Homepage loads and displays featured sermons
- [ ] Search works on Sermons page
- [ ] Category filtering works
- [ ] Click through to individual sermons
- [ ] Video player works (if using YouTube/Vimeo)
- [ ] Audio player works (if using MP3)
- [ ] Text content displays properly
- [ ] Prayer form submits without errors
- [ ] Prayer form validation works
- [ ] Links navigate correctly
- [ ] Mobile menu opens/closes

### Responsive Design
- [ ] Test on iPhone 12/13/14
- [ ] Test on iPad
- [ ] Test on Android device
- [ ] Test on tablet (iPad Pro size)
- [ ] Test on desktop (1920px+)
- [ ] Check orientation changes work

### Cross-Browser
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

### Performance
- [ ] Run Lighthouse audit (target 90+)
- [ ] Core Web Vitals check
- [ ] Images load quickly
- [ ] No console errors
- [ ] No console warnings

### Accessibility
- [ ] Tab through all links
- [ ] Buttons have focus states
- [ ] Images have alt text
- [ ] Color contrast sufficient
- [ ] Forms are keyboard accessible
- [ ] Screen reader compatible

## Phase 5: SEO Preparation

- [ ] Verify meta title in layout
- [ ] Verify meta description
- [ ] Add Open Graph tags
- [ ] Add Twitter card tags
- [ ] Create sitemap (auto-generated)
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Set canonical URLs

## Phase 6: Security & Privacy

- [ ] Review privacy policy (add to `/privacy` page)
- [ ] Review terms of service (add to `/terms` page)
- [ ] Configure CORS in Sanity if needed
- [ ] Enable HTTPS on custom domain
- [ ] Set secure headers
- [ ] Review environment variables (no secrets in code)

## Phase 7: Deployment Setup

### Domain & Hosting
- [ ] Choose domain name
- [ ] Register domain (if new)
- [ ] Set up DNS pointing to Vercel
- [ ] Configure SSL certificate

### Vercel Setup
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Add environment variables:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
- [ ] Configure build settings (usually auto-detected)
- [ ] Set production domain
- [ ] Enable automatic deployments

### Email & Notifications
- [ ] Set up email service for prayer submissions (optional)
- [ ] Configure prayer notification workflow
- [ ] Test email delivery

## Phase 8: Pre-Launch

- [ ] Final content review
- [ ] Final design review
- [ ] Link all pages check
- [ ] 404 page customized
- [ ] Build locally: `npm run build`
- [ ] Deploy to staging if available
- [ ] Run final Lighthouse audit
- [ ] Verify Google Analytics tracking
- [ ] Check all forms work end-to-end

## Phase 9: Launch! 🚀

- [ ] Push code to main branch
- [ ] Verify deployment on Vercel
- [ ] Test live site
- [ ] Monitor for errors (Sentry/console)
- [ ] Share with pastor for review
- [ ] Get feedback and iterate

## Phase 10: Post-Launch

### First Week
- [ ] Monitor site performance
- [ ] Check analytics
- [ ] Fix any reported issues
- [ ] Monitor error logs
- [ ] Ensure backups working

### Ongoing
- [ ] Add new sermons regularly
- [ ] Monitor and respond to form submissions
- [ ] Keep dependencies updated
- [ ] Monitor security advisories
- [ ] Review analytics monthly
- [ ] Update content as needed

## Optional Enhancements

- [ ] Add newsletter signup
- [ ] Add podcast feed (RSS)
- [ ] Add blog section
- [ ] Add events calendar
- [ ] Add giving/donation page
- [ ] Add testimonials section
- [ ] Add staff profiles
- [ ] Add live stream integration
- [ ] Add chat/comments
- [ ] Add member login

## Environment Variables Checklist

Production `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
```

Vercel Dashboard:
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` added
- [ ] `NEXT_PUBLIC_SANITY_DATASET` added
- [ ] Variables exposed to edge functions (if needed)

## Important Files to Verify

Final check before launch:

- [ ] `src/app/layout.tsx` - Site title, description, OG tags
- [ ] `src/components/Navbar.tsx` - Logo, navigation links
- [ ] `src/components/Footer.tsx` - Contact info, social links
- [ ] `src/components/Hero.tsx` - Hero messaging
- [ ] `.env.local` - Sanity credentials
- [ ] `tailwind.config.ts` - Brand colors
- [ ] `src/globals.css` - Global styles

## Launch Day Timeline

**1 hour before:**
- [ ] Verify all systems online
- [ ] Check Vercel deployment status
- [ ] Test form submissions
- [ ] Monitor error logs

**At launch:**
- [ ] Announce on social media
- [ ] Send email to congregation
- [ ] Monitor analytics
- [ ] Watch for errors

**After launch:**
- [ ] Collect feedback
- [ ] Monitor performance
- [ ] Fix critical issues immediately
- [ ] Plan next improvements

## Support & Maintenance

### Weekly
- [ ] Check for new sermons to add
- [ ] Monitor analytics
- [ ] Check error logs

### Monthly
- [ ] Review performance metrics
- [ ] Update dependencies (security)
- [ ] Backup content
- [ ] Review form submissions

### Quarterly
- [ ] Major feature updates
- [ ] Design refreshes
- [ ] User feedback implementation
- [ ] Security audit

---

## Contact & Questions

**Stuck on something?**
1. Check README.md
2. Check SANITY_SETUP.md
3. Check ARCHITECTURE.md
4. Check relevant documentation links

**Ready to launch? Check all boxes above!** ✅
