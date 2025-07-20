
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Calendar, ShoppingCart, MessageSquare, Users, Plus, X, Upload, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  price: number
  category: string
  images: string[]
  featured: boolean
  inStock: boolean
}

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

const stats = [
  {
    title: 'Total Products',
    value: '24',
    icon: Package,
    change: '+2 this month',
  },
  {
    title: 'Active Workshops',
    value: '8',
    icon: Calendar,
    change: '+1 this week',
  },
  {
    title: 'Orders',
    value: '156',
    icon: ShoppingCart,
    change: '+12 this week',
  },
  {
    title: 'Messages',
    value: '23',
    icon: MessageSquare,
    change: '5 unread',
  },
]

const categories = ['Vases', 'Bowls', 'Plates', 'Mugs', 'Planters', 'Decorative']
//const workshopTypes = ['Beginner', 'Intermediate', 'Advanced', 'Kids', 'Private']
const workshopTypes = [
  { label: "Beginner Basics", value: "BEGINNER_BASICS" },
  { label: "Pottery Wheel", value: "POTTERY_WHEEL" },
  { label: "Hand Building", value: "HAND_BUILDING" },
  { label: "Glazing", value: "GLAZING" },
  { label: "Sculpture", value: "SCULPTURE" },
]
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showAddWorkshop, setShowAddWorkshop] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [''],
    featured: false,
    inStock: true,
    dimensions: '',
    materials: ''
  })

  // Workshop form state
  const [workshopForm, setWorkshopForm] = useState({
    title: '',
    description: '',
    type: '',
    duration: '',
    maxParticipants: '',
    price: '',
    images: ['']
  })

  useEffect(() => {
    fetchProducts()
    fetchWorkshops()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchWorkshops = async () => {
    try {
      const response = await fetch('/api/workshops')
      if (response.ok) {
        const data = await response.json()
        setWorkshops(data)
      }
    } catch (error) {
      console.error('Error fetching workshops:', error)
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
          images: productForm.images.filter(img => img.trim() !== '')
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product added successfully!",
        })
        setShowAddProduct(false)
        setProductForm({
          name: '',
          description: '',
          price: '',
          category: '',
          images: [''],
          featured: false,
          inStock: true,
          dimensions: '',
          materials: ''
        })
        fetchProducts()
      } else {
        throw new Error('Failed to add product')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddWorkshop = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/workshops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...workshopForm,
          duration: parseInt(workshopForm.duration),
          maxParticipants: parseInt(workshopForm.maxParticipants),
          price: parseFloat(workshopForm.price),
          images: workshopForm.images.filter(img => img.trim() !== '')
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Workshop added successfully!",
        })
        setShowAddWorkshop(false)
        setWorkshopForm({
          title: '',
          description: '',
          type: '',
          duration: '',
          maxParticipants: '',
          price: '',
          images: ['']
        })
        fetchWorkshops()
      } else {
        throw new Error('Failed to add workshop')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add workshop. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addImageField = (type: 'product' | 'workshop') => {
    if (type === 'product') {
      setProductForm(prev => ({
        ...prev,
        images: [...prev.images, '']
      }))
    } else {
      setWorkshopForm(prev => ({
        ...prev,
        images: [...prev.images, '']
      }))
    }
  }

  const removeImageField = (index: number, type: 'product' | 'workshop') => {
    if (type === 'product') {
      setProductForm(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }))
    } else {
      setWorkshopForm(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }))
    }
  }

  const updateImageField = (index: number, value: string, type: 'product' | 'workshop') => {
    if (type === 'product') {
      setProductForm(prev => ({
        ...prev,
        images: prev.images.map((img, i) => i === index ? value : img)
      }))
    } else {
      setWorkshopForm(prev => ({
        ...prev,
        images: prev.images.map((img, i) => i === index ? value : img)
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ceramic-50 to-white py-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-6xl font-playfair font-light text-ceramic-900 mb-4 tracking-tight">
            Admin
            <span className="block font-medium italic text-ceramic-700">Dashboard</span>
          </h1>
          <p className="text-xl text-ceramic-600">
            Manage your ceramics business from one central location
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-none">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ceramic-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-playfair font-semibold text-ceramic-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-ceramic-500 mt-1">{stat.change}</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-beige-100 to-ceramic-100 rounded-full flex items-center justify-center">
                    <stat.icon className="h-7 w-7 text-ceramic-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Mobile-responsive tabs */}
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-5 min-w-max lg:min-w-0 bg-white shadow-lg rounded-none">
                <TabsTrigger value="overview" className="text-sm lg:text-base px-2 lg:px-4">Overview</TabsTrigger>
                <TabsTrigger value="products" className="text-sm lg:text-base px-2 lg:px-4">Products</TabsTrigger>
                <TabsTrigger value="workshops" className="text-sm lg:text-base px-2 lg:px-4">Workshops</TabsTrigger>
                <TabsTrigger value="orders" className="text-sm lg:text-base px-2 lg:px-4">Orders</TabsTrigger>
                <TabsTrigger value="messages" className="text-sm lg:text-base px-2 lg:px-4">Messages</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg rounded-none">
                  <CardHeader>
                    <CardTitle className="font-playfair text-xl">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-ceramic-100 last:border-0">
                          <div>
                            <p className="font-medium text-ceramic-900">Order #{1000 + i}</p>
                            <p className="text-sm text-ceramic-600">Customer Name</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-ceramic-900">$85.00</p>
                            <p className="text-sm text-ceramic-600">Pending</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg rounded-none">
                  <CardHeader>
                    <CardTitle className="font-playfair text-xl">Upcoming Workshops</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workshops.slice(0, 3).map((workshop, i) => (
                        <div key={workshop.id} className="flex items-center justify-between py-3 border-b border-ceramic-100 last:border-0">
                          <div>
                            <p className="font-medium text-ceramic-900">{workshop.title}</p>
                            <p className="text-sm text-ceramic-600">{workshop.type} • {workshop.duration}h</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-ceramic-900">${workshop.price}</p>
                            <p className="text-sm text-ceramic-600">{workshop.maxParticipants} max</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl lg:text-3xl font-playfair font-medium text-ceramic-900">
                  Product Management
                </h2>
                <Button 
                  onClick={() => setShowAddProduct(true)}
                  className="bg-ceramic-900 hover:bg-ceramic-800 rounded-none px-6 py-3"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {/* Products List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="border-0 shadow-lg rounded-none overflow-hidden">
                    <div className="aspect-square bg-ceramic-100 relative">
                      {product.images[0] && (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-playfair font-medium text-lg text-ceramic-900 mb-2">{product.name}</h3>
                      <p className="text-ceramic-600 text-sm mb-2">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-playfair font-semibold text-ceramic-900">${product.price}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workshops" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl lg:text-3xl font-playfair font-medium text-ceramic-900">
                  Workshop Management
                </h2>
                <Button 
                  onClick={() => setShowAddWorkshop(true)}
                  className="bg-ceramic-900 hover:bg-ceramic-800 rounded-none px-6 py-3"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Workshop
                </Button>
              </div>

              {/* Workshops List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {workshops.map((workshop) => (
                  <Card key={workshop.id} className="border-0 shadow-lg rounded-none">
                    <CardContent className="p-6">
                      <h3 className="font-playfair font-medium text-xl text-ceramic-900 mb-2">{workshop.title}</h3>
                      <p className="text-ceramic-600 mb-4 line-clamp-2">{workshop.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-ceramic-500">Type:</span>
                          <span className="ml-2 text-ceramic-900">{workshop.type}</span>
                        </div>
                        <div>
                          <span className="text-ceramic-500">Duration:</span>
                          <span className="ml-2 text-ceramic-900">{workshop.duration}h</span>
                        </div>
                        <div>
                          <span className="text-ceramic-500">Max Participants:</span>
                          <span className="ml-2 text-ceramic-900">{workshop.maxParticipants}</span>
                        </div>
                        <div>
                          <span className="text-ceramic-500">Price:</span>
                          <span className="ml-2 text-ceramic-900 font-semibold">${workshop.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-playfair font-medium text-ceramic-900">
                Order Management
              </h2>
              <Card className="border-0 shadow-lg rounded-none">
                <CardContent className="p-8">
                  <p className="text-ceramic-600 text-center py-12 text-lg">
                    Order management interface will be implemented here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-playfair font-medium text-ceramic-900">
                Contact Messages
              </h2>
              <Card className="border-0 shadow-lg rounded-none">
                <CardContent className="p-8">
                  <p className="text-ceramic-600 text-center py-12 text-lg">
                    Message management interface will be implemented here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Quick Actions - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl lg:text-3xl font-playfair font-medium text-ceramic-900 mb-8">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Button 
              variant="outline" 
              className="h-auto p-8 flex flex-col items-center space-y-4 rounded-none border-2 border-ceramic-200 hover:border-ceramic-900 hover:bg-ceramic-50"
              onClick={() => setShowAddProduct(true)}
            >
              <Package className="h-10 w-10 text-ceramic-700" />
              <span className="text-lg font-medium">Add New Product</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-8 flex flex-col items-center space-y-4 rounded-none border-2 border-ceramic-200 hover:border-ceramic-900 hover:bg-ceramic-50"
              onClick={() => setShowAddWorkshop(true)}
            >
              <Calendar className="h-10 w-10 text-ceramic-700" />
              <span className="text-lg font-medium">Schedule Workshop</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-8 flex flex-col items-center space-y-4 rounded-none border-2 border-ceramic-200 hover:border-ceramic-900 hover:bg-ceramic-50"
            >
              <Users className="h-10 w-10 text-ceramic-700" />
              <span className="text-lg font-medium">View Analytics</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-ceramic-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-playfair font-medium text-ceramic-900">Add New Product</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddProduct(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={productForm.name}
                    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="rounded-none"
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                    required
                    className="rounded-none"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={productForm.category} onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={productForm.dimensions}
                    onChange={(e) => setProductForm(prev => ({ ...prev, dimensions: e.target.value }))}
                    placeholder="e.g., 10cm x 15cm"
                    className="rounded-none"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="materials">Materials</Label>
                <Input
                  id="materials"
                  value={productForm.materials}
                  onChange={(e) => setProductForm(prev => ({ ...prev, materials: e.target.value }))}
                  placeholder="e.g., Stoneware clay, glazed"
                  className="rounded-none"
                />
              </div>

              <div>
                <Label>Product Images</Label>
                <div className="space-y-3">
                  {productForm.images.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={image}
                        onChange={(e) => updateImageField(index, e.target.value, 'product')}
                        placeholder="Image URL"
                        className="rounded-none"
                      />
                      {productForm.images.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeImageField(index, 'product')}
                          className="rounded-none"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addImageField('product')}
                    className="rounded-none"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm text-ceramic-700">Featured Product</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm text-ceramic-700">In Stock</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-ceramic-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddProduct(false)}
                  className="rounded-none"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-ceramic-900 hover:bg-ceramic-800 rounded-none"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Add Product
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Workshop Modal */}
      {showAddWorkshop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-ceramic-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-playfair font-medium text-ceramic-900">Add New Workshop</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddWorkshop(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleAddWorkshop} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Workshop Title</Label>
                  <Input
                    id="title"
                    value={workshopForm.title}
                    onChange={(e) => setWorkshopForm(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="rounded-none"
                  />
                </div>
                
                <div>
                  <Label htmlFor="workshopPrice">Price ($)</Label>
                  <Input
                    id="workshopPrice"
                    type="number"
                    step="0.01"
                    value={workshopForm.price}
                    onChange={(e) => setWorkshopForm(prev => ({ ...prev, price: e.target.value }))}
                    required
                    className="rounded-none"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="workshopDescription">Description</Label>
                <Textarea
                  id="workshopDescription"
                  value={workshopForm.description}
                  onChange={(e) => setWorkshopForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="type">Workshop Type</Label>
                  <Select
                    value={workshopForm.type}
                    onValueChange={(value) => setWorkshopForm(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {workshopTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={workshopForm.duration}
                    onChange={(e) => setWorkshopForm(prev => ({ ...prev, duration: e.target.value }))}
                    required
                    className="rounded-none"
                  />
                </div>

                <div>
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={workshopForm.maxParticipants}
                    onChange={(e) => setWorkshopForm(prev => ({ ...prev, maxParticipants: e.target.value }))}
                    required
                    className="rounded-none"
                  />
                </div>
              </div>

              <div>
                <Label>Workshop Images</Label>
                <div className="space-y-3">
                  {workshopForm.images.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={image}
                        onChange={(e) => updateImageField(index, e.target.value, 'workshop')}
                        placeholder="Image URL"
                        className="rounded-none"
                      />
                      {workshopForm.images.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeImageField(index, 'workshop')}
                          className="rounded-none"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addImageField('workshop')}
                    className="rounded-none"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-ceramic-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddWorkshop(false)}
                  className="rounded-none"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-ceramic-900 hover:bg-ceramic-800 rounded-none"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Add Workshop
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
