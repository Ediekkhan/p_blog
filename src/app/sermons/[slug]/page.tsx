'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getSermonBySlug, getSermons } from '@/lib/queries'
import { SermonContentDisplay } from '@/components/SermonContentDisplay'
import { Sermon } from '@/types'
import { urlFor } from '@/lib/sanity'
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react'

interface PageProps {
  params: {
    slug: string
  }
}

export default function SermonDetailPage({ params }: PageProps) {
  const [sermon, setSermon] = useState<Sermon | null>(null)
  const [relatedSermons, setRelatedSermons] = useState<Sermon[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sermonData = await getSermonBySlug(params.slug)
        setSermon(sermonData)

        if (sermonData) {
          // Get related sermons from same category
          const allSermons = await getSermons()
          const related = allSermons
            .filter(
              (s: Sermon) =>
                s.category._id === sermonData.category._id && s._id !== sermonData._id
            )
            .slice(0, 3)
          setRelatedSermons(related)
        }
      } catch (error) {
        console.error('Error fetching sermon:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="container-custom section-padding flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gold border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (!sermon) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="container-custom section-padding text-center">
          <h1 className="text-3xl font-serif font-bold text-charcoal mb-4">Sermon not found</h1>
          <Link href="/sermons" className="btn-primary">
            Back to Sermons
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(sermon.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-off-white">
      {/* Back Button */}
      <div className="bg-white border-b border-light-gray sticky top-[72px] z-40">
        <div className="container-custom py-4">
          <Link
            href="/sermons"
            className="inline-flex items-center gap-2 text-gold hover:text-opacity-80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Sermons
          </Link>
        </div>
      </div>

      {/* Hero/Thumbnail */}
      {sermon.thumbnail && (
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden bg-charcoal">
          <Image
            src={urlFor(sermon.thumbnail).url()}
            alt={sermon.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
        </div>
      )}

      {/* Main Content */}
      <article className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                  {sermon.category.name}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">
                {sermon.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-700 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{formattedDate}</span>
                </div>

                {sermon.speaker && (
                  <div className="flex items-center gap-2">
                    <User size={20} />
                    <span>{sermon.speaker}</span>
                  </div>
                )}

                {sermon.duration && (
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>{sermon.duration} minutes</span>
                  </div>
                )}
              </div>

              {/* Share Button */}
              <button className="inline-flex items-center gap-2 text-gold hover:text-opacity-80 transition-colors mb-8">
                <Share2 size={18} />
                Share Sermon
              </button>
            </div>

            {/* Divider */}
            <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold to-transparent mb-12"></div>

            {/* Description */}
            {sermon.description && (
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-lg text-gray-700 leading-relaxed first-letter:text-2xl first-letter:font-bold first-letter:text-gold">
                  {sermon.description}
                </p>
              </div>
            )}

            {/* Content Display */}
            <div className="mb-16">
              <SermonContentDisplay sermon={sermon} />
            </div>

            {/* Related Sermons */}
            {relatedSermons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-20 pt-12 border-t border-light-gray"
              >
                <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">
                  More from {sermon.category.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedSermons.map((relatedSermon) => (
                    <Link
                      key={relatedSermon._id}
                      href={`/sermons/${relatedSermon.slug.current}`}
                      className="group"
                    >
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-light-gray">
                        {relatedSermon.thumbnail && (
                          <Image
                            src={urlFor(relatedSermon.thumbnail).url()}
                            alt={relatedSermon.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-gold transition-colors line-clamp-2">
                        {relatedSermon.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {new Date(relatedSermon.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="section-padding bg-charcoal text-off-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            More Spiritual Resources
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our collection of devotionals, prayer guides, and study materials.
          </p>
          <Link href="/resources" className="btn-primary">
            Explore Resources
          </Link>
        </div>
      </section>
    </div>
  )
}
