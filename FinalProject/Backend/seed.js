import mongoose from "mongoose";
import {
  productModel,
  productThemeModel,
  categoryModel,
  productTypeModel,
} from "./schema.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/WebsiteData";

const genders = ["male", "female", "kids"];
const sizes = ["S", "M", "L", "XL"];

function randomImage() {
  return `https://picsum.photos/400/500?random=${Math.floor(
    Math.random() * 10000,
  )}`;
}

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Clear old data
    await productModel.deleteMany({});
    await productThemeModel.deleteMany({});
    await categoryModel.deleteMany({});
    await productTypeModel.deleteMany({});

    console.log("Old data removed");

    // THEMES
    const themes = await productThemeModel.insertMany([
      { theme: "harrypotter", exclusive: true },
      { theme: "marvel", exclusive: true },
      { theme: "dc", exclusive: true },
      { theme: "stranger things", exclusive: true },
      { theme: "regular", exclusive: false },
    ]);

    // CATEGORIES
    const categories = await categoryModel.insertMany([
      { cat: "tshirts" },
      { cat: "hoodies" },
      { cat: "pants" },
      { cat: "shoes" },
      { cat: "accessories" },
    ]);

    // PRODUCT TYPES
    const types = await productTypeModel.insertMany([
      { type: "oversized", catId: categories[0]._id },
      { type: "regular fit", catId: categories[0]._id },

      { type: "zip hoodie", catId: categories[1]._id },

      { type: "cargo", catId: categories[2]._id },
      { type: "denim", catId: categories[2]._id },

      { type: "sneakers", catId: categories[3]._id },
      { type: "running", catId: categories[3]._id },

      { type: "cap", catId: categories[4]._id },
    ]);

    const products = [];

    for (let i = 0; i < 30; i++) {
      const variants = [];
      let totalStock = 0;

      // Generate variants
      for (const gender of genders) {
        for (const size of sizes) {
          const stock = Math.floor(Math.random() * 20) + 1;

          totalStock += stock;

          variants.push({
            gender: gender,
            size: size,
            stock: stock,
            images: {
              display: randomImage(),
              poses: [randomImage(), randomImage(), randomImage()],
            },
          });
        }
      }

      // Random category
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      // Filter types belonging to that category
      const validTypes = types.filter(
        (t) => t.catId.toString() === randomCategory._id.toString(),
      );

      const randomType =
        validTypes[Math.floor(Math.random() * validTypes.length)];

      const randomTheme = themes[Math.floor(Math.random() * themes.length)];

      products.push({
        quantity: totalStock,
        price: Math.floor(Math.random() * 2000) + 500,
        variants: variants,
        themeId: randomTheme._id,
        catId: randomCategory._id,
        typeId: randomType._id,
      });
    }

    await productModel.insertMany(products);

    console.log("Database seeded successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
  }
}

seedDatabase();
