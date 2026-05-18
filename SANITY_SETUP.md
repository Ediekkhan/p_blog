# Sanity Setup Guide

## Step 1: Create a Sanity Project

### Option A: Using Sanity CLI
```bash
npm install -g @sanity/cli
sanity init

# Follow the prompts:
# - Create new project
# - Choose a dataset (default: 'production')
# - Select project template: "Blank project"
```

### Option B: Using Sanity Dashboard
1. Go to [sanity.io](https://www.sanity.io)
2. Sign in or create an account
3. Create a new project
4. Note your **Project ID**

## Step 2: Update Environment Variables

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your_project_id_here` with your actual project ID from Sanity dashboard.

## Step 3: Update Sanity Config

Edit `sanity.config.ts`:

```typescript
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'pastor-brand-website',
  title: 'Pastor Brand Website',
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

## Step 4: Deploy Schemas to Sanity

First, login to Sanity CLI:

```bash
npx sanity login
```

This will open a browser for authentication. Follow the prompts to login.

Then deploy the schemas:

```bash
npx sanity deploy
```

Go to your Sanity dashboard → Schemas tab to verify schemas are uploaded.

## Step 5: Access Sanity Studio

### Local Development
```bash
npm run sanity start
# or
cd sanity && sanity start
```

Opens at `http://localhost:3333`

### Production
Sanity Studio is deployed to: `https://your-project-id.sanity.studio/`

## Step 6: Create Content

### Add a Category

1. Open Sanity Studio
2. Click "+" or Create New
3. Select "Category"
4. Fill in:
   - **Name**: e.g., "Sermons" or "Messages"
   - **Slug**: Auto-generated from Name
   - **Description**: Overview of the category
   - **Order**: Lower number = appears first
5. Click "Publish"

### Add a Sermon

1. Open Sanity Studio
2. Click "+" or Create New
3. Select "Sermon"
4. Fill in required fields:
   - **Title**: Sermon title
   - **Category**: Select from dropdown
   - **Date**: Sermon date
   - **Content Type**: Choose one:
     - Video (YouTube/Vimeo)
     - Audio (MP3/Podcast)
     - Text (Devotional)

#### For Video:
- Add YouTube or Vimeo URL
- Add thumbnail image
- Optional: speaker name, duration

#### For Audio:
- Option 1: Upload MP3 file via "Upload Audio File"
- Option 2: Paste direct MP3 URL in "Audio File URL"
- Add thumbnail image
- Optional: speaker name, duration

#### For Text:
- Use rich text editor for content
- Add formatting, links, quotes
- Add thumbnail image
- Optional: speaker name

5. Check "Featured Sermon" to show on homepage
6. Click "Publish"

## Step 7: Test Your Site

```bash
npm run dev
```

1. Visit `http://localhost:3000`
2. You should see sermons on the home page
3. Click "Explore Sermons" to see the library
4. Check filtering and search functionality

## Connecting Video/Audio

### YouTube/Vimeo URLs
Use the full URL:
```
https://www.youtube.com/watch?v=VIDEO_ID
https://vimeo.com/VIDEO_ID
```

### MP3 URLs
Ensure URL is direct to file:
```
https://example.com/audio/sermon.mp3
https://cdn.example.com/episode.mp3
```

### Upload Options
- Sanity file upload: Click "Upload" button
- External CDN: Paste direct URL

## Portable Text (Rich Editing)

For text content, you can:
- **Headers**: H2, H3 styles
- **Lists**: Bullet and numbered lists
- **Formatting**: Bold, italic, code
- **Links**: Add clickable links
- **Blocks**: Quotes with block quote style

Example structure:
```
[{
  "_type": "block",
  "style": "h2",
  "children": [{"text": "Main Point"}]
}, {
  "_type": "block",
  "children": [{"text": "Supporting paragraph..."}]
}]
```

## Media Management

### Images
- Use the **Metadata** tab to set focal point
- Drag the circle to mark important area
- Helps with automatic cropping

### Hotspot
- Click image to set hotspot
- Useful for responsive crops

### File Organization
- Create descriptive filenames
- Use asset tags for organization
- Keep file sizes reasonable

## API Access

Once content is published, it's automatically accessible via GROQ queries:

```typescript
// Query all sermons
const sermons = await client.fetch(`
  *[_type == "sermon"] | order(date desc)
`)

// Query by category
const categorized = await client.fetch(`
  *[_type == "sermon" && category->slug.current == "messages"]
`)

// Query single item
const one = await client.fetch(`
  *[_type == "sermon" && slug.current == "my-sermon"][0]
`)
```

## Publishing Strategy

### Draft vs Published
- **Draft**: Save without publishing (private)
- **Publish**: Make live and accessible to frontend

### Scheduled Publishing
- Set publish date in "Publish" tab
- Content available only after scheduled time

### Unpublishing
- Click "Unpublish" to make private again
- Frontend won't show unpublished content

## CORS Configuration

If testing API from different origin:

1. Go to Sanity Dashboard
2. Settings > API
3. Add your domain to CORS origins

For development:
```
http://localhost:3000
http://localhost:3001
```

For production:
```
https://yourdomain.com
```

## Troubleshooting

### "Project not found"
- Verify Project ID in env variables
- Check no extra spaces or quotes

### Images not loading
- Ensure "Publish" is clicked
- Check CORS settings in Sanity
- Verify image asset exists

### Queries returning empty
- Confirm schema is deployed
- Check content is published (not just saved)
- Verify category/slug matches exactly

### Sanity Studio not loading locally
- Clear cache: `rm -rf .sanity`
- Reinstall: `npm install`
- Ensure `sanity.config.ts` has correct projectId

## Useful Resources

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/portable-text)
- [Sanity Schema API](https://www.sanity.io/docs/schema-types)

## Next Steps

1. Add more content types (Events, Testimonials, etc.)
2. Configure API tokens for restricted access
3. Set up webhooks for automated actions
4. Integrate analytics and monitoring

---

Your Sanity + Next.js setup is ready! 🚀
