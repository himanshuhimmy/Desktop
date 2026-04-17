import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../../../Store/adminSlice";
import { ProductSchema } from "./ProductSchema";

const ProductForm = () => {
  const dispatch = useDispatch();
  const activeProductId = useSelector((state) => state.admin.activeProductId);
  const ProductType = useSelector((state) => state.admin.ProductType);
  const allThemes = useSelector((state) => state.app.allThemes);
  const allCategorys = useSelector((state) => state.app.allCategorys);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      catId: "",
      typeId: "",
      themeId: "",
      isActive: true,
      variants: [],
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  // Load Data
  useEffect(() => {
    if (!activeProductId) return;
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${activeProductId}`);
        const p = res.data.product;
        console.log(p);
        reset({
          name: p.name,
          price: p.price,
          description: p.description,
          catId: p.catId?._id,
          typeId: p.typeId?._id,
          themeId: p.themeId?._id,
          isActive: p.isActive,
          variants: p.variants.map((v) => ({
            gender: v.gender,
            color: v.color,
            sizes: v.sizes.map((s) => ({
              size: s.size,
              sku: s.sku,
              stock: s.stock,
            })),
          })),
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchProduct();
  }, [activeProductId, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/products/${activeProductId}`, data);

      // THIS UPDATES THE LIST: Trigger global re-fetch
      dispatch(setRefresh());
      navigate("/Admin/Products");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl m-auto p-6 pb-20"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
          <p className="text-gray-400 text-sm">
            Update core details and stock levels
          </p>
        </div>

        <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 rounded-xl border">
          <span className="font-bold text-sm text-gray-600">
            Product Visibility:
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("isActive")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">
              General Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  {...register("name")}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl h-32 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">
              Variants (Color & Gender Groups)
            </h2>
            {variantFields.map((field, index) => (
              <VariantItem
                key={field.id}
                index={index}
                register={register}
                control={control}
                removeVariant={removeVariant}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                appendVariant({
                  gender: "male",
                  color: "",
                  sizes: [{ size: "M", sku: "", stock: 0 }],
                })
              }
              className="w-full py-3 border-2 border-dashed border-blue-200 rounded-xl text-blue-500 font-bold hover:bg-blue-50 transition-all"
            >
              + Add New Variant Group
            </button>
          </div>
        </div>

        {/* Right Column: Categories & Pricing */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">
              Organization
            </h2>
            <div className="space-y-4">
              <SelectBox
                label="Category"
                register={register("catId")}
                options={allCategorys?.categories}
              />
              <SelectBox
                label="Product Type"
                register={register("typeId")}
                options={ProductType?.types}
              />
              <SelectBox
                label="Theme"
                register={register("themeId")}
                options={allThemes?.themes}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Pricing</h2>
            <div className="relative">
              <span className="absolute left-3 top-9 text-gray-400 font-bold">
                Rs
              </span>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base Price
              </label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl font-bold text-blue-600 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all transform hover:-translate-y-1"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

/* --- Sub-Components --- */

const SelectBox = ({ label, register, options }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
      {label}
    </label>
    <select
      {...register}
      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none appearance-none"
    >
      <option value="">Select...</option>
      {options?.map((opt) => (
        <option key={opt._id} value={opt._id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

const VariantItem = ({ index, register, control, removeVariant }) => {
  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `variants.${index}.sizes`,
  });

  return (
    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-blue-900">Variant #{index + 1}</h3>
        <button
          type="button"
          onClick={() => removeVariant(index)}
          className="text-red-400 text-xs font-bold hover:underline"
        >
          Remove Group
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <SelectBox
          label="Gender"
          register={register(`variants.${index}.gender`)}
          options={[
            { _id: "male", name: "Male" },
            { _id: "female", name: "Female" },
            { _id: "kids", name: "Kids" },
            { _id: "unisex", name: "Unisex" },
          ]}
        />
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Color Name
          </label>
          <input
            {...register(`variants.${index}.color`)}
            placeholder="e.g. Midnight Black"
            className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-400 uppercase">
          Stock & Sizes
        </p>
        <div className="grid grid-cols-1 gap-2">
          {sizeFields.map((sField, sIdx) => (
            <div
              key={sField.id}
              className="flex items-center gap-2 bg-white p-2 rounded-lg border"
            >
              <select
                {...register(`variants.${index}.sizes.${sIdx}.size`)}
                className="bg-gray-100 p-1 rounded font-bold text-sm"
              >
                {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>
              <input
                {...register(`variants.${index}.sizes.${sIdx}.sku`)}
                placeholder="SKU"
                className="flex-1 text-sm outline-none"
              />
              <input
                type="number"
                {...register(`variants.${index}.sizes.${sIdx}.stock`, {
                  valueAsNumber: true,
                })}
                className="w-16 text-sm font-bold text-blue-600 outline-none"
              />
              <button
                type="button"
                onClick={() => removeSize(sIdx)}
                className="text-gray-300 hover:text-red-500 px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => appendSize({ size: "M", sku: "", stock: 0 })}
          className="text-xs text-blue-500 font-bold hover:underline mt-2"
        >
          + Add Size
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
