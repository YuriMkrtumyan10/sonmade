
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/product-card'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: string
  featured: boolean
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products?featured=true&limit=6')
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-32 lg:py-40 bg-white relative">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-playfair font-light text-ceramic-900 mb-6 tracking-tight">
              Featured Collection
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-ceramic-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 lg:py-40 bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-beige-400" />
        <div className="absolute bottom-40 left-20 w-32 h-32 rounded-full bg-ceramic-700" />
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
            Featured
            <span className="block font-medium italic text-ceramic-700">Collection</span>
          </h2>
          <p className="text-xl text-ceramic-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most beloved pieces, each one carefully crafted to bring beauty to your space
          </p>
        </motion.div>

        {products.length > 0 ? (
          <>
            {/* Gallery-style grid with varied sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`
                    ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                    ${index === 2 ? 'lg:row-span-2' : ''}
                  `}
                >
                  <ProductCard product={product} featured={index < 3} />
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
              <Link href="/shop">
                <Button size="lg" variant="outline" className="px-12 py-4 text-lg rounded-none border-2 border-ceramic-900 hover:bg-ceramic-900 hover:text-white transition-all duration-300">
                  View All Products
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-ceramic-600 mb-8 text-xl">No featured products available at the moment.</p>
            <Link href="/shop">
              <Button size="lg" variant="outline" className="px-12 py-4 text-lg rounded-none border-2 border-ceramic-900">
                Browse All Products
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
