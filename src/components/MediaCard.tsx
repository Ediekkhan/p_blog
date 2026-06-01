'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Play,
  Music,
  FileText,
  Calendar,
  User,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { Sermon } from '@/types'
import { urlFor } from '@/lib/sanity'

interface MediaCardProps {
  sermon: Sermon
  isCompact?: boolean
}

export function MediaCard({ sermon, isCompact = false }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getContentIcon = () => {
    switch (sermon.contentType) {
      case 'video':
        return <Play size={28} className="text-gold" />
      case 'audio':
        return <Music size={28} className="text-gold" />
      case 'text':
        return <FileText size={28} className="text-gold" />
      default:
        return null
    }
  }

  const getContentBadge = () => {
    switch (sermon.contentType) {
      case 'video':
        return 'Video'
      case 'audio':
        return 'Audio'
      case 'text':
        return 'Devotional'
      default:
        return sermon.contentType
    }
  }

  const formattedDate = new Date(sermon.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  if (isCompact) {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        className="card cursor-pointer"
      >
        <Link href={`/sermons/${sermon.slug.current}`}>
          <div className="space-y-4">
            {sermon.thumbnail && (
              <div className="relative h-40 w-full rounded-lg overflow-hidden bg-light-gray flex items-center justify-center">
                <Image
                  src={urlFor(sermon.thumbnail).url()}
                  alt={sermon.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center hover:bg-opacity-60 transition-all">
                  {getContentIcon()}
                </div>
              </div>
            )}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-serif text-lg font-semibold text-charcoal line-clamp-2 flex-1">
                  {sermon.title}
                </h3>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gold uppercase">
                  {getContentBadge()}
                </span>
                {sermon.duration && (
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock size={14} />
                    {sermon.duration} min
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={14} />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Full card view
  return (
    <motion.div
      whileHover={{ y: -12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="card overflow-hidden"
    >
      <Link href={`/sermons/${sermon.slug.current}`}>
        <div className="space-y-4">
          {/* Thumbnail */}
          {sermon.thumbnail && (
            <div className="relative h-56 w-full rounded-lg overflow-hidden bg-light-gray flex items-center justify-center">
              <Image
                src={urlFor(sermon.thumbnail).url()}
                alt={sermon.title}
                fill
                className="object-cover transition-transform duration-500"
                style={{
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                }}
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                animate={{ backgroundColor: isHovered ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)' }}
              >
                <motion.div
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {getContentIcon()}
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Content */}
          <div className="space-y-3">
            {/* Category and Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                  {sermon.category.name}
                </span>
                <span className="px-2 py-1 text-xs font-semibold bg-light-gray text-charcoal rounded">
                  {getContentBadge()}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-charcoal line-clamp-2">
              {sermon.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 line-clamp-3 text-sm md:text-base">
              {sermon.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 pt-2 border-t border-light-gray">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{formattedDate}</span>
              </div>

              {sermon.speaker && (
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>{sermon.speaker}</span>
                </div>
              )}

              {sermon.duration && (
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{sermon.duration} min</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
              className="pt-2"
            >
              <button className="text-gold font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Watch/Read Sermon
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
