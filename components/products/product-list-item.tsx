
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Eye, ArrowRight } from 'lucide-react'
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

interface ProductListItemProps {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
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
      image: product.images[0] || "https://i.pinimg.com/originals/9a/81/2c/9a812ced30f0cb096aeab86ffae6becb.jpg",
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const imageUrl = product.images[0] || "https://i.pinimg.com/originals/e7/be/f8/e7bef805afeff5eac9613eed418d0f11.jpg"

  return (
    <motion.div
      className="group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden rounded-none">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="w-full sm:w-80 aspect-square sm:aspect-[4/5] relative overflow-hidden bg-ceramic-50 flex-shrink-0">
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
              
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
              />

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-ceramic-700 text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-2xl lg:text-3xl font-playfair font-medium text-ceramic-900 mb-4 group-hover:text-ceramic-700 transition-colors duration-300">
                  {product.name}
                </h3>
                
                <motion.div 
                  className="text-3xl lg:text-4xl font-playfair font-semibold text-ceramic-900 mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  ${product.price}
                </motion.div>

                <p className="text-ceramic-600 text-lg leading-relaxed mb-8">
                  Handcrafted with care and attention to detail, this piece brings both beauty and functionality to your space.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-ceramic-900 hover:bg-ceramic-800 text-white px-8 py-3 rounded-none"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-ceramic-900 text-ceramic-900 hover:bg-ceramic-900 hover:text-white px-8 py-3 rounded-none"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Quick View
                </Button>
                
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-ceramic-600 hover:text-ceramic-900 px-4 py-3"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* View Details Link */}
              <motion.div 
                className="mt-6 flex items-center text-ceramic-600 group-hover:text-ceramic-900 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <span className="text-sm uppercase tracking-wider font-medium">View Details</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
