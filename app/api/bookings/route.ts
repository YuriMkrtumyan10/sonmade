
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      workshopId,
      sessionId,
      customerEmail,
      customerName,
      participants,
      totalPrice,
      specialRequests,
      stripePaymentId,
    } = body

    // Check if session has available spots
    const session = await prisma.workshopSession.findUnique({
      where: { id: sessionId },
      include: {
        bookings: true,
      },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

   const bookedParticipants = session.bookings.reduce(
      (total: number, booking: { participants: number }) => total + booking.participants,
      0
    )
    
    if (bookedParticipants + participants > session.availableSpots) {
      return NextResponse.json(
        { error: 'Not enough available spots' },
        { status: 400 }
      )
    }

    // Create booking
    const booking = await prisma.workshopBooking.create({
      data: {
        workshopId,
        sessionId,
        customerEmail,
        customerName,
        participants,
        totalPrice: parseFloat(totalPrice),
        specialRequests,
        stripePaymentId,
        status: 'CONFIRMED',
      },
      include: {
        workshop: true,
        session: true,
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const bookings = await prisma.workshopBooking.findMany({
      include: {
        workshop: true,
        session: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
