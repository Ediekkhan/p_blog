import { getFeaturedSermons, getCategories } from '@/lib/queries'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('API Route: Fetching data...')
    const [sermons, categories] = await Promise.all([
      getFeaturedSermons(3),
      getCategories(),
    ])
    console.log('API Route: Fetched sermons:', sermons)
    console.log('API Route: Fetched categories:', categories)

    return NextResponse.json({
      sermons,
      categories,
      count: sermons.length
    })
  } catch (error) {
    console.error('API Route Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}