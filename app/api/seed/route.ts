
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@sonmade.com' },
      update: {},
      create: {
        email: 'admin@sonmade.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
      },
    })

    // Sample products
    const products = [
      {
        name: 'Minimalist Ceramic Vase',
        description: 'A beautifully crafted ceramic vase with clean lines and a matte finish. Perfect for displaying fresh flowers or as a standalone decorative piece.',
        price: 85.00,
        category: 'Vases',
        images: ['https://i.pinimg.com/736x/a0/fc/19/a0fc19040c9e8b6ee5cf0d3a07925b89.jpg'],
        featured: true,
        dimensions: '8" H x 4" W',
        materials: 'Stoneware clay, matte glaze',
      },
      {
        name: 'Handmade Ceramic Bowl Set',
        description: 'Set of three handmade ceramic bowls in varying sizes. Each bowl features unique textures and earth-tone glazes.',
        price: 120.00,
        category: 'Bowls',
        images: ['https://i.pinimg.com/736x/7f/f2/89/7ff2894294010d6c971c813ab61ff26f.jpg'],
        featured: true,
        dimensions: 'Large: 6" dia, Medium: 5" dia, Small: 4" dia',
        materials: 'Earthenware clay, natural glazes',
      },
      {
        name: 'Artisan Dinner Plates',
        description: 'Elegant dinner plates with a subtle speckled glaze. Dishwasher and microwave safe. Set of 4.',
        price: 95.00,
        category: 'Plates',
        images: ['https://i.pinimg.com/736x/d9/b0/b6/d9b0b62abe57a591a7b969024bed0a64.jpg'],
        featured: false,
        dimensions: '10.5" diameter',
        materials: 'Porcelain, food-safe glaze',
      },
      {
        name: 'Modern Ceramic Planter',
        description: 'Contemporary ceramic planter with drainage hole. Perfect for succulents and small plants.',
        price: 45.00,
        category: 'Planters',
        images: ['https://i.pinimg.com/originals/8d/3d/68/8d3d68fdf83e0f3025aa555993a64205.jpg'],
        featured: true,
        dimensions: '5" H x 6" W',
        materials: 'Terracotta clay, waterproof glaze',
      },
      {
        name: 'Ceramic Coffee Mug',
        description: 'Comfortable ceramic mug with a smooth finish. Perfect for your morning coffee or evening tea.',
        price: 28.00,
        category: 'Mugs',
        images: ['https://thumbs.dreamstime.com/b/shiny-golden-ceramic-coffee-mug-rising-steam-351423010.jpg'],
        featured: false,
        dimensions: '4" H x 3.5" W',
        materials: 'Stoneware, food-safe glaze',
      },
      {
        name: 'Decorative Ceramic Sculpture',
        description: 'Abstract ceramic sculpture that adds artistic flair to any space. Each piece is unique.',
        price: 150.00,
        category: 'Decorative',
        images: ['https://i.pinimg.com/originals/b4/47/d4/b447d457b16c1ad594a87b4563129f9d.jpg'],
        featured: true,
        dimensions: '12" H x 6" W x 4" D',
        materials: 'High-fire clay, matte finish',
      },
    ]

    for (const productData of products) {
      const existingProduct = await prisma.product.findFirst({
        where: { name: productData.name },
      })
      
      if (!existingProduct) {
        await prisma.product.create({
          data: productData,
        })
      }
    }

    // Sample workshops
    const workshops = [
      {
        title: 'Pottery Wheel Basics',
        description: 'Learn the fundamentals of throwing pottery on the wheel. Perfect for beginners who want to experience the magic of creating with clay.',
        type: 'POTTERY_WHEEL',
        duration: 3,
        maxParticipants: 8,
        price: 85.00,
        images: ['https://images.squarespace-cdn.com/content/v1/63e1f7e5518c5875daaa2b6e/a87c704c-d001-47c8-899e-129c9dad0379/image+12.jpg'],
      },
      {
        title: 'Hand-Building Techniques',
        description: 'Explore various hand-building methods including pinch pots, coil building, and slab construction. No wheel experience needed.',
        type: 'HAND_BUILDING',
        duration: 2,
        maxParticipants: 12,
        price: 65.00,
        images: ['https://i.pinimg.com/1200x/be/f5/a9/bef5a9305a642afd8cc4b15a6dc3ef84.jpg'],
      },
      {
        title: 'Glazing Workshop',
        description: 'Learn about different glazing techniques and create beautiful finishes for your ceramic pieces.',
        type: 'GLAZING',
        duration: 2,
        maxParticipants: 10,
        price: 55.00,
        images: ['https://i.ytimg.com/vi/eAp5L_-F3_s/maxresdefault.jpg'],
      },
    ]

    for (const workshopData of workshops) {
      const existingWorkshop = await prisma.workshop.findFirst({
        where: { title: workshopData.title },
      })
      
      let workshop
      if (!existingWorkshop) {
        workshop = await prisma.workshop.create({
          data: {
            ...workshopData,
            type: workshopData.type as any,
          },
        })
      } else {
        workshop = existingWorkshop
      }

      // Create sample sessions for each workshop
      const now = new Date()
      const sessions = [
        {
          workshopId: workshop.id,
          startTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
          endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + workshop.duration * 60 * 60 * 1000),
          availableSpots: workshop.maxParticipants,
        },
        {
          workshopId: workshop.id,
          startTime: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
          endTime: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + workshop.duration * 60 * 60 * 1000),
          availableSpots: workshop.maxParticipants,
        },
      ]

      for (const sessionData of sessions) {
        await prisma.workshopSession.create({
          data: sessionData,
        })
      }
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
      admin: { email: admin.email },
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}
