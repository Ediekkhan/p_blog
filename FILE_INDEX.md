# 📑 Complete File Index & Purpose Guide

## Start Here: Quick Navigation

| Need | Read This |
|------|-----------|
| **First time setup** | SANITY_SETUP.md |
| **Quick reference** | GETTING_STARTED.md |
| **Full details** | README.md |
| **Where are files?** | DIRECTORY_GUIDE.md |
| **How does it work?** | ARCHITECTURE.md |
| **Ready to launch?** | LAUNCH_CHECKLIST.md |
| **Big picture** | PROJECT_SUMMARY.md |
| **All files** | This document (FILE_INDEX.md) |

---

## 📂 Complete File Breakdown

### 🔧 Configuration Files (Root Level)

| File | Purpose | Customize |
|------|---------|-----------|
| `package.json` | Dependencies & scripts | ❌ No |
| `tsconfig.json` | TypeScript settings | ❌ No |
| `tailwind.config.ts` | Tailwind theme & colors | ✅ YES |
| `postcss.config.js` | PostCSS config | ❌ No |
| `next.config.js` | Next.js settings | ✅ Maybe |
| `.eslintrc.json` | ESLint rules | ❌ No |
| `.gitignore` | Git ignore patterns | ❌ No |
| `.env.example` | Environment template | ❌ No (copy to .env.local) |

### 📚 Documentation Files (Root Level)

| File | Purpose | Read When |
|------|---------|-----------|
| `README.md` | Complete guide & reference | Setting up for first time |
| `GETTING_STARTED.md` | Quick start guide | Starting development |
| `DIRECTORY_GUIDE.md` | File structure explanation | Finding files |
| `ARCHITECTURE.md` | Technical deep-dive | Understanding how it works |
| `SANITY_SETUP.md` | CMS configuration guide | Setting up Sanity |
| `LAUNCH_CHECKLIST.md` | Pre-launch verification | Before going live |
| `PROJECT_SUMMARY.md` | Project overview | Understanding what was built |
| `VISUAL_OVERVIEW.md` | Visual architecture | Seeing the big picture |
| `MANIFEST.md` | Project inventory | Complete file listing |
| `FILE_INDEX.md` | This file | Finding what you need |

### 🎨 Front-End Application Files

#### Styling (`src/`)

| File | Purpose | Customize |
|------|---------|-----------|
| `src/globals.css` | Global styles, utilities, animations | ✅ YES |

#### Application Entry Point (`src/app/`)

| File | Purpose | Customize |
|------|---------|-----------|
| `src/app/layout.tsx` | Root layout, Navbar + Footer | ✅ YES (title, OG tags) |
| `src/app/page.tsx` | Home page | ✅ YES (content) |

#### Sermon Pages (`src/app/sermons/`)

| File | Purpose | Customize |
|------|---------|-----------|
| `src/app/sermons/page.tsx` | Sermon listing with search | ⚠️ Maybe |
| `src/app/sermons/[slug]/page.tsx` | Individual sermon detail | ⚠️ Maybe |

#### Prayer Pages (`src/app/prayer/`)

| File | Purpose | Customize |
|------|---------|-----------|
| `src/app/prayer/page.tsx` | Prayer Wall page | ⚠️ Maybe |

#### UI Components (`src/components/`)

| File | Purpose | Customize |
|------|---------|-----------|
| `src/components/Navbar.tsx` | Navigation bar | ✅ YES (links, logo) |
| `src/components/Footer.tsx` | Footer section | ✅ YES (contact, links) |
| `src/components/Hero.tsx` | Hero banner | ✅ YES (text, CTA) |
| `src/components/MediaCard.tsx` | Sermon card component | ⚠️ Maybe |
| `src/components/PrayerWallForm.tsx` | Prayer form | ⚠️ Maybe |
| `src/components/SermonContentDisplay.tsx` | Content player | ⚠️ Maybe |
| `src/components/index.ts` | Component exports | ❌ No |

#### Libraries (`src/lib/`)

| File | Purpose | Customize |
|------|---------|-----------|
| `src/lib/sanity.ts` | Sanity client setup | ❌ No |
| `src/lib/queries.ts` | GROQ query functions | ⚠️ Maybe (add queries) |

#### Type Definitions (`src/types/`)

| File | Purpose | Customize |
|------|---------|-----------|
| `src/types/index.ts` | TypeScript interfaces | ⚠️ Maybe (add types) |

### 🎯 CMS Configuration Files

#### Sanity Config (`sanity/`)

| File | Purpose | Customize |
|------|---------|-----------|
| `sanity.config.ts` | CMS configuration | ❌ No |

#### Sanity Schemas (`sanity/schemas/`)

| File | Purpose | Customize |
|------|---------|-----------|
| `sanity/schemas/sermon.ts` | Sermon content type | ✅ YES (add fields) |
| `sanity/schemas/category.ts` | Category content type | ✅ YES (add fields) |
| `sanity/schemas/index.ts` | Schema exports | ❌ No |

### 📂 Static Files

| Path | Purpose |
|------|---------|
| `public/` | Static assets, favicon, images |
| `node_modules/` | Dependencies (not committed) |
| `.next/` | Build output (not committed) |

---

## 🎯 Files by Purpose

### I Want to Change Colors
✅ Edit: `tailwind.config.ts`
- Define custom colors
- Update color names

✅ Also Edit: `src/globals.css`
- Update CSS variables
- Change utility classes

### I Want to Update Logo
✅ Edit: `src/components/Navbar.tsx`
- Replace logo element
- Update logo styling

### I Want to Change Footer Info
✅ Edit: `src/components/Footer.tsx`
- Update contact details
- Change social links
- Modify navigation

### I Want to Change Hero Text
✅ Edit: `src/app/page.tsx`
- Update Hero component props
- Change CTA text/link

### I Want to Add New Page
✅ Create: `src/app/[new-page]/page.tsx`
- Add new page component
- Import Hero, Footer (auto-included)
- Style with Tailwind

### I Want to Add CMS Content Types
✅ Create: `sanity/schemas/[new-type].ts`
✅ Edit: `sanity/schemas/index.ts` (add export)
✅ Deploy: `npm run sanity deploy`

### I Want to Change Fonts
✅ Edit: `src/app/layout.tsx`
- Import different font
- Update font variable

✅ Edit: `tailwind.config.ts`
- Update font-family mapping

### I Want to Add API Route
✅ Create: `src/app/api/[route]/route.ts`
- Add GET, POST, PUT, DELETE handlers
- Return JSON responses

---

## 📊 File Size Reference

| File | Size | Type |
|------|------|------|
| `src/components/Navbar.tsx` | ~4KB | Component |
| `src/app/page.tsx` | ~6KB | Page |
| `src/globals.css` | ~4KB | Stylesheet |
| `tailwind.config.ts` | ~1KB | Config |
| `sanity/schemas/sermon.ts` | ~5KB | Schema |
| **Total Source** | ~100KB | All files |
| **After Build** | ~50KB | Minified/optimized |

---

## 🔄 File Dependencies

```
app/layout.tsx (Root)
├── globals.css
├── tailwind.config.ts
└── components/
    ├── Navbar.tsx
    └── Footer.tsx

app/page.tsx (Home)
├── components/Hero.tsx
├── components/MediaCard.tsx
├── lib/queries.ts
├── lib/sanity.ts
└── types/index.ts

app/sermons/page.tsx (List)
├── components/MediaCard.tsx
├── components/Hero.tsx
├── lib/queries.ts
└── types/index.ts

app/sermons/[slug]/page.tsx (Detail)
├── components/SermonContentDisplay.tsx
├── lib/queries.ts
└── types/index.ts

app/prayer/page.tsx (Prayer Wall)
├── components/PrayerWallForm.tsx
├── components/Hero.tsx
└── types/index.ts

sanity.config.ts (CMS)
├── sanity/schemas/sermon.ts
├── sanity/schemas/category.ts
└── sanity/schemas/index.ts

lib/queries.ts (Data Fetching)
└── lib/sanity.ts

components/*.tsx (Components)
├── types/index.ts
├── lib/sanity.ts
└── lib/queries.ts
```

---

## ✅ Files Needed to Remove (If Customizing)

If you want to remove features, delete these:

| Feature | Delete File |
|---------|------------|
| Prayer Wall | `src/app/prayer/` |
| Search on Sermons | Edit `src/app/sermons/page.tsx` |
| Featured Sermons | Edit `src/app/page.tsx` |
| Categories | Edit `sanity/schemas/category.ts` |

---

## 📝 Common Edit Locations

### Quick Edits
- **Site Title**: `src/app/layout.tsx` (metadata)
- **Hero Text**: `src/app/page.tsx` (Hero props)
- **Logo**: `src/components/Navbar.tsx` (div element)
- **Footer Email**: `src/components/Footer.tsx`
- **Colors**: `tailwind.config.ts` (colors object)
- **Fonts**: `src/app/layout.tsx` (imports)

### Advanced Edits
- **New Page**: Create `src/app/[name]/page.tsx`
- **New Component**: Create `src/components/[Name].tsx`
- **New Content Type**: Create `sanity/schemas/[type].ts`
- **New Query**: Add to `src/lib/queries.ts`
- **New Type**: Add to `src/types/index.ts`

---

## 🚀 Deployment Checklist

Files to verify before deploy:

- [ ] `.env.local` has Sanity credentials
- [ ] `src/app/layout.tsx` metadata updated
- [ ] `src/components/Footer.tsx` contact info updated
- [ ] `tailwind.config.ts` colors match brand
- [ ] `sanity/schemas/` deployed
- [ ] Content created in Sanity Studio
- [ ] `npm run build` completes successfully
- [ ] All links verified in preview

---

## 📊 File Organization Principles

### Frontend (src/app)
- **One-to-one mapping**: Each page file = one route
- **Dynamic routes**: Use [brackets] for dynamic segments
- **Layouts**: Inherited from parent directories

### Components (src/components)
- **Reusable**: Used across multiple pages
- **Focused**: One purpose per component
- **Configurable**: Props for customization

### Libraries (src/lib)
- **Utilities**: Helper functions, no JSX
- **Data**: API clients, queries
- **Pure**: No side effects, testable

### Types (src/types)
- **Data Models**: TypeScript interfaces
- **Exports**: Named exports for easy imports
- **Centralized**: Single source of truth

### Schemas (sanity/schemas)
- **Content Types**: Each file = one document type
- **Structure**: Define with defineType/defineField
- **Validation**: Rules built-in

---

## 🎓 Learning Path

**Start Here (Read in Order):**
1. `README.md` - Get the big picture
2. `SANITY_SETUP.md` - Setup your CMS
3. `DIRECTORY_GUIDE.md` - Understand structure
4. `src/app/page.tsx` - See how pages work
5. `src/components/Navbar.tsx` - See how components work
6. `tailwind.config.ts` - See how styles work
7. `ARCHITECTURE.md` - Deep dive

**Then Customize:**
1. Change colors in `tailwind.config.ts`
2. Update logo in `Navbar.tsx`
3. Change hero text in `page.tsx`
4. Add your content in Sanity
5. Deploy to Vercel

---

## 🔍 Quick File Finder

Can't find something? Search for:

| Looking For | File Name Pattern |
|-------------|-------------------|
| Page | `src/app/*/page.tsx` |
| Component | `src/components/*.tsx` |
| Style | `src/globals.css` |
| Colors | `tailwind.config.ts` |
| Content Type | `sanity/schemas/*.ts` |
| Query | `src/lib/queries.ts` |
| Type | `src/types/index.ts` |
| Config | Root `*.config.ts` or `package.json` |

---

## 📞 Support Guide

| Need | File |
|------|------|
| Setup help | SANITY_SETUP.md |
| Usage help | README.md |
| Customization | GETTING_STARTED.md |
| File locations | DIRECTORY_GUIDE.md |
| Architecture | ARCHITECTURE.md |
| Launch help | LAUNCH_CHECKLIST.md |

---

**You now have a complete reference guide to every file in the project!** 🎉

Check FILE_INDEX.md whenever you need to find something.
