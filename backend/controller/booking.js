import prisma from '../config/db.js';

export const createBooking = async (req, res) => {
  try {
    const { serviceId, workerId, location, scheduledAt, totalPrice } = req.body;
    const customerId = req.user.id;

    if (!serviceId || !totalPrice) {
      return res.status(400).json({ error: 'Service ID and price are required' });
    }

    // Verify service exists
    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const booking = await prisma.booking.create({
      data: {
        serviceId: parseInt(serviceId),
        customerId: parseInt(customerId),
        workerId: workerId ? parseInt(workerId) : null,
        location,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        totalPrice: parseFloat(totalPrice),
        status: 'pending'
      },
      include: {
        service: true,
        customer: { select: { id: true, name: true, email: true } },
        worker: true
      }
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: error.message || 'Failed to create booking' });
  }
};

export const getBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get bookings where user is either customer or worker
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { customerId: parseInt(userId) },
          { workerId: parseInt(userId) }
        ]
      },
      include: {
        service: true,
        customer: { select: { id: true, name: true, email: true } },
        worker: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch bookings' });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, workerId } = req.body;
    const userId = req.user.id;

    // Verify booking exists and user has permission
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Only customer or worker assigned can update
    if (booking.customerId !== userId && booking.workerId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        ...(status && { status }),
        ...(workerId && { workerId: parseInt(workerId) })
      },
      include: {
        service: true,
        customer: { select: { id: true, name: true, email: true } },
        worker: true
      }
    });

    res.json({
      message: 'Booking updated successfully',
      booking: updatedBooking
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: error.message || 'Failed to update booking' });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify booking exists and user has permission
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Only customer can cancel
    if (booking.customerId !== userId) {
      return res.status(403).json({ error: 'Only customer can cancel booking' });
    }

    const cancelledBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status: 'cancelled' },
      include: {
        service: true,
        customer: { select: { id: true, name: true, email: true } },
        worker: true
      }
    });

    res.json({
      message: 'Booking cancelled successfully',
      booking: cancelledBooking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: error.message || 'Failed to cancel booking' });
  }
};