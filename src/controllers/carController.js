import NaoEncontrado from '../errors/NaoEncontrado.js';
import Car from '../schemas/carSchema.js';

class CarController {
  static async listCars(_, res, next) {
    try {
      let findCars = await Car.find();

      if (!findCars || findCars.length < 1) {
        return next(new NaoEncontrado('No cars found'));
      } else {
        findCars = findCars.map((car) => {
          // eslint-disable-next-line no-unused-vars
          const {dataImage, ...carWithoutDataImage} = car.toObject();
          return carWithoutDataImage;
        });

        res.send(findCars);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async listCarById(req, res, next) {
    const { carId } = req.params;

    try {
      const carFound = await Car.findById(carId);
  
      if(!carFound) {
        return next(NaoEncontrado(`Car not founded by id ${carId}`));
      }

      res.send(carFound);
    } catch (err) {
      return next(err);
    }
  }

  static async findPhoto(req, res, next) {
    const { carId } = req.params;

    try {
      const carExisted = await Car.findById(carId);

      if(!carExisted.nameImage) {
        return next(new NaoEncontrado('Image not found'));
      }

      res.set('Content-Type', carExisted.contentType);
      res.send(carExisted.dataImage);
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  static async createCar(req, res, next) {
    const newCar = {
      model: req.body.model,
      brand: req.body.brand,
      description: req.body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const carExisted = await Car.findOne({ model: req.body.model });
      if(carExisted) {
        return next('Car existed!', 409);
      }

      const car = new Car(newCar);
      await car.save();

      res.status(201).send(car);
    } catch (err) {
      return next(err);
    }
  }

  static async savePhoto(req, res, next) {
    const { carId } = req.params; 

    const newPhoto = {
      nameImage: req.file.originalname,
      dataImage: req.file.buffer,
      contentType: req.file.mimetype,
      updatedAt: new Date(),
    };

    try {
      const carExisted = await Car.findByIdAndUpdate(carId, { $set:  newPhoto });

      if(!carExisted) {
        return next(new NaoEncontrado('Car not recognized'));
      }

      const carUpdated = await Car.findOne({ _id: carId });
      res.status(200).send({ 
        _id: carUpdated._id,
        model: carUpdated.model,
        brand: carUpdated.brand,
        description: carUpdated.description,
        nameImage: carUpdated.nameImage
      });
    } catch (e) {
      return next(e);
    }
  }

  static async updateCar(req, res, next) {
    const { carId } = req.params;
    const newCar = {
      model: req.body.model,
      brand: req.body.brand,
      description: req.body.description,
      updatedAt: new Date(),
    };
    try {
      const carFound = await Car.findByIdAndUpdate(carId, { $set: newCar});
      if(!carFound) {
        return next(NaoEncontrado(`Car not founded by id ${carId}`));
      }

      const updateCar = await Car.findById(carId);
      res.send(updateCar);
    } catch (err) {
      return next(err);
    }
  }

  static async deleteCar(req, res, next) {
    const { carId } = req.params;

    try {
      const carFound = await Car.findByIdAndDelete(carId);
  
      if(!carFound) {
        return next(NaoEncontrado(`Car not founded by id ${carId}`));
      }

      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default CarController;