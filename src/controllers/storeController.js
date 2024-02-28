import NaoEncontrado from '../errors/NaoEncontrado.js';
import Store from '../schemas/storeSchema.js';

class StoreController {
  static async listStores(_, res, next) {
    try {
      let findStores = await Store.find();

      if (!findStores || findStores.length < 1) {
        return next(new NaoEncontrado('No stores found'));
      } else {
        findStores = findStores((store) => {
          // eslint-disable-next-line no-unused-vars
          const {dataImage, ...storeWithoutDataImage} = store.toObject();
          return storeWithoutDataImage;
        });
        res.send(findStores);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async listStoreById(req, res, next) {
    const { storeId } = req.params;

    try {
      const storeFound = await Store.findById(storeId);
  
      if(!storeFound) {
        return next(NaoEncontrado(`Store not founded by id ${storeId}`));
      }

      res.send(storeFound);
    } catch (err) {
      return next(err);
    }
  }

  static async findPhoto(req, res, next) {
    const { storeId } = req.params;

    try {
      const storeExisted = await Store.findById(storeId);

      if(!storeExisted.nameImage) {
        return next(new NaoEncontrado('Image not found'));
      }

      res.set('Content-Type', storeExisted.contentType);
      res.send(storeExisted.dataImage);
    } catch (e) {
      console.error(e);
      return next(e);
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
      const storeFound = await Store.findByIdAndUpdate(storeId, { $set: newStore});
      if(!storeFound) {
        return next(NaoEncontrado(`Store not founded by id ${storeId}`));
      }

      const updateStore = await Store.findById(storeId);
      res.send(updateStore);
    } catch (err) {
      return next(err);
    }
  }

  static async savePhoto(req, res, next) {
    const { storeId } = req.params; 

    const newPhoto = {
      nameImage: req.file.originalname,
      dataImage: req.file.buffer,
      contentType: req.file.mimetype,
      updatedAt: new Date(),
    };

    try {
      const storeExisted = await Store.findByIdAndUpdate(storeId, { $set:  newPhoto });

      if(!storeExisted) {
        return next(new NaoEncontrado('Store not recognized'));
      }

      const storeUpdated = await Store.findOne({ _id: storeId });
      res.status(200).send({ 
        _id: storeUpdated._id,
        name: storeUpdated.name,
        description: storeUpdated.description,
        category: storeUpdated.category,
        products: storeUpdated.products,
        nameImage: storeUpdated.nameImage
      });
    } catch (e) {
      return next(e);
    }
  }

  static async deleteStore(req, res, next) {
    const { storeId } = req.params;

    try {
      const storeFound = await Store.findByIdAndDelete(storeId);
  
      if(!storeFound) {
        return next(NaoEncontrado(`Store not founded by id ${storeId}`));
      }

      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default StoreController;