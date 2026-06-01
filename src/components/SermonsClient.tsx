"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { MediaCard } from '@/components/MediaCard'
import { Sermon, Category } from '@/types'
import { Search } from 'lucide-react'

interface SermonsClientProps {
  initialSermons: Sermon[]
  initialCategories: Category[]
}

export default function SermonsClient({
  initialSermons,
  initialCategories,
}: SermonsClientProps) {
  const [allSermons] = useState<Sermon[]>(initialSermons)
  const [filteredSermons, setFilteredSermons] = useState<Sermon[]>(initialSermons)
  const [categories] = useState<Category[]>(initialCategories)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    let results = allSermons

    if (selectedCategory) {
      results = results.filter(
        (sermon) => sermon.category.slug.current === selectedCategory
      )
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (sermon) =>
          sermon.title.toLowerCase().includes(term) ||
          sermon.description.toLowerCase().includes(term) ||
          sermon.speaker?.toLowerCase().includes(term)
      )
    }

    setFilteredSermons(results)
  }, [allSermons, selectedCategory, searchTerm])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <>
      <Hero
        title="Sermon Library"
        subtitle="Explore our collection of powerful sermons featuring videos, audio, and devotional content."
        ctaText="Browse Sermons"
        ctaLink="#sermons"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search sermons by title, speaker, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 roundedlg border-2 border-light-gray focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 transition-all"
              />
            </div>

            {categories.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-charcoal">Filter by Category</h3>
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory('')}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${
                      selectedCategory === ''
                        ? 'bg-gold text-charcoal'
                        : 'bg-light-gray text-charcoal hover:bg-gold hover:text-white'
                    }`}
                  >
                    All Categories
                  </motion.button>

                  {categories.map((category) => (
                    <motion.button
                      key={category._id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.slug.current)}
                      className={`px-4 py-2 rounded-full font-semibold transition-all ${
                        selectedCategory === category.slug.current
                          ? 'bg-gold text-charcoal'
                          : 'bg-light-gray text-charcoal hover:bg-gold hover:text-white'
                      }`}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-gray-600">
              Showing {filteredSermons.length} of {allSermons.length} sermons
            </p>
          </motion.div>
        </div>
      </section>

      <section id="sermons" className="section-padding bg-off-white">
        <div className="container-custom">
          {filteredSermons.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">No sermons found.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('')
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredSermons.map((sermon) => (
                <motion.div key={sermon._id} variants={itemVariants}>
                  <MediaCard sermon={sermon} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
