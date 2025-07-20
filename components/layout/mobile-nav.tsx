
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/hooks/use-cart'

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Workshops', href: '/workshops' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const { items } = useCart()

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-out menu */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-ceramic-50 shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-ceramic-200">
                <h2 className="text-xl font-playfair font-semibold text-ceramic-900">
                  Menu
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-6">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`block text-lg font-medium transition-colors duration-200 ${
                          pathname === item.href
                            ? 'text-ceramic-900'
                            : 'text-ceramic-600 hover:text-ceramic-900'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Footer actions */}
              <div className="p-6 border-t border-ceramic-200 space-y-4">
                <Link href="/cart" onClick={onClose}>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Cart
                    </span>
                    {itemCount > 0 && (
                      <Badge variant="secondary">{itemCount}</Badge>
                    )}
                  </Button>
                </Link>

                <Link href="/admin" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
