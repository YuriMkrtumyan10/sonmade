
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Users, Calendar, MapPin, Star, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

interface Workshop {
  id: string
  title: string
  description: string
  type: string
  duration: number
  maxParticipants: number
  price: number
  images: string[]
  active: boolean
}

const features = [
  "All materials and tools provided",
  "Expert instruction and guidance", 
  "Take home your creations",
  "Small class sizes for personalized attention",
  "Refreshments included",
  "Certificate of completion"
]

export default function WorkshopDetailPage() {
  const params = useParams()
  const [workshop, setWorkshop] = useState<Workshop | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await fetch(`/api/workshops/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setWorkshop(data)
        }
      } catch (error) {
        console.error('Error fetching workshop:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchWorkshop()
    }
  }, [params.id])

  const handleBookWorkshop = () => {
    if (!workshop) return

    toast({
      title: "Booking initiated",
      description: `We'll contact you soon to confirm your booking for ${workshop.title}.`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ceramic-50 to-white py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="aspect-[4/3] bg-ceramic-200 animate-pulse" />
            <div className="space-y-6">
              <div className="h-12 bg-ceramic-200 animate-pulse" />
              <div className="h-6 bg-ceramic-200 animate-pulse" />
              <div className="h-6 bg-ceramic-200 animate-pulse w-3/4" />
              <div className="h-16 bg-ceramic-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!workshop) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ceramic-50 to-white py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-playfair font-medium text-ceramic-900 mb-6">
            Workshop not found
          </h1>
          <Link href="/workshops">
            <Button variant="outline" size="lg" className="px-8 py-3 rounded-none border-2 border-ceramic-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Workshops
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentImage = workshop.images[selectedImageIndex] || "https://as1.ftcdn.net/v2/jpg/06/16/93/34/1000_F_616933419_seQJT9F6WFUKzo6ncFLtvW0L3Fa76Ei6.jpg"

  return (
    <div className="min-h-screen bg-gradient-to-b from-ceramic-50 to-white">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-24 left-4 sm:left-8 z-40 bg-white/90 backdrop-blur-sm shadow-lg rounded-full"
      >
        <Link href="/workshops">
          <Button variant="ghost" size="lg" className="rounded-full w-14 h-14 p-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </motion.div>

      <div className="pt-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Images Section */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Main Image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-ceramic-50 shadow-2xl">
                <Image
                  src={currentImage}
                  alt={workshop.title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Workshop type badge */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-white/90 backdrop-blur-sm text-ceramic-700 text-sm font-medium px-4 py-2 rounded-full">
                    {workshop.type} Level
                  </Badge>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {workshop.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {workshop.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square relative overflow-hidden transition-all duration-300 ${
                        selectedImageIndex === index
                          ? 'ring-4 ring-ceramic-900 shadow-lg scale-105'
                          : 'hover:shadow-md hover:scale-102'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${workshop.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Workshop Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 lg:pt-8"
            >
              {/* Title and Price */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-playfair font-light text-ceramic-900 mb-6 leading-tight tracking-tight">
                  {workshop.title}
                </h1>
                <p className="text-4xl lg:text-5xl font-playfair font-medium text-ceramic-900">
                  ${workshop.price}
                </p>
              </div>

              {/* Workshop Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center text-ceramic-500">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="text-sm uppercase tracking-wider font-medium">Duration</span>
                  </div>
                  <p className="text-xl font-medium text-ceramic-900">{workshop.duration} hours</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-ceramic-500">
                    <Users className="h-5 w-5 mr-2" />
                    <span className="text-sm uppercase tracking-wider font-medium">Max Size</span>
                  </div>
                  <p className="text-xl font-medium text-ceramic-900">{workshop.maxParticipants} people</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-ceramic-500">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-sm uppercase tracking-wider font-medium">Location</span>
                  </div>
                  <p className="text-xl font-medium text-ceramic-900">Sonmade Studio</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-ceramic-500">
                    <Star className="h-5 w-5 mr-2" />
                    <span className="text-sm uppercase tracking-wider font-medium">Level</span>
                  </div>
                  <p className="text-xl font-medium text-ceramic-900">{workshop.type}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <Separator className="bg-ceramic-200 mb-6" />
                <p className="text-xl text-ceramic-600 leading-relaxed">
                  {workshop.description || "Immerse yourself in the ancient art of pottery in this hands-on workshop. Learn traditional techniques while expressing your creativity and take home beautiful, functional pieces you've created with your own hands."}
                </p>
              </div>

              {/* What's Included */}
              <div className="space-y-4">
                <h3 className="text-2xl font-playfair font-medium text-ceramic-900">What's Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-ceramic-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Workshop Button */}
              <div className="space-y-6 pt-6">
                <Button
                  size="lg"
                  onClick={handleBookWorkshop}
                  disabled={!workshop.active}
                  className="w-full bg-ceramic-900 hover:bg-ceramic-800 text-white px-8 py-4 text-lg rounded-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  {workshop.active ? 'Book This Workshop' : 'Currently Unavailable'}
                </Button>
                
                <p className="text-sm text-ceramic-500 text-center">
                  We'll contact you within 24 hours to confirm your booking and provide additional details.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Additional Information */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg rounded-none">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-ceramic-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-ceramic-700" />
                </div>
                <h3 className="text-xl font-playfair font-medium text-ceramic-900 mb-2">
                  Small Groups
                </h3>
                <p className="text-ceramic-600">
                  Intimate class sizes ensure personalized attention and guidance from our expert instructors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-none">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-ceramic-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-ceramic-700" />
                </div>
                <h3 className="text-xl font-playfair font-medium text-ceramic-900 mb-2">
                  All Inclusive
                </h3>
                <p className="text-ceramic-600">
                  Everything you need is provided - clay, tools, glazing, and firing. Just bring your creativity!
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-none">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-ceramic-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-ceramic-700" />
                </div>
                <h3 className="text-xl font-playfair font-medium text-ceramic-900 mb-2">
                  Take Home
                </h3>
                <p className="text-ceramic-600">
                  Leave with beautiful, functional pieces you've created, fired and ready to use.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
