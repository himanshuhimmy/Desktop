import React, { useContext, useState } from "react";
import AppContext from "../ContextStore/AppContext";
import add from "../assets/Svgs/add.svg";
import sub from "../assets/Svgs/minus.svg";

const MembErshipPage = () => {
  let { membershipInfo } = useContext(AppContext);

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
    gold: "text-yellow-400",
    silver: "text-gray-300",
    basic: "text-orange-500",
    platinum: "text-[#3e62e0]",
  };

  const bgColours = {
    gold: "bg-white",
    silver: "bg-[#fcfffe]",
    Basic: "bg-white",
    platinum:
      "bg-gradient-to-br from-[#0a1a3a] to-[#0f2a63] rounded-2xl p-8 text-white",
  };

  const borderColour = {
    gold: "border border-yellow-400",
    silver: "border border-gray-300",
    basic: "border border-gray-300",
    platinum: "border border-blue-500",
  };

  let buttonColour = {
    gold: "bg-gradient-to-r from-[#f7b718] to-[#e07b00] text-white px-2 py-3 rounded-xl",
    silver:
      "bg-gradient-to-r from-[#8a99ad] to-[#6b7b92] text-white px-2 py-3 rounded-xl",
    basic:
      "bg-gradient-to-r from-[#0b1730] to-[#0e1f45] text-white px-2 py-3 rounded-xl",
    platinum:
      "bg-gradient-to-r from-[#2d63ff] to-[#1f4ed8] text-white px-2 py-3 rounded-xl",
  };

  return (
    <div className="bg-[#f6f6f8] p-5">
      <div className="w-[90%] m-auto p-7 ">
        <div className="text-center w-[50%] m-auto mb-5">
          <p className="text-[#2960cb] mb-2">Premium Membership</p>
          <h1 className="text-4xl font-extrabold mb-1">
            Choose Your LUXE Tier
          </h1>
          <p className="text-[#959eaa] font-extralight text-xl ">
            Elevate your shopping experience with premium benefits, exclusive
            collections, and priority support tailored for your lifestyle
          </p>
        </div>

        <div className="p-4  flex justify-around ">
          {membershipInfo !== null &&
            membershipInfo.map((info) => {
              return (
                <div
                  key={info._id}
                  className={`w-[23%] p-5 ${borderColour[info.tear]} rounded-2xl ${bgColours[info.tear]} shadow-2xl`}
                >
                  <div className={``}>
                    <h1 className={`${tierColors[info.tear]} text-xl mb-4`}>
                      {info.tear}
                    </h1>
                    <div className="flex mb-4">
                      <h1 className="text-4xl font-semibold">
                        RS {info.price}
                      </h1>
                      <p className="text-[#959eaa] font-extralight  flex items-end ">
                        / {info.duration}
                      </p>
                    </div>
                    <div className="mx-5 text-center">
                      <button className={buttonColour[info.tear]}>
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
                <p className="mt-4 text-gray-600 w-[80%] transition-all duration-300">
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
