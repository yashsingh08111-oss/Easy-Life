import express from 'express';
import { authMiddleware } from '../midlleware/authMiddleware.js';
import { createBooking, getBookings, updateBooking, cancelBooking } from '../controller/booking.js';

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/', authMiddleware, getBookings);
router.put('/:id', authMiddleware, updateBooking);
router.delete('/:id', authMiddleware, cancelBooking);

export default router;