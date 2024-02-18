import NaoEncontrado from '../errors/NaoEncontrado.js';
import Car from '../schemas/carSchema.js';

class CarController {
  static listCars = async (_, res, next) => {
    try {
      const findCars = Car.find();

      if (!findCars) {
        return next(new NaoEncontrado('No cars found'));
      } else {
        res.send(findCars);
      }
    } catch (err) {
      return next(err);
    }
  };
}

export default CarController;