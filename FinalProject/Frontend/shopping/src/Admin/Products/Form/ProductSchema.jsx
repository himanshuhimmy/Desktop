import { z } from "zod";

const sizeSchema = z.object({
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  sku: z.string().min(1, "SKU required"),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, "Stock cannot be negative"),
});

const variantSchema = z.object({
  gender: z.enum(["male", "female", "kids", "unisex"]),
  color: z.string().min(1, "Color required"),
  sizes: z.array(sizeSchema).min(1, "At least one size required"),
});

export const ProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(1, "Price must be greater than 0"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  catId: z.string().min(1, "Category required"),
  typeId: z.string().min(1, "Type required"),
  themeId: z.string().min(1, "Theme required"),
  isActive: z.boolean(),
  variants: z.array(variantSchema).min(1, "At least one variant required"),
});
