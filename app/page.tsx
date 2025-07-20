
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Users, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FeaturedProducts } from '@/components/home/featured-products'
import { WorkshopPreview } from '@/components/home/workshop-preview'
import { useRef } from 'react'

const features = [
  {
    icon: Sparkles,
    title: 'Handcrafted Excellence',
    description: 'Each piece is meticulously crafted by skilled artisans using traditional techniques passed down through generations.',
  },
  {
    icon: Users,
    title: 'Learn & Create',
    description: 'Join our workshops to discover the meditative art of pottery and create your own unique ceramic pieces.',
  },
  {
    icon: Award,
    title: 'Timeless Quality',
    description: 'Our ceramics are built to last, combining functional design with artistic beauty for everyday use.',
  },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced Gallery Style */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <div className="relative w-full h-[120vh] bg-ceramic-100">
            <Image
              src="https://i.pinimg.com/originals/56/10/36/5610360986c59c7c2a21bde6d2c1c3f4.jpg"
              alt="Sonmade Ceramics Studio"
              fill
              className="object-cover"
              priority
            />
            {/* Artistic overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10" />
          </div>
        </motion.div>

        {/* Content with enhanced typography */}
        <motion.div 
          className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-8xl font-playfair font-light text-white mb-8 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2 }}
            >
              Handcrafted
              <motion.span 
                className="block font-medium italic text-beige-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
              >
                ceramics
              </motion.span>
              <motion.span 
                className="block text-4xl sm:text-5xl lg:text-6xl font-light mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                for mindful living
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Discover unique pottery pieces that bring beauty and intention to your daily rituals. 
              Each creation tells a story of artisanal craftsmanship.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Link href="/shop">
                <Button size="lg" className="bg-white text-ceramic-900 hover:bg-beige-100 px-12 py-4 text-lg font-medium rounded-none border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  Explore Collection
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/workshops">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-ceramic-900 px-12 py-4 text-lg font-medium rounded-none backdrop-blur-sm bg-white/10">
                  Join a Workshop
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="w-8 h-14 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div 
              className="w-1.5 h-4 bg-white/80 rounded-full mt-3"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section - Enhanced Gallery Style */}
      <section className="py-32 lg:py-40 bg-gradient-to-b from-ceramic-50 to-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-ceramic-900" />
          <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-beige-400" />
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
              Why Choose
              <span className="block font-medium italic text-ceramic-700">Sonmade</span>
            </h2>
            <p className="text-xl text-ceramic-600 max-w-3xl mx-auto leading-relaxed">
              Our commitment to quality, craftsmanship, and community sets us apart
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-none overflow-hidden">
                  <CardContent className="p-12 text-center relative">
                    {/* Subtle background accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ceramic-700 to-beige-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    
                    <div className="w-20 h-20 bg-gradient-to-br from-beige-100 to-ceramic-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-10 w-10 text-ceramic-700" />
                    </div>
                    <h3 className="text-2xl font-playfair font-medium text-ceramic-900 mb-6">
                      {feature.title}
                    </h3>
                    <p className="text-ceramic-600 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* About Section - Enhanced with larger imagery */}
      <section className="py-32 lg:py-40 bg-gradient-to-b from-beige-50 to-ceramic-50 relative">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl lg:text-6xl font-playfair font-light text-ceramic-900 mb-8 tracking-tight">
                Our
                <span className="block font-medium italic text-ceramic-700">Story</span>
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-ceramic-600 leading-relaxed">
                  Founded with a passion for the ancient art of ceramics, Sonmade represents 
                  a return to mindful creation. Every piece begins as raw clay and transforms 
                  through fire into functional art.
                </p>
                <p className="text-xl text-ceramic-600 leading-relaxed">
                  We believe in the power of handmade objects to bring joy, beauty, and 
                  intention to everyday moments. Our studio is a place where tradition 
                  meets contemporary design.
                </p>
              </div>
              <motion.div className="mt-10">
                <Link href="/about">
                  <Button variant="outline" size="lg" className="px-10 py-4 text-lg rounded-none border-2 border-ceramic-900 hover:bg-ceramic-900 hover:text-white transition-all duration-300">
                    Learn More About Us
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative">
                {/* Main image */}
                <div className="aspect-[3/4] relative rounded-none overflow-hidden shadow-2xl">
                  <Image
                    src="https://thumbs.dreamstime.com/b/potter-shaping-clay-pottery-wheel-close-up-potter-s-hands-expertly-shaping-clay-pot-spinning-pottery-wheel-322304723.jpg"
                    alt="Potter at work"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Floating accent image */}
                <motion.div 
                  className="absolute -bottom-8 -left-8 w-32 h-32 rounded-none overflow-hidden shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="https://i.pinimg.com/originals/8e/63/1d/8e631d20699a1544e9af58d3d678171c.jpg"
                    alt="Ceramic tools"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workshop Preview */}
      <WorkshopPreview />

      {/* CTA Section - Enhanced */}
      <section className="py-32 lg:py-40 bg-ceramic-900 text-ceramic-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-beige-200" />
        </div>
        
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-6xl font-playfair font-light mb-8 tracking-tight">
              Ready to start your
              <span className="block font-medium italic text-beige-200">ceramic journey?</span>
            </h2>
            <p className="text-xl text-ceramic-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Whether you're looking for the perfect piece for your home or want to 
              learn the art of pottery, we're here to help you discover the beauty of ceramics.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/shop">
                <Button size="lg" variant="secondary" className="px-12 py-4 text-lg rounded-none bg-white text-ceramic-900 hover:bg-beige-100">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-12 py-4 text-lg rounded-none border-2 border-ceramic-300 text-ceramic-100 hover:bg-white hover:text-ceramic-900">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
