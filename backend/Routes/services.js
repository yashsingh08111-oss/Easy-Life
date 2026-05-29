import express from 'express';
import { authMiddleware } from '../midlleware/authMiddleware.js';
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} from '../controller/servicecontrol.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);

export default router;
