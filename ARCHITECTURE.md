# Architecture Guide

## System Overview

This is a **content-driven** web application built with:
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **CMS**: Sanity.io (headless)
- **Hosting**: Vercel (recommended)

## Data Flow

```
┌─────────────────┐
│   Sanity.io     │  (CMS - Content Hub)
│  - Sermons      │
│  - Categories   │
└────────┬────────┘
         │ GROQ Queries via @sanity/client
         │
┌────────▼─────────────────┐
│   Next.js Frontend        │
│  - ISR/SSG Pages         │
│  - API Routes (optional) │
└────────┬─────────────────┘
         │ HTML/CSS/JS
         │
┌────────▼──────────┐
│   Browser / User  │
└───────────────────┘
```

## Component Architecture

### Page Hierarchy

```
Layout (Root)
├── Navbar
├── Main Content
│   ├── Home Page
│   │   ├── Hero
│   │   ├── Stats
│   │   ├── Featured Sermons (MediaCard[])
│   │   ├── Categories
│   │   └── CTA
│   │
│   ├── Sermons Listing
│   │   ├── Hero
│   │   ├── Search/Filter
│   │   └── MediaCard[] (Grid)
│   │
│   ├── Sermon Detail
│   │   ├── Hero (Thumbnail)
│   │   ├── Metadata
│   │   ├── SermonContentDisplay
│   │   │   ├── ReactPlayer (Video)
│   │   │   ├── Audio Element (Audio)
│   │   │   └── PortableText (Text)
│   │   └── Related Sermons
│   │
│   └── Prayer Wall
│       ├── Hero
│       ├── PrayerWallForm
│       └── Info Section
│
└── Footer
```

## Data Models

### Sermon
```typescript
{
  _id: string
  title: string
  slug: { current: string }
  description: string
  date: string (ISO 8601)
  contentType: 'video' | 'audio' | 'text'
  videoUrl?: string
  audioUrl?: string
  audioFile?: { asset: { url: string } }
  textContent?: PortableTextBlock[]
  thumbnail?: SanityImage
  speaker?: string
  duration?: number
  featured: boolean
  category: Category (reference)
  publishedAt: string
}
```

### Category
```typescript
{
  _id: string
  name: string
  slug: { current: string }
  description?: string
  order?: number
}
```

### Prayer Request
```typescript
{
  name: string
  email: string
  prayer: string
  category: 'healing' | 'guidance' | 'thanksgiving' | 'intercession' | 'other'
  isPublic: boolean
}
```

## Styling Architecture

### Tailwind Layers

```css
@tailwind base;     /* Element defaults (heading, body, links) */
@tailwind components; /* Reusable component classes */
@tailwind utilities; /* Low-level utilities */
```

### Custom Utilities Defined

| Class | Purpose |
|-------|---------|
| `.btn-primary` | Gold button with hover |
| `.btn-secondary` | Border button with hover |
| `.btn-tertiary` | Dark button with hover |
| `.card` | White card with shadow |
| `.section-padding` | Vertical padding (py-16 md:py-24) |
| `.container-custom` | Max-width container with padding |
| `.divider` | Gold accent line |
| `.glass` | Frosted glass effect |
| `.text-gradient` | Gradient text effect |

## API Structure

### GROQ Queries

All data fetching uses GROQ (Graph Relational Object Query Language):

```typescript
// File: src/lib/queries.ts
export async function getSermons()
export async function getSermonBySlug(slug: string)
export async function getSermonsByCategory(categorySlug: string)
export async function getFeaturedSermons(limit: number)
export async function getCategories()
export async function getCategoryBySlug(slug: string)
```

### Response Caching

Next.js automatically caches queries via `@sanity/client` with `useCdn: true` in production.

## Performance Optimizations

### Image Optimization
- Next.js Image component with automatic optimization
- Responsive srcset generation
- WebP format conversion

### Code Splitting
- Dynamic imports for React Player
- Route-based code splitting

### Static Generation
- Home page: Pre-rendered at build time
- Sermon list: Re-rendered on-demand
- Detail pages: ISR (Incremental Static Regeneration)

### Bundle Size
- Lucide icons: Tree-shakeable
- Framer Motion: Progressive enhancement
- Minimal dependency footprint

## Security Considerations

### Environment Variables
- Sanity Project ID is public (prefixed with `NEXT_PUBLIC_`)
- API tokens should be kept in private env vars (if needed)

### Form Validation
- Client-side: Zod schema validation
- React Hook Form for state management
- CSRF protection built-in via Next.js

### Content Security
- Sanitized user input in prayer form
- Markdown rendered safely via PortableText
- URL validation for video/audio embeds

## Extensibility

### Adding New Pages
1. Create folder in `src/app/[page]/`
2. Create `page.tsx` 
3. Wrap layout components (Hero, Footer auto-included)

### Adding New Components
1. File in `src/components/[Name].tsx`
2. If server component: no 'use client'
3. If interactive: add 'use client' directive
4. Export in `src/components/index.ts`

### Adding New Sanity Schemas
1. Create file in `sanity/schemas/[schema-name].ts`
2. Import in `sanity/schemas/index.ts`
3. Deploy: `npm run sanity deploy`

### Adding API Routes
1. Create file in `src/app/api/[route]/route.ts`
2. Export handlers: `export async function GET/POST/etc`
3. Example: `/api/prayers` for prayer submissions

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 8+

## Development Workflow

### Local Development
```bash
npm run dev              # Start dev server + watch
npm run type-check      # TypeScript validation
npm run lint            # ESLint
```

### Production Build
```bash
npm run build           # Build for production
npm start               # Start production server
```

### Sanity Studio
```bash
cd sanity
sanity start            # Runs at localhost:3333
```

## Deployment Considerations

### Vercel
- Automatically builds on git push
- Environment variables configured in dashboard
- No build command needed (auto-detected)
- CDN at edge for images

### Environment Variables
Required in production:
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
```

### Build Optimization
- Image optimization at build time
- Automatic code splitting
- CSS purging (unused styles removed)

## Monitoring & Analytics

*Ready to add:*
- Google Analytics via next/script
- Sentry for error tracking
- Sanity analytics dashboard

---

This architecture prioritizes:
- **Maintainability**: Clear component structure
- **Performance**: Optimized assets and caching
- **Flexibility**: Easy to extend and customize
- **Developer Experience**: Type-safe, well-documented
