"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sermon } from '@/types'
import { SermonContentDisplay } from '@/components/SermonContentDisplay'
import { urlFor } from '@/lib/sanity'
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react'

interface SermonDetailClientProps {
  sermon: Sermon
  relatedSermons: Sermon[]
}

export default function SermonDetailClient({ sermon, relatedSermons }: SermonDetailClientProps) {
  const formattedDate = new Date(sermon.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-off-white">
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

      <article className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                  {sermon.category.name}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">
                {sermon.title}
              </h1>

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

              <button className="inline-flex items-center gap-2 text-gold hover:text-opacity-80 transition-colors mb-8">
                <Share2 size={18} />
                Share Sermon
              </button>
            </div>

            <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold to-transparent mb-12"></div>

            {sermon.description && (
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-lg text-gray-700 leading-relaxed first-letter:text-2xl first-letter:font-bold first-letter:text-gold">
                  {sermon.description}
                </p>
              </div>
            )}

            <div className="mb-16">
              <SermonContentDisplay sermon={sermon} />
            </div>

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

      <section className="section-padding bg-charcoal text-off-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">More Spiritual Resources</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our collection of devotionals, prayer guides, and study materials.
          </p>
          <Link href="/resources" className="btn-primary">Explore Resources</Link>
        </div>
      </section>
    </div>
  )
}
