'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { PrayerWallForm } from '@/components/PrayerWallForm'
import { Hand, Heart, Users } from 'lucide-react'

export default function PrayerWallPage() {
  const benefits = [
    {
      icon: Heart,
      title: 'Spiritual Support',
      description: 'Join a community dedicated to lifting each other up in prayer.',
    },
    {
      icon: Hand,
      title: 'Shared Faith',
      description: 'Experience the power of collective intercession and unity.',
    },
    {
      icon: Users,
      title: 'Community Connection',
      description: 'Connect with others on their spiritual journeys.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Prayer Wall"
        subtitle="Share your prayer requests and experience the power of intercession within our faith community."
        ctaText="Submit a Prayer"
        ctaLink="#prayer-form"
      />

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <Icon size={40} className="text-gold mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Prayer Form Section */}
      <section id="prayer-form" className="section-padding bg-off-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-12 bg-gold"></div>
              <span className="text-gold font-semibold tracking-wide uppercase text-sm">
                Share Your Needs
              </span>
              <div className="h-1 w-12 bg-gold"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Submit Your Prayer Request
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your prayer matters. Share your request with our community, and let us lift you up
              in prayer. All submissions are treated with care and respect.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <PrayerWallForm />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-charcoal text-off-white">
        <div className="container-custom max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold">How the Prayer Wall Works</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gold text-lg mb-2">1. Submit Your Request</h3>
                <p className="text-gray-300">
                  Fill out the form above with your prayer request. You can choose to keep it
                  private or share it publicly with our community.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gold text-lg mb-2">2. Community Support</h3>
                <p className="text-gray-300">
                  Your request is added to our prayer list. Our community members will lift you
                  up in their prayers and intercession.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gold text-lg mb-2">3. Share Updates</h3>
                <p className="text-gray-300">
                  Feel free to reach out with prayer updates or testimonies of God&apos;s faithfulness
                  in your life.
                </p>
              </div>
            </div>

            <div className="bg-gold bg-opacity-10 border border-gold rounded-lg p-6 mt-8">
              <p className="text-off-white">
                <span className="font-semibold">Privacy Note:</span> We respect your privacy. All
                private prayer requests are kept confidential. Public requests may be shared in
                our prayer updates and communications.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
