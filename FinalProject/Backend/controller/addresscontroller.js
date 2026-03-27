import userModel from "../models/userSchema.js";

//! GET /api/users/:userId/addresses  (auth)
export const getAddresses = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.userId)
      .select("addresses");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//!  POST /api/users/:userId/addresses  (auth)
export const addAddress = async (req, res) => {
  try {
    const { label, line1, line2, city, state, pincode, country } = req.body;

    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.push({ label, line1, line2, city, state, pincode, country });
    await user.save();

    res.status(201).json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PUT /api/users/:userId/addresses/:index  (auth)
//? :index is the position in the addresses array (0, 1, 2...)
export const updateAddress = async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.addresses[index]) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Merge existing address with incoming updates
    user.addresses[index] = {
      ...user.addresses[index].toObject(),
      ...req.body,
    };
    await user.save();

    res.status(200).json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! DELETE /api/users/:userId/addresses/:index  (auth)
export const deleteAddress = async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.addresses[index]) {
      return res.status(404).json({ message: "Address not found" });
    }

    user.addresses.splice(index, 1);
    await user.save();

    res.status(200).json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
