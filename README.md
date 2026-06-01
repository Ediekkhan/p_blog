Codex will review your output once your done 

# Pastor Brand Website

A premium personal brand website for your Pastor built with Next.js 14, TypeScript, and Tailwind CSS with Sanity CMS integration.

## 🎨 Design Philosophy

**Divine & Modern** - A sophisticated blend of elegance and contemporary design.

### Color Palette
- **Deep Charcoal**: `#1A1A1A` (Primary - text and backgrounds)
- **Gold**: `#D4AF37` (Accent - highlights and CTAs)
- **Off-White**: `#F9F9F9` (Secondary - backgrounds)
- **Light Gray**: `#E8E8E8` (Borders and dividers)

### Typography
- **Headings**: Playfair Display (serif) - Elegant & Authoritative
- **Body Text**: Inter (sans-serif) - Readable & Modern

## 📁 Project Structure

```
p_blog/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with Navbar & Footer
│   │   ├── page.tsx                  # Landing/Home page
│   │   ├── sermons/
│   │   │   ├── page.tsx              # Sermons listing with filters
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual sermon detail
│   │   ├── resources/
│   │   │   └── page.tsx              # Resources page (coming soon)
│   │   ├── prayer/
│   │   │   └── page.tsx              # Prayer Wall page
│   │   └── api/                      # API routes (coming soon)
│   │
│   ├── components/
│   │   ├── Navbar.tsx                # Navigation bar with mobile menu
│   │   ├── Footer.tsx                # Footer with links and contact
│   │   ├── Hero.tsx                  # Hero section with CTA
│   │   ├── MediaCard.tsx             # Sermon card component
│   │   ├── PrayerWallForm.tsx        # Prayer request form (React Hook Form + Zod)
│   │   ├── SermonContentDisplay.tsx  # Video/Audio/Text content viewer
│   │   └── index.ts                  # Component exports
│   │
│   ├── lib/
│   │   ├── sanity.ts                 # Sanity client configuration
│   │   └── queries.ts                # Sanity GROQ queries
│   │
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   │
│   └── globals.css                   # Global styles & Tailwind directives
│
├── sanity/
│   └── schemas/
│       ├── sermon.ts                 # Sermon document schema
│       ├── category.ts               # Category document schema
│       └── index.ts                  # Schema exports
│
├── public/                           # Static assets
├── tailwind.config.ts                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
├── tsconfig.json                     # TypeScript configuration
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies & scripts
├── .env.example                      # Environment variables template
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Sanity account

### 1. Installation

```bash
cd p_blog
npm install
```

### 2. Sanity Setup

Create a new Sanity project and get your Project ID:

```bash
# Initialize Sanity in the project (optional - already configured)
# sanity init

# Edit .env.local file with your Sanity credentials
cp .env.example .env.local
```

Add to `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Deploy Schemas to Sanity

```bash
npm run sanity deploy
```

Then in the Sanity Studio:
1. Go to your Sanity project
2. Click "Create New" 
3. Select "Sermon" or "Category" to start adding content

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

## 📚 Available Pages

### Public Pages
- **`/`** - Home page with featured sermons and hero
- **`/sermons`** - Full sermon library with search & category filters
- **`/sermons/[slug]`** - Individual sermon detail with content player
- **`/resources`** - Resources page with category filtering (coming soon)
- **`/prayer`** - Prayer Wall with submission form

## 🎤 Sermon Library Features

### Content Types Supported
1. **Video** - YouTube/Vimeo embeds via URL
2. **Audio** - MP3/podcast with player (URL or file upload)
3. **Text** - Rich devotional content using Portable Text

### Sermon Schema Fields
- Title, Slug, Description
- Category (reference)
- Date, Speaker, Duration
- Content Type (video/audio/text)
- Content URLs/Files based on type
- Thumbnail image with hotspot
- Featured flag for homepage display
- Publishing metadata

### Category Schema Fields
- Name, Slug, Description
- Display order
- Used for filtering and organization

## 🔧 Configuration

### Tailwind CSS
All custom colors and typography defined in `tailwind.config.ts`:
- Custom colors: `charcoal`, `gold`, `off-white`, `light-gray`
- Global styles: buttons, cards, sections, typography

### Global Styles (`src/globals.css`)
- Font imports (Playfair Display, Inter)
- Theme variables (colors)
- Utility classes (`.btn-primary`, `.card`, `.section-padding`)
- Custom animations (fade-in, slide-up)
- Accessibility focus states

## 🛠️ Key Components

### Navbar
- Sticky navigation with mobile-responsive menu
- Logo with gold accent
- Navigation links with underline animation
- CTA button ("Get in Touch")

### Hero Section
- Full-height banner
- Customizable title, subtitle, CTA
- Scroll indicator animation
- Background pattern with gold accents

### MediaCard
- Responsive sermon card
- Supports video, audio, text content badges
- Hover animations
- Meta information (date, speaker, duration)
- Compact and full view modes

### PrayerWallForm
- React Hook Form with Zod validation
- Categories: healing, guidance, thanksgiving, intercession, other
- Public/private toggle
- Form validation with error messages
- Success feedback animation

### SermonContentDisplay
- Dynamic content viewer based on sermon type
- React Player for video (YouTube/Vimeo)
- Native HTML5 audio player for MP3
- Portable Text renderer for devotionals

### Footer
- Multi-column layout with navigation
- Social media links
- Contact information
- Brand information
- Responsive design

## 📦 Dependencies

### Core
- **next**: 14.x (React framework)
- **react**: 18.x (UI library)
- **typescript**: Latest (Type safety)

### Styling
- **tailwindcss**: 3.x (Utility-first CSS)
- **framer-motion**: 10.x (Animations)

### Forms & Validation
- **react-hook-form**: Latest (Form management)
- **zod**: Latest (Schema validation)
- **@hookform/resolvers**: Latest (Form validation)

### CMS & Media
- **@sanity/client**: Latest (Sanity API)
- **@sanity/image-url**: Latest (Image optimization)
- **react-player**: Latest (Video/Audio player)

### Icons
- **lucide-react**: Latest (Icon library)

## 🎯 Customization Tips

### Add New Pages
1. Create file in `src/app/[page]/page.tsx`
2. Use `Hero` component for header
3. Use `container-custom` class for spacing
4. Import `motion` from framer-motion for animations

### Add New Sermon Category
1. Go to Sanity Studio
2. Create new Category document
3. Fill in Name, Slug, Description, Order
4. It'll automatically appear in filters

### Customize Colors
Edit `tailwind.config.ts` and `src/globals.css` for your brand colors.

### Update Logo
- Replace logo in `Navbar.tsx`
- Update favicon in `public/`
- Update og-image in metadata

## 📱 Mobile Optimization

- Fully responsive design
- Mobile-first Tailwind approach
- Touch-friendly navigation
- Optimized image loading
- Smooth animations on all devices

## ♿ Accessibility

- Semantic HTML
- ARIA labels for icon buttons
- Focus states for keyboard navigation
- Color contrast compliance
- Alt text for images

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Environment Variables

Required:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset name (usually "production")

Optional:
- Add API tokens for private content

## 📊 Performance

- Image optimization with Next.js Image
- Code splitting with dynamic imports
- Lazy loading for components
- CSS-in-JS optimization
- Minimal JavaScript bundles

## 🤝 Contributing

Feel free to customize and extend this template for your specific needs!

## 📝 License

This template is ready to use. Customize as needed for your pastor's brand.

## 🆘 Troubleshooting

### Sanity not loading content
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Ensure schemas are deployed to Sanity
- Check Sanity API permissions

### Images not loading
- Confirm image URLs in Sanity
- Check image hostname in `next.config.js`
- Verify Sanity API access

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)

---

Built with ❤️ for ministry leaders
