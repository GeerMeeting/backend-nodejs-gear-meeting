import express from 'express';
import DriverController from '../controllers/driverController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .get('/drivers', DriverController.listDrivers)
  .get('/drivers/:driverId', DriverController.listDriverById)
  .get('/drivers/:driverId/photo', DriverController.findPhoto)
  .post('/drivers', DriverController.createDriver)
  .put('/drivers/:driverId', DriverController.updateDriver)
  .put('/drivers/:driverId/cars', DriverController.addCar)
  .put('/drivers/:driverId/photo', upload.single('image'), DriverController.savePhoto)
  .delete('/drivers/:driverId', DriverController.deleteDriver);

export default router;