import { getSermons, getCategories } from '@/lib/queries'
import SermonsClient from '@/components/SermonsClient'

export default async function SermonsPage() {
  const [sermons, categories] = await Promise.all([
    getSermons(),
    getCategories(),
  ])

  return <SermonsClient initialSermons={sermons} initialCategories={categories} />
}
