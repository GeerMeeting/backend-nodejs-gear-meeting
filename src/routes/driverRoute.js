import express from 'express';
import DriverController from '../controllers/driverController.js';

const router = express.Router();

router
  .get('/drivers', DriverController.listDrivers)
  .get('/drivers/:driverId', DriverController.listDriverById)
  .post('/drivers', DriverController.createDriver)
  .put('/drivers/:driverId', DriverController.updateDriver)
  .delete('/drivers/:driverId', DriverController.deleteDriver);

export default router;