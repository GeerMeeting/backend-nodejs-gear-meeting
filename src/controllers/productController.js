import NaoEncontrado from '../errors/NaoEncontrado.js';
import Product from '../schemas/productSchema.js';

class ProductController {
  static async listProducts(_, res, next) {
    try {
      const findProducts = await Product.find();

      if (!findProducts || findProducts.length < 1) {
        return next(new NaoEncontrado('No products found'));
      } else {
        res.send(findProducts);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async listProductById(req, res, next) {
    const { productId } = req.params;

    try {
      const productFinded = await Product.findById(productId);
  
      if(!productFinded) {
        return next(NaoEncontrado(`Product not founded by id ${productId}`));
      }

      res.send(productFinded);
    } catch (err) {
      return next(err);
    }
  }

  static async createProduct(req, res, next) {
    const newProduct = {
      name: req.body.name,
      description: req.body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const productExisted = await Product.findOne({ name: req.body.name });
      if(productExisted) {
        return next('Product existed!', 409);
      }

      const product = new Product(newProduct);
      await product.save();

      res.status(201).send(product);
    } catch (err) {
      return next(err);
    }
  }

  static async updateProduct(req, res, next) {
    const { productId } = req.params;
    const newProduct = {
      name: req.body.name,
      description: req.body.description,
      updatedAt: new Date(),
    };
    try {
      const productFinded = await Product.findByIdAndUpdate(productId, { $set: newProduct});
      if(!productFinded) {
        return next(NaoEncontrado(`Product not founded by id ${productId}`));
      }

      const updateProduct = await Product.findById(productId);
      res.send(updateProduct);
    } catch (err) {
      return next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    const { productId } = req.params;

    try {
      const productFinded = await Product.findByIdAndDelete(productId);
  
      if(!productFinded) {
        return next(NaoEncontrado(`Product not founded by id ${productId}`));
      }

      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default ProductController;