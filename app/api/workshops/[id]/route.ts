
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: {
        id: params.id,
      },
      include: {
        sessions: {
          where: {
            startTime: {
              gte: new Date(),
            },
          },
          orderBy: {
            startTime: 'asc',
          },
        },
      },
    })

    if (!workshop) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(workshop)
  } catch (error) {
    console.error('Error fetching workshop:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workshop' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      type,
      duration,
      maxParticipants,
      price,
      images,
      active,
    } = body

    const workshop = await prisma.workshop.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        type,
        duration: parseInt(duration),
        maxParticipants: parseInt(maxParticipants),
        price: parseFloat(price),
        images: images || [],
        active: active ?? true,
      },
    })

    return NextResponse.json(workshop)
  } catch (error) {
    console.error('Error updating workshop:', error)
    return NextResponse.json(
      { error: 'Failed to update workshop' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.workshop.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: 'Workshop deleted successfully' })
  } catch (error) {
    console.error('Error deleting workshop:', error)
    return NextResponse.json(
      { error: 'Failed to delete workshop' },
      { status: 500 }
    )
  }
}
