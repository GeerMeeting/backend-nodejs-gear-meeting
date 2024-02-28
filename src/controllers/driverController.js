import NaoEncontrado from '../errors/NaoEncontrado.js';
import Car from '../schemas/carSchema.js';
import Driver from '../schemas/driverSchema.js';

class DriverController {
  static async listDrivers(_, res, next) {
    try {
      let findDrivers = await Driver.find();

      if (!findDrivers || findDrivers.length < 1) {
        return next(new NaoEncontrado('No drivers found'));
      } else {
        findDrivers = findDrivers.map((driver) => {
          // eslint-disable-next-line no-unused-vars
          const { dataImage, ...driverWithoutImageData } = driver.toObject();
          return driverWithoutImageData;
        });

        res.send(findDrivers);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async listDriverById(req, res, next) {
    const { driverId } = req.params;

    try {
      const driverFound = await Driver.findById(driverId);
  
      if(!driverFound) {
        return next(NaoEncontrado(`Driver not founded by id ${driverId}`));
      }

      res.send(driverFound);
    } catch (err) {
      return next(err);
    }
  }

  static async findPhoto(req, res, next) {
    const { driverId } = req.params;

    try {
      const driverExisted = await Driver.findById(driverId);

      if(!driverExisted.nameImage) {
        return next(new NaoEncontrado('Image not found'));
      }

      res.set('Content-Type', driverExisted.contentType);
      res.send(driverExisted.dataImage);
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  static async createDriver(req, res, next) {
    try {
      const cars = await Car.find({ _id: { $in: req.body.cars } });
      
      if(cars.length !== req.body.cars.length) {
        return next(new NaoEncontrado('One or more cars not found'));
      }

      const newDriver = {
        name: req.body.name,
        description: req.body.description,
        cars: cars.map(car => car._id),
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
      console.error(err);
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
      const driverFound = await Driver.findByIdAndUpdate(driverId, { $set: newDriver});
      if(!driverFound) {
        return next(NaoEncontrado(`Driver not founded by id ${driverId}`));
      }

      const updateDriver = await Driver.findById(driverId);
      res.send(updateDriver);
    } catch (err) {
      return next(err);
    }
  }

  static async addCar(req, res, next){
    const { driverId } = req.params;
    
    try {
      const driverFound = await Car.findById(driverId);

      if (!driverFound) {
        return next(new NaoEncontrado(`Driver not found by id ${driverId}`));
      }

      const cars = await Car.find({ _id: { $in: req.body.cars } });
  
      if(cars.length !== req.body.cars.length) {
        return next(new NaoEncontrado('One or more cars not found'));
      }

      driverFound.cars.push(...cars.map(car => car._id));
      driverFound.updatedAt = new Date();

      const updateDriver = await driverFound.save();
      res.send(updateDriver);
    } catch (err) {
      return next(err);
    }
  }

  static async savePhoto(req, res, next) {
    const { driverId } = req.params; 

    const newPhoto = {
      nameImage: req.file.originalname,
      dataImage: req.file.buffer,
      contentType: req.file.mimetype,
      updatedAt: new Date(),
    };

    try {
      const driverExisted = await Driver.findByIdAndUpdate(driverId, { $set:  newPhoto });

      if(!driverExisted) {
        return next(new NaoEncontrado('Driver not recognized'));
      }

      const driverUpdated = await Driver.findOne({ _id: driverId });
      res.status(200).send({ 
        _id: driverUpdated._id,
        name: driverUpdated.name,
        cars: driverUpdated.cars,
        description: driverUpdated.description,
        nameImage: driverUpdated.nameImage
      });
    } catch (e) {
      return next(e);
    }
  }

  static async deleteDriver(req, res, next) {
    const { driverId } = req.params;

    try {
      const driverFound = await Driver.findByIdAndDelete(driverId);
  
      if(!driverFound) {
        return next(NaoEncontrado(`Driver not founded by id ${driverId}`));
      }

      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default DriverController;