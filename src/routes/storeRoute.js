import express from 'express';
import StoreController from '../controllers/storeController.js';

const router = express.Router();

router
  .get('/stores', StoreController.listStores)
  .get('/stores/:storeId', StoreController.listStoreById)
  .post('/stores', StoreController.createStore)
  .put('stores/:storeId', StoreController.updateStore)
  .delete('/stores/:storeId', StoreController.deleteStore);

export default router;