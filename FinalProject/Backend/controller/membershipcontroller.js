import membershipModel from "../models/membershipSchema.js";
import userModel from "../models/userSchema.js";

//! GET /api/memberships
export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await membershipModel
      .find({ isActive: true })
      .sort({ price: 1 });
    res.status(200).json({ memberships });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/memberships/:id
export const getMembershipById = async (req, res) => {
  try {
    const membership = await membershipModel.findById(req.params.id);
    if (!membership)
      return res.status(404).json({ message: "Membership not found" });
    res.status(200).json({ membership });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! POST /api/memberships
export const createMembership = async (req, res) => {
  try {
    const membership = await membershipModel.create(req.body);
    res.status(201).json({ membership });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// !PUT /api/memberships/:id
export const updateMembership = async (req, res) => {
  try {
    const membership = await membershipModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!membership)
      return res.status(404).json({ message: "Membership not found" });
    res.status(200).json({ membership });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! DELETE /api/memberships/:id
export const deleteMembership = async (req, res) => {
  try {
    await membershipModel.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(200).json({ message: "Membership deactivated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! POST /api/memberships/subscribe
//? Body: { userId, membershipId }
export const subscribe = async (req, res) => {
  try {
    const { userId, membershipId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const plan = await membershipModel.findById(membershipId);
    if (!plan || !plan.isActive)
      return res.status(404).json({ message: "Plan not found" });

    const planExpiresAt = new Date(Date.now() + plan.durationDays * 86_400_000);

    const user = await userModel
      .findByIdAndUpdate(
        userId,
        { planId: plan._id, planExpiresAt },
        { new: true },
      )
      .select("-password")
      .populate("planId");

    res.status(200).json({ message: "Subscribed successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
