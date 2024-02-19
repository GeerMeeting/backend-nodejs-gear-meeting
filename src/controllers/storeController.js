import NaoEncontrado from '../errors/NaoEncontrado.js';
import Store from '../schemas/storeSchema.js';

class StoreController {
  static async listStores(_, res, next) {
    try {
      const findStores = await Store.find();

      if (!findStores || findStores.length < 1) {
        return next(new NaoEncontrado('No stores found'));
      } else {
        res.send(findStores);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async listStoreById(req, res, next) {
    const { storeId } = req.params;

    try {
      const storeFinded = await Store.findById(storeId);
  
      if(!storeFinded) {
        return next(NaoEncontrado(`Store not founded by id ${storeId}`));
      }

      res.send(storeFinded);
    } catch (err) {
      return next(err);
    }
  }

  static async createStore(req, res, next) {
    const newStore = {
      name: req.body.name,
      description: req.body.description,
      products: req.body.products,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const storeExisted = await Store.findOne({ model: req.body.model });
      if(storeExisted) {
        return next('Store existed!', 409);
      }

      const store = new Store(newStore);
      await store.save();

      res.status(201).send(store);
    } catch (err) {
      return next(err);
    }
  }

  static async updateStore(req, res, next) {
    const { storeId } = req.params;
    const newStore = {
      name: req.body.name,
      description: req.body.description,
      products: req.body.products,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      const storeFinded = await Store.findByIdAndUpdate(storeId, { $set: newStore});
      if(!storeFinded) {
        return next(NaoEncontrado(`Store not founded by id ${storeId}`));
      }

      const updateStore = await Store.findById(storeId);
      res.send(updateStore);
    } catch (err) {
      return next(err);
    }
  }

  static async deleteStore(req, res, next) {
    const { storeId } = req.params;

    try {
      const storeFinded = await Store.findByIdAndDelete(storeId);
  
      if(!storeFinded) {
        return next(NaoEncontrado(`Store not founded by id ${storeId}`));
      }

      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default StoreController;