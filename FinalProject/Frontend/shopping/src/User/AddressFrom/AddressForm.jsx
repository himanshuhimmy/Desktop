import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./AddressSchema";
import { Plus, Trash2 } from "lucide-react";
import api from "../../utils/api";
import { useSelector } from "react-redux";

const AddressForm = () => {
  let userAddress = useSelector((State) => State.app.userAddress);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addresses:
        userAddress?.user?.addresses?.map((add) => ({
          label: add.label || "",
          line1: add.line1 || "",
          pincode: add.pincode || "",
          city: add.city || "",
          state: add.state || "",
        })) || [],
    },
  });

  useEffect(() => {
    if (userAddress?.user?.addresses) {
      reset({
        addresses: userAddress.user.addresses,
      });
    }
  }, [userAddress, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  async function onSubmit(data) {
    console.log("Form Data:", data);
    try {
      await api.patch(`/users/${userAddress.user._id}`, data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50 relative group"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Address #{index + 1}
            </h3>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <input
                className="p-2 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                {...register(`addresses.${index}.label`)}
                placeholder="Label (e.g. Work)"
              />
              <p className="text-xs text-red-500">
                {errors?.addresses?.[index]?.label?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <input
                className="p-2 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                {...register(`addresses.${index}.pincode`)}
                placeholder="Pincode"
              />
              <p className="text-xs text-red-500">
                {errors?.addresses?.[index]?.pincode?.message}
              </p>
            </div>

            <div className="md:col-span-2 flex flex-col gap-1">
              <input
                className="p-2 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                {...register(`addresses.${index}.line1`)}
                placeholder="Address Line 1"
              />
              <p className="text-xs text-red-500">
                {errors?.addresses?.[index]?.line1?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <input
                className="p-2 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                {...register(`addresses.${index}.city`)}
                placeholder="City"
              />
              <p className="text-xs text-red-500">
                {errors?.addresses?.[index]?.city?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <input
                className="p-2 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                {...register(`addresses.${index}.state`)}
                placeholder="State"
              />
              <p className="text-xs text-red-500">
                {errors?.addresses?.[index]?.state?.message}
              </p>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ label: "", line1: "", pincode: "", city: "", state: "" })
        }
        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={20} /> Add Another Address
      </button>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-400 text-white hover:bg-blue-600 rounded-lg px-3 py-2 transition-all hover:scale-110"
          id="address-submit-btn"
        >
          save
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
