import React from "react";
import tick from "../assets/Svgs/tick.svg";
import Button from "../CommonUi/Button";

const TermsConditions = () => {
  let subtitle = "font-extralight mb-3";
  let title = "text-2xl font-bold";
  let noColour = "text-[#1047bc] items-center flex justify-center ";

  return (
    <div className=" bg-[#f6f6f8]">
      <div className="w-[65%] m-auto ">
        <div className="p-7">
          <div className="my-5">
            <h1 className="text-5xl font-bold">Terms &</h1>
            <h1 className="text-5xl font-bold text-[#1047bc]"> Conditions</h1>
          </div>
          <hr className="border-gray-200  " />
          <p className="font-extralight m-2">Last updated: October 24, 2023</p>
          <hr className="border-gray-200  " />

          <div className="m-5">
            <div className="flex gap-4 mb-1">
              <p className={noColour}>01</p>
              <h1 className={title}>Use of Website</h1>
            </div>
            <p className={subtitle}>
              Welcome to LUXE. By accessing this website, you agree to be bound
              by these Terms and Conditions. The content provided on this
              platform is for your personal, non-commercial use only.
            </p>
            <p className={subtitle}>
              Users are responsible for maintaining the confidentiality of their
              account information and for all activities that occur under their
              account. LUXE reserves the right to refuse service, terminate
              accounts, or cancel orders at our sole discretion.
            </p>
          </div>

          <div className="m-5">
            <div className="flex gap-4 mb-1">
              <p className={noColour}>02 </p>
              <h1 className={title}>Intellectual Property</h1>
            </div>
            <p className={subtitle}>
              All design elements, including but not limited to text, graphics,
              logos, icons, images, and software, are the property of LUXE and
              are protected by international copyright and trademark laws.
            </p>
            <p className={`${subtitle} bg-[#eaedf6] p-4 rounded-xs`}>
              "LUXE and our associated logos are registered trademarks.
              Unauthorized use of our brand identity is strictly prohibited."
            </p>
          </div>

          <div className="m-5">
            <div className="flex gap-4 mb-1">
              <p className={noColour}>03</p>
              <h1 className={title}>Purchase & Payments</h1>
            </div>
            <p className={subtitle}>
              Prices for our products are subject to change without notice. We
              reserve the right at any time to modify or discontinue the Service
              (or any part or content thereof) without notice at any time.
            </p>
            <div className="flex">
              <img className="h-5" src={tick} alt="tick" />
              <p className={subtitle}>
                All payments are processed through secure, encrypted gateways.
              </p>
            </div>
            <div className="flex">
              <img className="h-5" src={tick} alt="tick" />
              <p className={subtitle}>
                We accept major credit cards and premium digital payment
                methods.
              </p>
            </div>
            <div className="flex">
              <img className="h-5" src={tick} alt="tick" />
              <p className={subtitle}>
                Orders are confirmed only upon successful payment authorization.
              </p>
            </div>
          </div>

          <div className="m-5">
            <div className="flex gap-4 mb-1">
              <p className={noColour}>04</p>
              <h1 className={title}>Limitation of Liability</h1>
            </div>
            <p className={subtitle}>
              To the maximum extent permitted by law, LUXE shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages, or any loss of profits or revenues, whether incurred
              directly or indirectly.
            </p>
          </div>
          <hr className="border-gray-200  " />

          <div className="m-5 flex text-white bg-[#0f172a] p-6 rounded-3xl justify-around">
            <div className="gap-4 mb-1 w-[50%]">
              <h1 className="text-2xl font-semibold">Have questions?</h1>
              <p className={subtitle}>
                Our legal team is here to clarify any points regarding our terms
                of service.
              </p>
            </div>
            <div className="w-[50%] flex justify-center items-center">
              <Button> Contact Our Team</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
