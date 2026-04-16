import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputBar from "../CommonUi/InputBar";
import Button from "../CommonUi/Button";
import UserRegister from "././../assets/Register&loginPages/UserRegister.png";
import { useDispatch, useSelector } from "react-redux";
import { setInputText } from "../Store/appSlice";

const RegisterUser = () => {
  let dispach = useDispatch();
  let inputText = useSelector((state) => state.app.inputText);
  let membershipInfo = useSelector((state) => state.app.membershipInfo);

  const [selectedMembership, setSelectedMembership] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (value, field) => {
    dispach(setInputText({ ...inputText, [field]: value }));
  };

  const handleRegister = async () => {
    setError("");

    if (!inputText?.name || !inputText?.email || !inputText?.password) {
      return setError("All fields are required.");
    }
    if (inputText.password !== inputText.Confirmpassword) {
      return setError("Passwords do not match.");
    }
    if (!selectedMembership) {
      return setError("Please select a membership tier.");
    }

    setLoading(true);
    try {
      const finalData = {
        name: inputText.name,
        email: inputText.email,
        password: inputText.password,
        plan: selectedMembership,
        isActive: true,
      };

      await axios.post("http://localhost:5000/api/auth/register", finalData);
      dispach(setInputText(null));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden">
        <div className="hidden lg:block w-1/2 relative">
          <img
            className="w-full h-full object-cover"
            src={UserRegister}
            alt="Luxury Membership"
          />
          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 to-transparent z-10" />

          <div className="absolute bottom-0 inset-x-0 p-12 pb-20 text-center z-20">
            <p className="text-blue-600 font-bold tracking-[.3em] uppercase text-xs mb-4">
              Membership Premiere
            </p>
            <h1 className="text-white text-5xl font-bold leading-tight mb-6">
              Step into the <br /> World of LUXE
            </h1>
            <p className="text-white/70 text-lg max-w-md mx-auto font-light">
              Join an exclusive community of connoisseurs. Gain early access to
              bespoke styling and limited collections.
            </p>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-12 overflow-y-auto">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-black text-gray-900">
                Create Account
              </h2>
              <p className="text-gray-500 mt-2">
                Enter your details to begin your journey.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold text-center animate-pulse">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                  Full Name
                </label>
                <InputBar
                  onChange={(e) => handleOnChange(e.target.value, "name")}
                  placeholder="e.g. Roman Reigns"
                  type="text"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                  Email Address
                </label>
                <InputBar
                  onChange={(e) => handleOnChange(e.target.value, "email")}
                  placeholder="luxury@example.com"
                  type="email"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                    Password
                  </label>
                  <InputBar
                    onChange={(e) => handleOnChange(e.target.value, "password")}
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                    Confirm
                  </label>
                  <InputBar
                    onChange={(e) =>
                      handleOnChange(e.target.value, "Confirmpassword")
                    }
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-400 block text-center mb-3">
                Select Your Tier
              </label>
              <div className="flex gap-3 justify-center">
                {membershipInfo?.memberships.map((tier) => (
                  <button
                    key={tier._id}
                    onClick={() => setSelectedMembership(tier._id)}
                    className={`flex-1 py-3 rounded-2xl font-bold transition-all duration-300 border-2 ${
                      selectedMembership === tier._id
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-inner"
                        : "border-gray-100 text-gray-400 hover:border-gray-200"
                    }`}
                  >
                    {tier.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
              <input type="checkbox" className="rounded accent-blue-600" />
              <span>I agree to the Terms & Conditions</span>
            </div>

            <Button
              onClick={handleRegister}
              className="w-full py-4 rounded-2xl text-lg shadow-xl shadow-blue-100"
              disabled={loading}
            >
              {loading ? "Processing..." : "Register Now"}
            </Button>

            <p className="text-center text-gray-500">
              Already a member?{" "}
              <button
                onClick={() => navigate("/")}
                className="text-blue-600 font-bold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
