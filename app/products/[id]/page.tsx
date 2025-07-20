
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ShoppingBag, Heart, Truck, Shield, RotateCcw, Plus, Minus, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'
import { useRef } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  inStock: boolean
  dimensions?: string
  materials?: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()
  
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "https://i.pinimg.com/originals/9a/81/2c/9a812ced30f0cb096aeab86ffae6becb.jpg",
      })
    }

    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`,
    })
  }

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10))
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ceramic-50 to-white py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="aspect-square bg-ceramic-200 animate-pulse" />
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ceramic-50 to-white py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-playfair font-medium text-ceramic-900 mb-6">
            Product not found
          </h1>
          <Link href="/shop">
            <Button variant="outline" size="lg" className="px-8 py-3 rounded-none border-2 border-ceramic-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentImage = product.images[selectedImageIndex] || "https://i.pinimg.com/originals/e7/be/f8/e7bef805afeff5eac9613eed418d0f11.jpg"

  return (
    <div className="min-h-screen bg-gradient-to-b from-ceramic-50 to-white">
      {/* Back Button - Fixed */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-24 left-4 sm:left-8 z-40 bg-white/90 backdrop-blur-sm shadow-lg rounded-full"
      >
        <Link href="/shop">
          <Button variant="ghost" size="lg" className="rounded-full w-14 h-14 p-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </motion.div>

      <div className="pt-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Enhanced Images Section */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Main Image - Gallery Style */}
              <motion.div 
                className="aspect-square relative overflow-hidden bg-ceramic-50 shadow-2xl"
                style={{ y }}
              >
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-ceramic-100 to-beige-100 animate-pulse" />
                )}
                
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  priority
                  onLoad={() => setImageLoaded(true)}
                />
                
                {/* Image overlay for gallery effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                
                {/* Image counter */}
                {product.images.length > 1 && (
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-ceramic-900">
                    {selectedImageIndex + 1} / {product.images.length}
                  </div>
                )}
              </motion.div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <motion.div 
                  className="grid grid-cols-4 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square relative overflow-hidden transition-all duration-300 ${
                        selectedImageIndex === index
                          ? 'ring-4 ring-ceramic-900 shadow-lg scale-105'
                          : 'hover:shadow-md hover:scale-102'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Enhanced Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 lg:pt-8"
            >
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Badge variant="secondary" className="text-xs uppercase tracking-wider font-medium px-4 py-2 rounded-full bg-beige-100 text-ceramic-700">
                  {product.category}
                </Badge>
              </motion.div>

              {/* Title and Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h1 className="text-4xl lg:text-5xl font-playfair font-light text-ceramic-900 mb-6 leading-tight tracking-tight">
                  {product.name}
                </h1>
                <motion.p 
                  className="text-4xl lg:text-5xl font-playfair font-medium text-ceramic-900"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  ${product.price}
                </motion.p>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-xl text-ceramic-600 leading-relaxed">
                  {product.description || "Handcrafted with care and attention to detail, this piece brings both beauty and functionality to your space. Each item is unique and tells its own story through the artisan's touch."}
                </p>
              </motion.div>

              {/* Product Details */}
              {(product.dimensions || product.materials) && (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Separator className="bg-ceramic-200" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.dimensions && (
                      <div className="space-y-1">
                        <span className="text-sm uppercase tracking-wider font-medium text-ceramic-500">Dimensions</span>
                        <p className="text-lg text-ceramic-900">{product.dimensions}</p>
                      </div>
                    )}
                    {product.materials && (
                      <div className="space-y-1">
                        <span className="text-sm uppercase tracking-wider font-medium text-ceramic-500">Materials</span>
                        <p className="text-lg text-ceramic-900">{product.materials}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Quantity and Add to Cart */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {/* Quantity Selector */}
                <div className="flex items-center space-x-6">
                  <span className="text-lg font-medium text-ceramic-900">Quantity</span>
                  <div className="flex items-center border-2 border-ceramic-200 rounded-none">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-12 w-12 rounded-none border-r border-ceramic-200"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-16 text-center text-lg font-medium text-ceramic-900">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                      className="h-12 w-12 rounded-none border-l border-ceramic-200"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-ceramic-900 hover:bg-ceramic-800 text-white px-8 py-4 text-lg rounded-none shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingBag className="h-5 w-5 mr-3" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="px-8 py-4 rounded-none border-2 border-ceramic-900 hover:bg-ceramic-900 hover:text-white"
                  >
                    <Heart className="h-5 w-5 mr-3" />
                    Save
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="ghost" 
                    className="px-6 py-4 text-ceramic-600 hover:text-ceramic-900"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div 
                className="space-y-6 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Separator className="bg-ceramic-200" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3 text-ceramic-600">
                    <div className="w-12 h-12 bg-ceramic-100 rounded-full flex items-center justify-center">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-ceramic-900">Free Shipping</p>
                      <p className="text-sm">On orders over $50</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-ceramic-600">
                    <div className="w-12 h-12 bg-ceramic-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-ceramic-900">Secure Payment</p>
                      <p className="text-sm">SSL encrypted</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-ceramic-600">
                    <div className="w-12 h-12 bg-ceramic-100 rounded-full flex items-center justify-center">
                      <RotateCcw className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-ceramic-900">Easy Returns</p>
                      <p className="text-sm">30-day policy</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
