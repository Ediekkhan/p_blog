'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

export function Hero({
  title = 'Welcome to a Journey of Faith',
  subtitle = 'Discover inspiration, wisdom, and spiritual guidance through powerful sermons and resources.',
  ctaText = 'Explore Sermons',
  ctaLink = '/sermons',
}: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-br from-charcoal via-charcoal to-dark-gray text-off-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="container-custom py-20 md:py-32 relative z-10 flex items-center justify-center min-h-[600px] md:min-h-[700px]">
        <motion.div
          className="text-center max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Accent */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-1 w-12 bg-gold"></div>
            <span className="text-gold font-semibold tracking-wide uppercase text-sm">
              Welcome
            </span>
            <div className="h-1 w-12 bg-gold"></div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <Link
              href={ctaLink}
              className="btn-primary bg-gold hover:bg-opacity-90 text-charcoal group"
            >
              {ctaText}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/about"
              className="btn-secondary border-gold text-gold hover:bg-gold hover:text-charcoal"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gold font-semibold">Scroll to explore</span>
              <div className="w-1 h-6 border border-gold rounded-full p-1">
                <div className="w-full h-1 bg-gold rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
