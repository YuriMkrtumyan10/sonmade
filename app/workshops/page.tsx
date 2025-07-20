
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { WorkshopCard } from '@/components/workshops/workshop-card'

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

interface WorkshopSession {
  id: string
  startTime: string
  endTime: string
  availableSpots: number
}

const workshopTypes = [
  { value: 'all', label: 'All Workshops' },
  { value: 'POTTERY_WHEEL', label: 'Pottery Wheel' },
  { value: 'HAND_BUILDING', label: 'Hand Building' },
  { value: 'GLAZING', label: 'Glazing' },
  { value: 'SCULPTURE', label: 'Sculpture' },
  { value: 'BEGINNER_BASICS', label: 'Beginner Basics' },
]

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch('/api/workshops')
        if (response.ok) {
          const data = await response.json()
          setWorkshops(data)
          setFilteredWorkshops(data)
        }
      } catch (error) {
        console.error('Error fetching workshops:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkshops()
  }, [])

  useEffect(() => {
    let filtered = [...workshops]

    if (selectedType !== 'all') {
      filtered = filtered.filter(workshop => workshop.type === selectedType)
    }

    setFilteredWorkshops(filtered)
  }, [workshops, selectedType])

  if (loading) {
    return (
      <div className="min-h-screen bg-ceramic-50 py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-semibold text-ceramic-900 mb-4">
              Pottery Workshops
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="aspect-video bg-ceramic-200 rounded-lg mb-4" />
                <div className="h-4 bg-ceramic-200 rounded mb-2" />
                <div className="h-4 bg-ceramic-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ceramic-50 py-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-playfair font-semibold text-ceramic-900 mb-4">
            Pottery Workshops
          </h1>
          <p className="text-lg text-ceramic-600 max-w-2xl mx-auto">
            Learn the ancient art of pottery in our hands-on workshops. From beginner basics to advanced techniques, 
            discover the joy of creating with clay.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {workshopTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-ceramic-600">
            {filteredWorkshops.length} {filteredWorkshops.length === 1 ? 'workshop' : 'workshops'} available
          </p>
        </motion.div>

        {/* Workshops Grid */}
        {filteredWorkshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.map((workshop, index) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <WorkshopCard workshop={workshop} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Filter className="h-16 w-16 text-ceramic-400 mx-auto mb-4" />
            <h3 className="text-xl font-playfair font-semibold text-ceramic-900 mb-2">
              No workshops found
            </h3>
            <p className="text-ceramic-600 mb-6">
              Try adjusting your filters or check back later for new workshops
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedType('all')}
            >
              Show All Workshops
            </Button>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-white rounded-lg p-8 lg:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-playfair font-semibold text-ceramic-900 mb-4">
              What to Expect
            </h2>
            <p className="text-ceramic-600 max-w-2xl mx-auto">
              Our workshops are designed to be accessible for all skill levels while providing 
              a deep, hands-on learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-ceramic-700" />
              </div>
              <h3 className="text-lg font-playfair font-semibold text-ceramic-900 mb-2">
                Small Groups
              </h3>
              <p className="text-ceramic-600">
                Limited class sizes ensure personalized attention and guidance from our experienced instructors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-ceramic-700" />
              </div>
              <h3 className="text-lg font-playfair font-semibold text-ceramic-900 mb-2">
                Flexible Duration
              </h3>
              <p className="text-ceramic-600">
                Choose from 2-4 hour sessions that fit your schedule, from quick introductions to deep dives.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-ceramic-700" />
              </div>
              <h3 className="text-lg font-playfair font-semibold text-ceramic-900 mb-2">
                Regular Sessions
              </h3>
              <p className="text-ceramic-600">
                New sessions start regularly throughout the month, making it easy to find a time that works for you.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
