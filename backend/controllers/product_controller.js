import { productcollection } from "../models/product_model.js";
import { usercollection } from "../models/user_model.js";

export const addProduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  const product = await productcollection.create({
    name,
    price,
    description,
    category,
    user: req.user._id,
  });

  req.user.products.push(product._id);
  await req.user.save();

  res.status(201).json(product);
};

export const getAllProducts = async (req, res) => {
  const products = await productcollection.find()
    .populate("user", "username")
    .populate("category", "name");

  res.json(products);
};

export const getMyProducts = async (req, res) => {
  const products = await productcollection.find({ user: req.user._id })
    .populate("category", "name");

  res.json(products);
};

export const deleteProduct = async (req, res) => {
  await productcollection.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    const product = await productcollection.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.image = image || product.image;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};