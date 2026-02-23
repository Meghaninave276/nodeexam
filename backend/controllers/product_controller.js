import { usercollection } from "../models/user_model.js";
import { categorycollection } from "../models/category_model.js";
import { Productcollection } from "../models/product_model.js";
export const getAllProducts = async (req, res) => {
  try {
    const products = await Productcollection.find()
      .populate("category")
      .populate("user", "username");
    res.json({ status: 200, message: "All products fetched", products });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ status: 401, message: "Not authenticated" });

    const products = await Productcollection.find({ user: req.user.userid }).populate("category");
    res.json({ status: 200, message: "My products fetched", products });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      user: req.user.userid,
    });

    
    await User.findByIdAndUpdate(req.user.userid, { $push: { products: product._id } });

    res.json({status:200,message:"product created"})
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export const renderProductForm = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json("productForm", { categories, user: req.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export const renderEditForm = async (req, res) => {
  try {
    const product = await Productcollection.findById(req.params.id).populate("category");
    const categories = await categorycollection.find();

    if (!product) return res.status(404).send("Product not found");
    if (req.user.role !== "admin" && product.user.toString() !== req.user.userid)
      return res.status(403).send("Forbidden");

   return res.json("productForm", { product, categories, user: req.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await Productcollection.findById(req.params.id);

    if (!product) return res.status(404).send("Product not found");
    if (req.user.role !== "admin" && product.user.toString() !== req.user.userid)
      return res.status(403).send("Forbidden");

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    await product.save();
    res.json({status:200,message:"product updated"})

  } catch (err) {
    res.status(500).send(err.message);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Productcollection.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    if (req.user.role !== "admin" && product.user.toString() !== req.user.userid)
      return res.status(403).send("Forbidden");

    await product.remove();
   res.json({status:200,message:"prdoct deleted"})
  } catch (err) {
    res.status(500).send(err.message);
  }
};
