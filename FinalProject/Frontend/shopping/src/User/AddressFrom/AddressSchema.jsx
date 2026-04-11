import { z } from "zod";

const addressSchema = z.object({
  label: z.string().min(2, "Label is required"),
  line1: z.string().min(5, "Address too short"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  city: z.string().min(2),
  state: z.string().min(2),
});

export const formSchema = z.object({
  addresses: z.array(addressSchema),
});
