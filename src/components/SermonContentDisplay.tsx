'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Sermon } from '@/types'
import { PortableText } from '@portabletext/react'

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-light-gray rounded-lg animate-pulse"></div>,
})

interface SermonContentDisplayProps {
  sermon: Sermon
}

export function SermonContentDisplay({ sermon }: SermonContentDisplayProps) {
  if (sermon.contentType === 'video' && sermon.videoUrl) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0">
            <ReactPlayer
              url={sermon.videoUrl}
              width="100%"
              height="100%"
              controls
              playing={false}
            />
          </div>
        </div>
      </div>
    )
  }

  if (sermon.contentType === 'audio' && (sermon.audioUrl || sermon.audioFile)) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-charcoal to-dark-gray rounded-xl p-8 shadow-lg">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gold rounded-full mb-4">
                <span className="text-charcoal text-4xl">🎙️</span>
              </div>
              <h2 className="text-2xl font-serif font-semibold text-off-white mb-2">
                {sermon.title}
              </h2>
              {sermon.speaker && (
                <p className="text-gold mb-4">By {sermon.speaker}</p>
              )}
              {sermon.duration && (
                <p className="text-gray-300">Duration: {sermon.duration} minutes</p>
              )}
            </div>

            <audio
              controls
              className="w-full h-12 rounded-lg"
              src={sermon.audioUrl || sermon.audioFile}
              style={{
                outline: 'none',
              }}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    )
  }

  if (sermon.contentType === 'text' && sermon.textContent) {
    return (
      <div className="w-full max-w-4xl mx-auto prose prose-lg max-w-none">
        <div className="prose-headings:font-serif prose-headings:text-charcoal prose-p:text-gray-700 prose-a:text-gold hover:prose-a:text-opacity-80 prose-strong:text-charcoal prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:pl-4 prose-blockquote:italic">
          <PortableText value={sermon.textContent} />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-light-gray rounded-xl text-center">
      <p className="text-gray-600">No content available for this sermon.</p>
    </div>
  )
}
