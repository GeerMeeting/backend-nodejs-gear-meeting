import NaoEncontrado from '../errors/NaoEncontrado.js';
import Car from '../schemas/carSchema.js';
import Driver from '../schemas/driverSchema.js';

class DriverController {
  static async listDrivers(_, res, next) {
    try {
      const findDrivers = await Driver.find();

      if (!findDrivers || findDrivers.length < 1) {
        return next(new NaoEncontrado('No drivers found'));
      } else {
        res.send(findDrivers);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async listDriverById(req, res, next) {
    const { driverId } = req.params;

    try {
      const driverFinded = await Driver.findById(driverId);
  
      if(!driverFinded) {
        return next(NaoEncontrado(`Driver not founded by id ${driverId}`));
      }

      res.send(driverFinded);
    } catch (err) {
      return next(err);
    }
  }

  static async createDriver(req, res, next) {
    try {
      const carExisted = await Car.findById(req.body.carId);
      if(!carExisted || carExisted.length < 1) {
        return next(NaoEncontrado('Car not founded'));
      }
      
      const newDriver = {
        name: req.body.name,
        description: req.body.description,
        car: carExisted._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const driverExisted = await Driver.findOne({ name: req.body.name });
      if(driverExisted) {
        return next('Driver existed!', 409);
      }

      const driver = new Driver(newDriver);
      await driver.save();

      res.status(201).send(driver);
    } catch (err) {
      return next(err);
    }
  }

  static async updateDriver(req, res, next) {
    const { driverId } = req.params;
    const newDriver = {
      name: req.body.name,
      description: req.body.description,
      updatedAt: new Date(),
    };
    try {
      const driverFinded = await Driver.findByIdAndUpdate(driverId, { $set: newDriver});
      if(!driverFinded) {
        return next(NaoEncontrado(`Driver not founded by id ${driverId}`));
      }

      const updateDriver = await Driver.findById(driverId);
      res.send(updateDriver);
    } catch (err) {
      return next(err);
    }
  }

  static async deleteDriver(req, res, next) {
    const { driverId } = req.params;

    try {
      const driverFinded = await Driver.findByIdAndDelete(driverId);
  
      if(!driverFinded) {
        return next(NaoEncontrado(`Driver not founded by id ${driverId}`));
      }

      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default DriverController;