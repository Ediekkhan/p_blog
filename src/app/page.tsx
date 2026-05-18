"use client"; 

import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { MediaCard } from '@/components/MediaCard'
import { getFeaturedSermons, getCategories } from '@/lib/queries'
import { BookOpen, Users, Mic2 } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  // Fetch data on the server
  console.log('Server component: Fetching data...')
  const [featuredSermons, categories] = await Promise.all([
    getFeaturedSermons(3),
    getCategories(),
  ])
  console.log('Server component: Fetched sermons:', featuredSermons)
  console.log('Server component: Fetched categories:', categories)

  const stats = [
    {
      icon: Mic2,
      value: '150+',
      label: 'Sermons',
    },
    {
      icon: Users,
      value: '10K+',
      label: 'Community Members',
    },
    {
      icon: BookOpen,
      value: '50+',
      label: 'Resources',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        title="Welcome to a Journey of Faith"
        subtitle="Discover inspiration, wisdom, and spiritual guidance through powerful sermons and resources."
        ctaText="Explore Sermons"
        ctaLink="/sermons"
      />

      {/* Stats Section */}
      <section className="section-padding bg-off-white">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold to-transparent mb-4">
                    <Icon size={32} className="text-charcoal" />
                  </div>
                  <h3 className="font-serif text-4xl font-bold text-charcoal mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Sermons Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-12 bg-gold"></div>
              <span className="text-gold font-semibold tracking-wide uppercase text-sm">
                Our Latest
              </span>
              <div className="h-1 w-12 bg-gold"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Featured Sermons
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experience powerful messages that will inspire your faith journey and guide you
              towards spiritual growth.
            </p>
          </motion.div>

          {featuredSermons.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredSermons.map((sermon: any) => (
                <motion.div key={sermon._id} variants={itemVariants}>
                  <MediaCard sermon={sermon} isCompact={true} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No featured sermons found.</p>
              <p className="text-sm text-gray-500 mt-2">
                Debug: {featuredSermons.length} sermons loaded
              </p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/sermons" className="btn-primary">
              View All Sermons
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="section-padding bg-off-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal">
                Browse by Category
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categories.map((category: any) => (
                <motion.div
                  key={category._id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/sermons?category=${category.slug.current}`}>
                    <div className="card text-center hover:border-gold">
                      <div className="w-16 h-16 bg-gradient-to-br from-gold to-transparent rounded-lg mx-auto mb-4 flex items-center justify-center"></div>
                      <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-charcoal to-dark-gray text-off-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Join Our Faith Community
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Subscribe to get weekly sermons, prayer requests, and spiritual guidance delivered
              to your inbox.
            </p>
            <Link href="/contact" className="btn-primary">
              Get Connected
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
