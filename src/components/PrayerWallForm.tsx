'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
// import { PrayerRequest } from '@/types'

const prayerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  prayer: z.string().min(10, 'Prayer request must be at least 10 characters').max(1000, 'Prayer request must not exceed 1000 characters'),
  category: z.enum(['healing', 'guidance', 'thanksgiving', 'intercession', 'other']),
  isPublic: z.boolean().default(false),
})

type PrayerFormData = z.infer<typeof prayerSchema>

export function PrayerWallForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PrayerFormData>({
    resolver: zodResolver(prayerSchema),
  })

  const onSubmit = async (data: PrayerFormData) => {
    try {
      setIsSubmitting(true)
      // API call would go here
      console.log('Prayer request submitted:', data)
      // await fetch('/api/prayers', { method: 'POST', body: JSON.stringify(data) })
      
      setSubmitSuccess(true)
      reset()
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting prayer:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const categoryOptions = [
    { value: 'healing', label: 'Healing' },
    { value: 'guidance', label: 'Guidance' },
    { value: 'thanksgiving', label: 'Thanksgiving' },
    { value: 'intercession', label: 'Intercession' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register('name')}
            className={`w-full px-4 py-3 rounded-lg border-2 font-sans transition-all ${
              errors.name
                ? 'border-red-500 focus:border-red-600'
                : 'border-light-gray focus:border-gold'
            } focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20`}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-lg border-2 font-sans transition-all ${
              errors.email
                ? 'border-red-500 focus:border-red-600'
                : 'border-light-gray focus:border-gold'
            } focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-charcoal mb-2">
            Prayer Category
          </label>
          <select
            id="category"
            {...register('category')}
            className="w-full px-4 py-3 rounded-lg border-2 border-light-gray focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 font-sans transition-all"
          >
            <option value="">Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Prayer Request Field */}
        <div>
          <label htmlFor="prayer" className="block text-sm font-semibold text-charcoal mb-2">
            Your Prayer Request
          </label>
          <textarea
            id="prayer"
            rows={5}
            placeholder="Share your prayer request here..."
            {...register('prayer')}
            className={`w-full px-4 py-3 rounded-lg border-2 font-sans resize-none transition-all ${
              errors.prayer
                ? 'border-red-500 focus:border-red-600'
                : 'border-light-gray focus:border-gold'
            } focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20`}
          />
          {errors.prayer && (
            <p className="text-red-600 text-sm mt-1">{errors.prayer.message}</p>
          )}
        </div>

        {/* Public Option */}
        <div className="flex items-center gap-3">
          <input
            id="isPublic"
            type="checkbox"
            {...register('isPublic')}
            className="w-5 h-5 accent-gold cursor-pointer"
          />
          <label htmlFor="isPublic" className="text-sm text-gray-700 cursor-pointer">
            Share this prayer publicly on the prayer wall (optional)
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Prayer
              </>
            )}
          </motion.button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <CheckCircle className="text-green-600" size={20} />
            <div>
              <p className="font-semibold text-green-900">Prayer submitted successfully!</p>
              <p className="text-sm text-green-800">Thank you for sharing your prayer request.</p>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
