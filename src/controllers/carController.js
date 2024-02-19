import NaoEncontrado from '../errors/NaoEncontrado.js';
import Car from '../schemas/carSchema.js';

class CarController {
  static async listCars(_, res, next) {
    try {
      const findCars = await Car.find();

      if (!findCars) {
        return next(new NaoEncontrado('No cars found'));
      } else {
        res.send(findCars);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async listCarById(req, res, next) {
    const { carId } = req.params;

    try {
      const carFinded = await Car.findById(carId);
  
      if(!carFinded) {
        return next(NaoEncontrado(`Car not founded by id ${carId}`));
      }

      res.send(carFinded);
    } catch (err) {
      return next(err);
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

  static async updateCar(req, res, next) {
    const { carId } = req.params;
    const newCar = {
      model: req.body.model,
      brand: req.body.brand,
      description: req.body.description,
      updatedAt: new Date(),
    };
    try {
      const carFinded = await Car.findByIdAndUpdate(carId, { $set: newCar});
      if(!carFinded) {
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
      const carFinded = await Car.findByIdAndDelete(carId);
  
      if(!carFinded) {
        return next(NaoEncontrado(`Car not founded by id ${carId}`));
      }

      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default CarController;