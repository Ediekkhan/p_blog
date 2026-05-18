'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { MediaCard } from '@/components/MediaCard'
import { getSermons, getCategories } from '@/lib/queries'
import { Sermon, Category } from '@/types'
import { Search } from 'lucide-react'

export default function SermonsPage() {
  const [allSermons, setAllSermons] = useState<Sermon[]>([])
  const [filteredSermons, setFilteredSermons] = useState<Sermon[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sermons, cats] = await Promise.all([
          getSermons(),
          getCategories(),
        ])
        setAllSermons(sermons)
        setFilteredSermons(sermons)
        setCategories(cats)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let results = allSermons

    // Filter by category
    if (selectedCategory) {
      results = results.filter(
        (sermon) => sermon.category.slug.current === selectedCategory
      )
    }

    // Filter by search term
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
  }, [selectedCategory, searchTerm, allSermons])

  const containerVariants = {
    hidden: { opacity: 0 },
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
      {/* Hero Section */}
      <Hero
        title="Sermon Library"
        subtitle="Explore our collection of powerful sermons featuring videos, audio, and devotional content."
        ctaText="Browse Sermons"
        ctaLink="#sermons"
      />

      {/* Filters Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search sermons by title, speaker, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 roundedlg border-2 border-light-gray focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 transition-all"
              />
            </div>

            {/* Category Filters */}
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

            {/* Results Count */}
            <p className="text-sm text-gray-600">
              Showing {filteredSermons.length} of {allSermons.length} sermons
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sermons Grid */}
      <section id="sermons" className="section-padding bg-off-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl h-96 animate-pulse"
                ></div>
              ))}
            </div>
          ) : filteredSermons.length === 0 ? (
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
