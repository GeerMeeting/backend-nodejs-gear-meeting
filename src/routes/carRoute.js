import express from 'express';
import CarController from '../controllers/carController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

router
  .get('/cars', CarController.listCars)
  .get('/cars/:carId', CarController.listCarById)
  .get('/cars/:carId/photo', CarController.findPhoto)
  .post('/cars', CarController.createCar)
  .put('/cars/:carId', CarController.updateCar)
  .put('/cars/:carId/photo', upload.single('image'), CarController.savePhoto)
  .delete('/cars/:carId', CarController.deleteCar);

export default router;