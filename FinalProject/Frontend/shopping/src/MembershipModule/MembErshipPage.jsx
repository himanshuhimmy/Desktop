import React, { useState } from "react";
import { useSelector } from "react-redux";
import add from "../assets/Svgs/add.svg";
import sub from "../assets/Svgs/minus.svg";
import { cn } from "../utils/cn";

const MembErshipPage = () => {
  const membershipInfo = useSelector((state) => state.app.membershipInfo);

  let [active, setActive] = useState(null);

  function toggle(index) {
    setActive(active === index ? null : index);
  }

  const faq = [
    {
      q: "How does the billing cycle work?",
      a: "LUXE memberships are billed monthly on the same calendar day you started your subscription. Your benefits activate immediately upon successful payment.",
    },
    {
      q: "Can I upgrade or downgrade my plan at any time?",
      a: "Yes, you can change your membership tier at any time from your Account Settings. Upgrades take effect immediately (pro-rated), while downgrades take effect at the start of your next billing cycle.",
    },
    {
      q: "What are 'Theme' collections?",
      a: "These are limited-edition collaborations with major franchises (e.g., Marvel, Disney, Harry Potter). Gold and Platinum members get first priority and guaranteed access to these high-demand items.",
    },
    {
      q: "Are discounts stackable with sale items?",
      a: "Your membership discount applies to the current listed price, including already discounted sale items, giving you the best possible price available.",
    },
  ];

  const tierColors = {
    Hero: "text-yellow-400",
    Fan: "text-gray-300",
    Free: "text-orange-500",
    Legend: "text-[#3e62e0]",
  };

  const bgColours = {
    Hero: "bg-white",
    Fan: "bg-[#fcfffe]",
    Free: "bg-white",
    Legend:
      "bg-gradient-to-br from-[#0a1a3a] to-[#0f2a63] rounded-2xl p-8 text-white",
  };

  const borderColour = {
    Hero: "border border-yellow-400",
    Fan: "border border-gray-300",
    Free: "border border-gray-300",
    Legend: "border border-blue-500",
  };

  let buttonColour = {
    Hero: "bg-gradient-to-r from-[#f7b718] to-[#e07b00] text-white px-2 py-3 rounded-xl",
    Fan: "bg-gradient-to-r from-[#8a99ad] to-[#6b7b92] text-white px-2 py-3 rounded-xl",
    Free: "bg-gradient-to-r from-[#0b1730] to-[#0e1f45] text-white px-2 py-3 rounded-xl",
    Legend:
      "bg-gradient-to-r from-[#2d63ff] to-[#1f4ed8] text-white px-2 py-3 rounded-xl",
  };

  const formatDuration = (days) => {
    if (days >= 36500) return "Lifetime";
    if (days >= 365) {
      const years = Math.floor(days / 365);
      return `${years} year${years > 1 ? "s" : ""}`;
    } else if (days >= 30) {
      const months = Math.floor(days / 30);
      return `${months} month${months > 1 ? "s" : ""}`;
    } else {
      return `${days} day${days > 1 ? "s" : ""}`;
    }
  };

  return (
    <div className="bg-[#f6f6f8] p-5">
      <div className="w-full max-w-7xl mx-auto px-4 py-7">
        <div className="text-center w-full max-w-xl mx-auto mb-5">
          <p className="text-[#2960cb] mb-2 underline">Premium Membership</p>
          <h1 className="text-4xl font-extrabold mb-1">
            Choose Your LUXE Tier
          </h1>
          <p className="text-[#959eaa] font-extralight text-xl ">
            Elevate your shopping experience with premium benefits, exclusive
            collections, and priority support tailored for your lifestyle
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {membershipInfo !== null &&
            membershipInfo.memberships.map((info) => {
              return (
                <div
                  key={info._id}
                  className={cn(
                    "w-full p-5 rounded-2xl shadow-2xl",
                    borderColour[info.name],
                    bgColours[info.name],
                  )}
                >
                  <div>
                    <h1 className={cn("text-xl mb-4 font-bold", tierColors[info.name])}>
                      {info.name}
                    </h1>
                    <div className="flex mb-4">
                      <h1 className="text-4xl font-semibold">
                        RS {info.price}
                      </h1>
                      <p className="text-[#959eaa] font-extralight  flex items-end ">
                        /{formatDuration(info.durationDays)}
                      </p>
                    </div>
                    <div className="mx-5 text-center">
                      <button className={cn(buttonColour[info.name])}>
                        Select Plan
                      </button>
                    </div>
                    <hr className="my-6 border-gray-200" />
                    {info.perks.map((perk, index) => (
                      <p key={index} className="mb-3">
                        {perk}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="w-full p-6">
          {faq.map((item, index) => (
            <div key={index} className="border-b py-5">
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <p className="font-medium">{item.q}</p>

                <img
                  className="h-4"
                  src={active === index ? sub : add}
                  alt="toggle"
                />
              </button>

              {active === index && (
                <p className="mt-4 text-gray-600 w-full md:w-[80%] transition-all duration-300">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembErshipPage;
