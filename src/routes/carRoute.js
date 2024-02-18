import express from 'express';
import CarController from '../controllers/carController.js';

const router = express.Router();

router
  .get('/cars', CarController.listCars);

export default router;