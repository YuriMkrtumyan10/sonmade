
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Users, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Workshop {
  id: string
  title: string
  description: string
  type: string
  duration: number
  maxParticipants: number
  price: number
  images: string[]
}

export function WorkshopPreview() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch('/api/workshops?limit=3')
        if (response.ok) {
          const data = await response.json()
          setWorkshops(data)
        }
      } catch (error) {
        console.error('Error fetching workshops:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkshops()
  }, [])

  if (loading) {
    return (
      <section className="py-32 lg:py-40 bg-gradient-to-b from-ceramic-100 to-beige-50 relative overflow-hidden">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-playfair font-light text-ceramic-900 mb-6 tracking-tight">
              Pottery Workshops
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white shadow-lg p-8 animate-pulse">
                <div className="aspect-[4/3] bg-ceramic-200 mb-6" />
                <div className="h-6 bg-ceramic-200 mb-4" />
                <div className="h-4 bg-ceramic-200 mb-2" />
                <div className="h-4 bg-ceramic-200 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 lg:py-40 bg-gradient-to-b from-ceramic-100 to-beige-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-ceramic-900" />
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-beige-400" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-ceramic-700" />
      </div>
      
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-6xl font-playfair font-light text-ceramic-900 mb-6 tracking-tight">
            Pottery
            <span className="block font-medium italic text-ceramic-700">Workshops</span>
          </h2>
          <p className="text-xl text-ceramic-600 max-w-3xl mx-auto leading-relaxed">
            Learn the ancient art of pottery in our hands-on workshops. Perfect for beginners and experienced potters alike.
          </p>
        </motion.div>

        {workshops.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {workshops.map((workshop, index) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-none overflow-hidden">
                    {/* Enhanced Image */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={workshop.images[0] || "https://as1.ftcdn.net/v2/jpg/06/16/93/34/1000_F_616933419_seQJT9F6WFUKzo6ncFLtvW0L3Fa76Ei6.jpg"}
                        alt={workshop.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Type badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-ceramic-700 text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full">
                          {workshop.type}
                        </span>
                      </div>
                      
                      {/* Price overlay */}
                      <div className="absolute bottom-4 right-4 bg-ceramic-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                        <span className="text-lg font-playfair font-semibold">${workshop.price}</span>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <h3 className="text-2xl font-playfair font-medium text-ceramic-900 mb-4 group-hover:text-ceramic-700 transition-colors duration-300">
                        {workshop.title}
                      </h3>
                      
                      <p className="text-ceramic-600 mb-6 line-clamp-3 leading-relaxed">
                        {workshop.description || "Discover the joy of creating with clay in this immersive workshop experience. Learn traditional techniques while expressing your creativity."}
                      </p>
                      
                      {/* Workshop details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-ceramic-500">
                          <Clock className="h-5 w-5 mr-3 text-ceramic-400" />
                          <span className="text-sm font-medium">{workshop.duration} hours</span>
                        </div>
                        <div className="flex items-center text-ceramic-500">
                          <Users className="h-5 w-5 mr-3 text-ceramic-400" />
                          <span className="text-sm font-medium">Max {workshop.maxParticipants} participants</span>
                        </div>
                        <div className="flex items-center text-ceramic-500">
                          <MapPin className="h-5 w-5 mr-3 text-ceramic-400" />
                          <span className="text-sm font-medium">Sonmade Studio</span>
                        </div>
                      </div>

                      {/* Action button */}
                      <Link href={`/workshops/${workshop.id}`}>
                        <Button 
                          className="w-full bg-ceramic-900 hover:bg-ceramic-800 text-white py-3 rounded-none group-hover:shadow-lg transition-all duration-300"
                          size="lg"
                        >
                          Book Workshop
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link href="/workshops">
                <Button size="lg" variant="outline" className="px-12 py-4 text-lg rounded-none border-2 border-ceramic-900 hover:bg-ceramic-900 hover:text-white transition-all duration-300">
                  View All Workshops
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </>
        ) : (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-md mx-auto">
              <Calendar className="h-20 w-20 text-ceramic-400 mx-auto mb-6" />
              <h3 className="text-2xl font-playfair font-medium text-ceramic-900 mb-4">
                No workshops available
              </h3>
              <p className="text-ceramic-600 mb-8 text-lg leading-relaxed">
                We're preparing exciting new workshops. Contact us to be notified when they're available.
              </p>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 py-3 rounded-none border-2 border-ceramic-900 hover:bg-ceramic-900 hover:text-white">
                  Contact Us for Updates
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
