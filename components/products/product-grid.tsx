
'use client'

import { motion } from 'framer-motion'
import { ProductCard } from './product-card'
import { ProductListItem } from './product-list-item'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: string
  featured?: boolean
}

interface ProductGridProps {
  products: Product[]
  viewMode: 'grid' | 'list'
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <ProductListItem product={product} />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          className={`
            ${index % 7 === 0 ? 'lg:col-span-2' : ''}
            ${index % 11 === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}
          `}
        >
          <ProductCard 
            product={product} 
            featured={index % 7 === 0 || index % 11 === 0}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
