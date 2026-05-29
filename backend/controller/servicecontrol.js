import prisma from '../config/db.js';

export const createService = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const providerId = req.user.id;

    if (!title || !description || !price) {
      return res.status(400).json({ error: 'Title, description, and price are required' });
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category: category || 'general',
        providerId: parseInt(providerId)
      },
      include: {
        provider: { select: { id: true, name: true, email: true } }
      }
    });

    res.status(201).json({
      message: 'Service created successfully',
      service
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: error.message || 'Failed to create service' });
  }
};

export const getServices = async (req, res) => {
  try {
    const { category, search } = req.query;

    const where = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const services = await prisma.service.findMany({
      where,
      include: {
        provider: { select: { id: true, name: true, email: true } }
      }
    });

    res.json({ services, total: services.length });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch services' });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id: parseInt(id) },
      include: {
        provider: { select: { id: true, name: true, email: true } },
        bookings: { select: { id: true, status: true } }
      }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ service });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch service' });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category } = req.body;
    const userId = req.user.id;

    const service = await prisma.service.findUnique({
      where: { id: parseInt(id) }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Only provider can update
    if (service.providerId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedService = await prisma.service.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(category && { category })
      },
      include: {
        provider: { select: { id: true, name: true, email: true } }
      }
    });

    res.json({
      message: 'Service updated successfully',
      service: updatedService
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: error.message || 'Failed to update service' });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const service = await prisma.service.findUnique({
      where: { id: parseInt(id) }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Only provider can delete
    if (service.providerId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await prisma.service.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: error.message || 'Failed to delete service' });
  }
};