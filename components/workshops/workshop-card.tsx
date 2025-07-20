
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, Users, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface WorkshopSession {
  id: string
  startTime: string
  endTime: string
  availableSpots: number
}

interface Workshop {
  id: string
  title: string
  description: string
  type: string
  duration: number
  maxParticipants: number
  price: number
  images: string[]
  sessions: WorkshopSession[]
}

interface WorkshopCardProps {
  workshop: Workshop
}

const typeLabels: Record<string, string> = {
  POTTERY_WHEEL: 'Pottery Wheel',
  HAND_BUILDING: 'Hand Building',
  GLAZING: 'Glazing',
  SCULPTURE: 'Sculpture',
  BEGINNER_BASICS: 'Beginner Basics',
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const nextSession = workshop.sessions[0]
  const hasAvailableSpots = nextSession && nextSession.availableSpots > 0

  return (
    <motion.div
      className="group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        {/* Image */}
        <div className="aspect-video relative overflow-hidden bg-ceramic-100">
          <Image
            src={workshop.images[0] || "https://i.ytimg.com/vi/ZBiKhsy3EMY/maxresdefault.jpg"}
            alt={workshop.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-ceramic-900">
              {typeLabels[workshop.type] || workshop.type}
            </Badge>
          </div>

          {/* Availability Badge */}
          <div className="absolute top-4 right-4">
            <Badge 
              variant={hasAvailableSpots ? "default" : "destructive"}
              className={hasAvailableSpots ? "bg-green-600" : ""}
            >
              {hasAvailableSpots ? 'Available' : 'Fully Booked'}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-playfair font-semibold text-ceramic-900 mb-2 line-clamp-1">
            {workshop.title}
          </h3>
          
          <p className="text-ceramic-600 mb-4 line-clamp-2">
            {workshop.description}
          </p>
          
          {/* Workshop Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-ceramic-500">
              <Clock className="h-4 w-4 mr-2" />
              {workshop.duration} hours
            </div>
            <div className="flex items-center text-sm text-ceramic-500">
              <Users className="h-4 w-4 mr-2" />
              Max {workshop.maxParticipants} participants
            </div>
            {nextSession && (
              <div className="flex items-center text-sm text-ceramic-500">
                <Calendar className="h-4 w-4 mr-2" />
                Next: {new Date(nextSession.startTime).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-playfair font-semibold text-ceramic-900">
              ${workshop.price}
            </span>
            
            <Link href={`/workshops/${workshop.id}`}>
              <Button 
                size="sm"
                disabled={!hasAvailableSpots}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {hasAvailableSpots ? 'Book Now' : 'View Details'}
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </div>

          {/* Available Spots */}
          {nextSession && hasAvailableSpots && (
            <div className="mt-3 text-xs text-ceramic-500">
              {nextSession.availableSpots} spots remaining
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
