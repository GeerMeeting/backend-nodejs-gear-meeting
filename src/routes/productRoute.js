import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

router
  .get('/products', ProductController.listProducts)
  .get('/products/:productId', ProductController.listProductById)
  .post('/products', ProductController.createProduct)
  .put('/products/:productId', ProductController.updateProduct)
  .delete('/products/:productId', ProductController.deleteProduct);

export default router;