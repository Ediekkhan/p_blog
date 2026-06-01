import { getSermonBySlug, getSermons } from '@/lib/queries'
import SermonDetailClient from '@/components/SermonDetailClient'
import { Sermon } from '@/types'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function SermonDetailPage({ params }: PageProps) {
  const sermon = await getSermonBySlug(params.slug)

  if (!sermon) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="container-custom section-padding text-center">
          <h1 className="text-3xl font-serif font-bold text-charcoal mb-4">Sermon not found</h1>
          <a href="/sermons" className="btn-primary">
            Back to Sermons
          </a>
        </div>
      </div>
    )
  }

  const allSermons = await getSermons()
  const relatedSermons = allSermons
    .filter(
      (s: Sermon) =>
        s.category._id === sermon.category._id && s._id !== sermon._id
    )
    .slice(0, 3)

  return <SermonDetailClient sermon={sermon} relatedSermons={relatedSermons} />
}
