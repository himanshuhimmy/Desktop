import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/WebsiteData")
  .then(() => console.log(""))
  .catch((err) => console.log(err));
