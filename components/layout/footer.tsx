
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-ceramic-900 text-ceramic-100">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-playfair font-semibold mb-4">
                Sonmade Ceramics
              </h3>
              <p className="text-ceramic-300 max-w-md leading-relaxed">
                Crafting unique ceramic pieces that bring beauty and functionality 
                to your everyday life. Each piece is thoughtfully made with care 
                and attention to detail.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-playfair font-medium mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/shop" 
                    className="text-ceramic-300 hover:text-ceramic-100 transition-colors duration-200"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/workshops" 
                    className="text-ceramic-300 hover:text-ceramic-100 transition-colors duration-200"
                  >
                    Workshops
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-ceramic-300 hover:text-ceramic-100 transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-playfair font-medium mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center text-ceramic-300">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">123 Artisan Lane, Creative District</span>
                </li>
                <li className="flex items-center text-ceramic-300">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">(555) 123-4567</span>
                </li>
                <li className="flex items-center text-ceramic-300">
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">hello@sonmade.com</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-ceramic-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-ceramic-400 text-sm">
            © {new Date().getFullYear()} Sonmade Ceramics. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
