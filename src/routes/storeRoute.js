import express from 'express';
import StoreController from '../controllers/storeController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .get('/stores', StoreController.listStores)
  .get('/stores/:storeId', StoreController.listStoreById)
  .get('/stores/:storeId/photo', StoreController.findPhoto)
  .post('/stores', StoreController.createStore)
  .put('/stores/:storeId', StoreController.updateStore)
  .put('/stores/:storeId/photo', upload.single('image', StoreController.savePhoto))
  .delete('/stores/:storeId', StoreController.deleteStore);

export default router;