import express from 'express';
import CarController from '../controllers/carController.js';

const router = express.Router();

router
  .get('/cars', CarController.listCars)
  .get('/cars/:carId', CarController.listCarById)
  .post('/cars', CarController.createCar)
  .put('/cars/:carId', CarController.updateCar)
  .delete('/cars/:carId', CarController.deleteCar);

export default router;