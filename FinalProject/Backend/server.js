import "./config.js";
import express from "express";
import cors from "cors";

import {
  categoryModel,
  productTypeModel,
  productThemeModel,
  productModel,
  membershipModel,
  userModel,
} from "./schema.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// admin
app.get(`/admin`, async (req, resp) => {
  let data = await adminModel.find();
  resp.send(data);
});

app.post("/loginAdmin", async (req, resp) => {
  try {
    const { username, password, securityCode } = req.body;
    let admin = await adminModel.findOne({ username });

    if (!admin) {
      return resp.status(401).send({ message: "Invalid username or password" });
    }
    if (admin.password !== password) {
      return resp.status(401).send({ message: "Invalid username or password" });
    }
    if (admin.securityCode !== securityCode) {
      return resp.status(401).send({ message: "Invalid securityCode" });
    }

    resp.send({
      name: admin.username,
      _id: admin._id,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send(error);
  }
});

// memebership
app.get(`/memebershipData`, async (req, resp) => {
  let data = await membershipModel.find();
  resp.send(data);
});

app.post(`/addTear`, async (req, resp) => {
  let data = new membershipModel(req.body);
  let result = data.save();
  resp.send(result);
});

app.put(`/editTear/:id`, async (req, resp) => {
  let data = await membershipModel.updateOne(
    { _id: req.params.id },
    { $set: req.body },
  );
  resp.send(data);
});

app.delete(`/deleteTear/:id`, async (req, resp) => {
  let data = await membershipModel.deleteOne({ _id: req.params.id });
  resp.send(data);
});

// categorys
app.get(`/categorys`, async (req, resp) => {
  let data = await categoryModel.find();
  resp.send(data);
});

app.post(`/addCategory`, async (req, resp) => {
  let data = new categoryModel(req.body);
  let result = data.save();
  resp.send(result);
});

app.put(`/editCategory/:id`, async (req, resp) => {
  let data = await categoryModel.updateOne(
    { _id: req.params.id },
    { $set: req.body },
  );
  resp.send(data);
});

app.delete(`/deleteCategory/:id`, async (req, resp) => {
  let data = await categoryModel.deleteOne({ _id: req.params.id });
  resp.send(data);
});

// producttypes
app.get(`/productType`, async (req, resp) => {
  let data = await productTypeModel.find().populate("catId");
  resp.send(data);
});

app.post(`/addProduct`, async (req, resp) => {
  let data = new productTypeModel(req.body);
  let result = data.save();
  resp.send(result);
});

app.put(`/editProduct/:id`, async (req, resp) => {
  let data = await productTypeModel.updateOne(
    { _id: req.params.id },
    { $set: req.body },
  );
  resp.send(data);
});

app.delete(`/deleteProduct/:id`, async (req, resp) => {
  let data = await productTypeModel.deleteOne({ _id: req.params.id });
  resp.send(data);
});

// producttheme
app.get(`/productTheme`, async (req, resp) => {
  let data = await productThemeModel.find();
  resp.send(data);
});

app.post(`/addProductTheme`, async (req, resp) => {
  let data = new productThemeModel(req.body);
  let result = data.save();
  resp.send(result);
});

app.put(`/editProductTheme/:id`, async (req, resp) => {
  let data = await productThemeModel.updateOne(
    { _id: req.params.id },
    { $set: req.body },
  );
  resp.send(data);
});

app.delete(`/deleteProductTheme/:id`, async (req, resp) => {
  let data = await productThemeModel.deleteOne({ _id: req.params.id });
  resp.send(data);
});

//product
app.get(`/allProducts`, async (req, resp) => {
  const data = await productModel
    .find()
    .populate("themeId")
    .populate("catId")
    .populate("typeId");

  resp.json(data);
});

app.get(`/selectedProduct/:id`, async (req, resp) => {
  const data = await productModel
    .find({ _id: req.params.id })
    .populate("themeId")
    .populate("catId")
    .populate("typeId");

  resp.json(data);
});

app.post(`/addProduct`, async (req, resp) => {
  let data = new productModel(req.body);
  let result = data.save();
  resp.send(result);
});

app.put(`/editProduct/:id`, async (req, resp) => {
  let data = await productModel.updateOne(
    { _id: req.params.id },
    { $set: req.body },
  );
  resp.send(data);
});

app.delete(`/deleteProduct/:id`, async (req, resp) => {
  let data = await productModel.deleteOne({ _id: req.params.id });
  resp.send(data);
});

// users
app.get(`/user/:id`, async (req, resp) => {
  let data = await userModel.find({ _id: req.params.id }).populate("plan");
  resp.send(data);
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ name: username }).populate("plan");

    if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    if (user.password !== password) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    const userData = {
      id: user._id,
      name: user.name,
      plan: user.plan,
    };

    res.send(userData);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post(`/adduser`, async (req, resp) => {
  let data = new userModel(req.body);
  let result = data.save();
  resp.send(result);
});

app.put(`/userEdit/:id`, async (req, resp) => {
  let data = await userModel.updateOne(
    { _id: req.params.id },
    { $set: req.body },
  );
  resp.send(data);
});

app.delete(`/user/delete/:id`, async (req, resp) => {
  let data = await userModel.deleteOne({ _id: req.params.id });
  resp.send(data);
});

// cartData
app.get(`/userCart/:id`, async (req, resp) => {
  const data = await cartModel
    .find({ userId: req.params.id })
    .populate("userId")
    .populate({
      path: "products.productId",
    });

  resp.json(data);
});

app.post(`/addToCart`, async (req, resp) => {
  const data = await categoryModel(req.body);
  let result = data.save();
  resp.send(result);
});

app.put(`/modCartProducts/:id`, async (req, resp) => {
  let data = await cartModel.updateOne(
    { userId: req.params.id },
    { $set: req.body },
  );
  resp.send(data);
});

app.delete(`/emptyCart/:id`, async (req, resp) => {
  const data = await cartModel.deleteOne({ userId: req.params.id });
  resp.send(data);
});

app.listen(5000);
