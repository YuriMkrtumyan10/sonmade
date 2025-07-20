
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: string
}

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "https://img.freepik.com/premium-psd/pottery-ceramics-psd-white-background_670382-328767.jpg",
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const aspectRatio = featured ? 'aspect-[4/5]' : 'aspect-[4/5]'
  const imageUrl = product.images[0] || "https://i.pinimg.com/originals/e7/be/f8/e7bef805afeff5eac9613eed418d0f11.jpg"

  return (
    <motion.div
      className="group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-none">
          {/* Image Container - Enhanced Gallery Style */}
          <div className={`${aspectRatio} relative overflow-hidden bg-ceramic-50`}>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-ceramic-100 to-beige-100 animate-pulse" />
            )}
            
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Sophisticated overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
            />
            
            {/* Enhanced action buttons */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex space-x-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className="bg-white/95 hover:bg-white text-ceramic-900 shadow-lg backdrop-blur-sm rounded-full w-12 h-12 p-0"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className="bg-white/95 hover:bg-white text-ceramic-900 shadow-lg backdrop-blur-sm rounded-full w-12 h-12 p-0"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className="bg-white/95 hover:bg-white text-ceramic-900 shadow-lg backdrop-blur-sm rounded-full w-12 h-12 p-0"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-ceramic-700 text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
          </div>

          {/* Enhanced content section */}
          <div className="p-6 lg:p-8">
            <motion.h3 
              className="text-xl lg:text-2xl font-playfair font-medium text-ceramic-900 mb-3 line-clamp-2 group-hover:text-ceramic-700 transition-colors duration-300"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {product.name}
            </motion.h3>
            
            <div className="flex items-center justify-between">
              <motion.span 
                className="text-2xl lg:text-3xl font-playfair font-semibold text-ceramic-900"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                ${product.price}
              </motion.span>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-ceramic-900 text-ceramic-900 hover:bg-ceramic-900 hover:text-white rounded-none px-6 py-2"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
