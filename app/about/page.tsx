
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Leaf, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const values = [
  {
    icon: Heart,
    title: 'Passion for Craft',
    description: 'Every piece is created with love and dedication to the ancient art of ceramics.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Practice',
    description: 'We use eco-friendly materials and processes that respect our environment.',
  },
  {
    icon: Users,
    title: 'Community Focus',
    description: 'Building connections through shared creativity and learning experiences.',
  },
  {
    icon: Award,
    title: 'Quality Excellence',
    description: 'Committed to the highest standards of craftsmanship and durability.',
  },
]

const timeline = [
  {
    year: '2018',
    title: 'The Beginning',
    description: 'Started as a small home studio with a passion for creating beautiful, functional ceramics.',
  },
  {
    year: '2019',
    title: 'First Workshop',
    description: 'Opened our doors to the community, sharing the joy of pottery with our first students.',
  },
  {
    year: '2021',
    title: 'Studio Expansion',
    description: 'Moved to our current location, expanding our workspace and capabilities.',
  },
  {
    year: '2023',
    title: 'Online Presence',
    description: 'Launched our online store, bringing handcrafted ceramics to customers worldwide.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ceramic-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-playfair font-semibold text-ceramic-900 mb-6">
                Crafting beauty from
                <span className="block text-ceramic-700">earth and fire</span>
              </h1>
              <p className="text-lg text-ceramic-600 mb-8 leading-relaxed">
                At Sonmade Ceramics, we believe in the transformative power of clay. 
                Each piece tells a story of patience, skill, and the ancient dialogue 
                between artist and material.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/workshops">
                  <Button size="lg">
                    Join a Workshop
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" size="lg">
                    View Collection
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://thumbs.dreamstime.com/b/detailed-square-image-craftsperson-s-hands-shaping-clay-pottery-wheel-soft-studio-lighting-348246758.jpg"
                  alt="Ceramic artist at work"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-semibold text-ceramic-900 mb-6">
              Our Story
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-ceramic-600 leading-relaxed">
              <p>
                Sonmade Ceramics was born from a deep appreciation for the meditative 
                process of working with clay. What started as a personal journey of 
                discovery has grown into a community of makers and admirers of handcrafted beauty.
              </p>
              <p>
                Our founder, inspired by traditional pottery techniques from around the world, 
                established the studio with a vision to create pieces that honor both form and 
                function. Every creation reflects our commitment to quality, sustainability, 
                and the timeless appeal of handmade objects.
              </p>
              <p>
                Today, we continue to explore the endless possibilities of clay, sharing our 
                passion through workshops, custom pieces, and a carefully curated collection 
                that brings the warmth of handmade ceramics into homes worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-beige-50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-semibold text-ceramic-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-ceramic-600 max-w-2xl mx-auto">
              The principles that guide our work and shape every piece we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-ceramic-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-ceramic-700" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-ceramic-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-ceramic-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-semibold text-ceramic-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-ceramic-600 max-w-2xl mx-auto">
              From humble beginnings to a thriving creative community
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-ceramic-300 transform md:-translate-x-0.5"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-ceramic-700 rounded-full transform -translate-x-1.5 md:-translate-x-1.5"></div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="ml-12 md:ml-0">
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl font-playfair font-bold text-ceramic-700 mr-3">
                              {item.year}
                            </span>
                            <h3 className="text-lg font-playfair font-semibold text-ceramic-900">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-ceramic-600 leading-relaxed">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section className="py-20 lg:py-32 bg-ceramic-900 text-ceramic-50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src="https://i.pinimg.com/originals/8a/c7/c3/8ac7c3f478b884da844e92dfff35acd0.jpg"
                  alt="Sonmade Ceramics Studio"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-playfair font-semibold mb-6">
                Visit Our Studio
              </h2>
              <p className="text-lg text-ceramic-300 mb-6 leading-relaxed">
                Located in the heart of the creative district, our studio is a space 
                where tradition meets innovation. We welcome visitors to experience 
                the magic of ceramic creation firsthand.
              </p>
              <p className="text-lg text-ceramic-300 mb-8 leading-relaxed">
                Whether you're interested in commissioning a custom piece, joining 
                a workshop, or simply exploring our collection, we'd love to share 
                our passion for ceramics with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" variant="secondary">
                    Plan Your Visit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/workshops">
                  <Button size="lg" variant="outline" className="border-ceramic-300 text-ceramic-100 hover:bg-ceramic-800">
                    Book a Workshop
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
