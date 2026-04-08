import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../ContextStore/AdminContext";
import axios from "axios";
import ProductForm from "./Form/ProductForm";

const SelectedProduct = () => {
  return (
    <div className="w-[90%] m-auto">
      <ProductForm />
    </div>
  );
};

export default SelectedProduct;
