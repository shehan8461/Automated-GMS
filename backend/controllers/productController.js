const Product = require("../models/Product");
const { z } = require("zod");

const createProductSchema = z.object({
  name: z.string(),
  image: z.string(),
  brand: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  countInStock: z.number(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  materials: z.array(z.string()),
});

const productController = {
  // create product
  createProduct: async (req, res) => {
    try {
      const {
        name,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
        sizes,
        colors,
        materials,
      } = req.body;

      // validation
      createProductSchema.parse(req.body);

      const newProduct = new Product({
        name,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
        sizes,
        colors,
        materials,
      });

      const savedProduct = await newProduct.save();

      res.status(201).json({
        success: true,
        product: savedProduct,
        message: "Product created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all products
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();

      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get product by id
  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({ success: true, product });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update product
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        product: updatedProduct,
        message: "Product updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete product
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const deletedProduct = await Product.findByIdAndDelete(productId);

      res.status(200).json({
        success: true,
        product: deletedProduct,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get products count using aggregation
  getProductsCount: async (req, res) => {
    try {
      const productsCount = await Product.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, count: productsCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = productController;
