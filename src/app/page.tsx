import { getFeaturedSermons, getCategories } from '@/lib/queries'
import HomeClient from '@/components/HomeClient'

export default async function Home() {
  const [featuredSermons, categories] = await Promise.all([
    getFeaturedSermons(3),
    getCategories(),
  ])

  return <HomeClient featuredSermons={featuredSermons} categories={categories} />
}
