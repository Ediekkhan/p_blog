# Directory Structure Guide

## Complete Project Structure

```
p_blog/
│
├── 📄 Configuration Files
│   ├── package.json                    # Dependencies & npm scripts
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── tailwind.config.ts              # Tailwind CSS theme & custom colors
│   ├── postcss.config.js               # PostCSS / Tailwind processing
│   ├── next.config.js                  # Next.js settings
│   ├── .eslintrc.json                  # ESLint rules
│   ├── .gitignore                      # Git ignore patterns
│   └── .env.example                    # Environment variables template
│
├── 📚 Documentation Files
│   ├── README.md                       # Full documentation & setup guide
│   ├── GETTING_STARTED.md              # Quick start reference
│   ├── ARCHITECTURE.md                 # Technical architecture
│   ├── SANITY_SETUP.md                 # CMS configuration guide
│   ├── LAUNCH_CHECKLIST.md             # Pre-launch verification checklist
│   └── MANIFEST.md                     # File inventory
│
├── 📁 src/ - Source Code Directory
│   │
│   ├── 📄 globals.css                  # Global styles & Tailwind directives
│   │
│   ├── 📁 app/ - Next.js App Router
│   │   ├── layout.tsx                  # Root layout (Navbar, Footer)
│   │   ├── page.tsx                    # Home/landing page
│   │   │
│   │   ├── 📁 sermons/
│   │   │   ├── page.tsx                # Sermon listing with search/filter
│   │   │   └── 📁 [slug]/
│   │   │       └── page.tsx            # Individual sermon detail
│   │   │
│   │   └── 📁 prayer/
│   │       └── page.tsx                # Prayer Wall page & form
│   │
│   ├── 📁 components/ - Reusable UI Components
│   │   ├── Navbar.tsx                  # Navigation bar (sticky, mobile menu)
│   │   ├── Footer.tsx                  # Multi-section footer
│   │   ├── Hero.tsx                    # Hero section with CTA
│   │   ├── MediaCard.tsx               # Sermon card (compact/full view)
│   │   ├── PrayerWallForm.tsx          # Prayer form with validation
│   │   ├── SermonContentDisplay.tsx    # Video/Audio/Text content player
│   │   └── index.ts                    # Component barrel exports
│   │
│   ├── 📁 lib/ - Library Functions
│   │   ├── sanity.ts                   # Sanity client & URL builder
│   │   └── queries.ts                  # GROQ query functions
│   │
│   └── 📁 types/ - TypeScript Definitions
│       └── index.ts                    # Sermon, Category, PrayerRequest types
│
├── 📁 sanity/ - Sanity CMS Configuration
│   ├── sanity.config.ts                # Sanity project configuration
│   └── 📁 schemas/
│       ├── sermon.ts                   # Sermon document schema
│       ├── category.ts                 # Category document schema
│       └── index.ts                    # Schema exports
│
├── 📁 public/ - Static Assets
│   └── (favicon, images, etc.)
│
└── node_modules/ - Dependencies (gitignored)


## File Organization Details

### 🎨 UI Layer (src/components/)
Components that make up the UI:
- **Navbar.tsx**: Sticky header with navigation & mobile menu
- **Footer.tsx**: Footer with multiple columns & contact info
- **Hero.tsx**: Large banner section with CTA button
- **MediaCard.tsx**: Reusable card for displaying sermons
- **PrayerWallForm.tsx**: React Hook Form with Zod validation
- **SermonContentDisplay.tsx**: Renders video, audio, or text content

### 📄 Page Layer (src/app/)
Represents routes in your application:
- **layout.tsx**: Wraps all pages with Navbar & Footer
- **page.tsx**: Homepage (/)
- **sermons/page.tsx**: Sermon listing (/sermons)
- **sermons/[slug]/page.tsx**: Individual sermon (/sermons/sermon-title)
- **prayer/page.tsx**: Prayer wall (/prayer)

### 📚 Data Layer (src/lib/)
Handles data fetching & CMS communication:
- **sanity.ts**: Client setup & image URL builder
- **queries.ts**: All GROQ queries for content

### 📦 Schema Layer (sanity/)
Defines content structure in Sanity CMS:
- **sermon.ts**: How sermon data is structured
- **category.ts**: How categories are structured

### 🎨 Style Layer (src/globals.css)
Global styles, utilities, and Tailwind directives:
- Font imports
- Color variables
- Button utilities (.btn-primary, .btn-secondary)
- Card styles
- Animations

### ⚙️ Config Layer (Root)
Configuration for all tools:
- **tailwind.config.ts**: Colors, fonts, custom utilities
- **next.config.js**: Next.js settings (images, etc)
- **tsconfig.json**: TypeScript strict mode settings
- **package.json**: Dependencies & scripts

---

## Data Flow Diagram

```
User Browser
    ↓
Next.js App (src/app/)
    ↓
Components (src/components/)
    ↓
Libraries (src/lib/)
    ↓
Sanity Queries
    ↓
Sanity.io (CMS)
    ↓
Returns JSON
    ↓
Component Renders
    ↓
User Sees Content
```

## How Files Work Together

### Adding a New Page Example

1. Create file: `src/app/about/page.tsx`
2. It inherits layout from `src/app/layout.tsx`
3. Can import components from `src/components/`
4. Can fetch data using `src/lib/queries.ts` functions
5. Use types from `src/types/index.ts`
6. Style with Tailwind (defined in `tailwind.config.ts`)
7. Global styles applied via `src/globals.css`

### Displaying a Sermon Example

1. Query content via `src/lib/queries.ts` (getFeaturedSermons)
2. Loop through results in `src/app/page.tsx`
3. Pass to `src/components/MediaCard.tsx`
4. Card displays thumbnail, title, info
5. On click, navigates to `/sermons/[slug]/page.tsx`
6. Detail page fetches full content via `getSermonBySlug`
7. Uses `SermonContentDisplay.tsx` to render video/audio/text

---

## File Naming Conventions

### Components
- **Name**: PascalCase (e.g., `Navbar.tsx`)
- **Content**: React functional components
- **With state**: Add `'use client'` directive
- **Export**: Named exports for flexibility

### Pages
- **Name**: lowercase or [dynamic] (e.g., `page.tsx`, `[slug]`)
- **Location**: `src/app/` directory
- **Content**: Default export of React component
- **Naming**: Exact filename is the route path

### Libraries
- **Name**: camelCase (e.g., `sanity.ts`, `queries.ts`)
- **Content**: Utility functions, not components
- **Export**: Usually default or named exports
- **Usage**: Import in components/pages

### Types
- **Name**: Any (usually `index.ts`)
- **Content**: Interfaces, types, enums
- **Export**: Named exports
- **Usage**: Import { Type } from '@/types'

### Schemas
- **Name**: singular (e.g., `sermon.ts`, `category.ts`)
- **Content**: Sanity schema definitions
- **Export**: Named exports in schema files
- **Aggregation**: Collected in `index.ts`

---

## Module Aliases

In `tsconfig.json`, path aliases are configured:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

This allows clean imports:
```typescript
// Instead of:
import { Hero } from '../../../components/Hero'

// You can write:
import { Hero } from '@/components/Hero'
```

---

## Build Output

After `npm run build`, generated files include:

```
.next/
├── static/          # JavaScript bundles
├── standalone/      # Self-contained app
└── ...
```

These are gitignored and generated on each build.

---

## Size Reference

| File | Approx Size | Type |
|------|-----------|------|
| src/components/Navbar.tsx | ~5KB | Component |
| src/app/page.tsx | ~6KB | Page |
| src/globals.css | ~4KB | Stylesheet |
| tailwind.config.ts | ~1KB | Config |
| package.json | ~1KB | Config |

*Total source: ~100KB (minified: ~30KB)*

---

## Next Steps

1. **Setup**: Install dependencies (`npm install`)
2. **Configure**: Copy `.env.example` to `.env.local`
3. **Sanity**: Create project and add credentials
4. **Develop**: Run `npm run dev`
5. **Customize**: Edit colors in `tailwind.config.ts`
6. **Content**: Add sermons in Sanity Studio
7. **Deploy**: Push to Vercel

---

**Need help finding a specific file?** Use your IDE's search (Cmd+P in VS Code).
