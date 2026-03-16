import React from "react";

import shield from "../assets/Svgs/Privacy&policy/shield.svg";
import data from "../assets/Svgs/Privacy&policy/data.svg";
import law from "../assets/Svgs/Privacy&policy/law.svg";
import right from "../assets/Svgs/Privacy&policy/right-arrow.svg";
import cookie from "../assets/Svgs/Privacy&policy/cookie.svg";
import tick from "../assets/Svgs/tick.svg";
import secure from "../assets/Svgs/Privacy&policy/secure.png";
import Button from "../CommonUi/Button";

const Policy = () => {
  let title = "text-2xl mb-3";
  let subtitle = "font-extralight mb-3";
  return (
    <div className="bg-[#f6f6f8]">
      <div className=" w-[60%] m-auto p-4">
        <div>
          <p className="w-[15%] p-1 rounded-2xl bg-[#dde5f2] font-semibold text-[#124abf]">
            <p className="text-center">Security First</p>
          </p>
          <h1 className="text-5xl font-bold mb-7">Privacy Policy</h1>
          <p className="font-extralight">
            Last updated: October 2023. At LUXE, we believe that your privacy is
            a fundamental human right. This policy outlines how we protect and
            respect your data across our entire premium service ecosystem.
          </p>
        </div>

        <div className="m-6">
          <p className="flex mb-2 ">
            <img className="h-7" src={shield} alt="" />
            <h1 className={title}>1. Our Privacy Philosophy</h1>
          </p>
          <p className={subtitle}>
            Luxury is built on trust. We are committed to maintaining the
            highest standards of data protection. We do not sell your personal
            data to third parties. Every piece of information we collect is used
            solely to enhance your experience with LUXE.
          </p>
          <p className={subtitle}>
            We implement state-of-the-art encryption and security protocols to
            ensure that your interaction with our services remains confidential
            and secure.
          </p>
        </div>

        <div className="m-6">
          <p className="flex mb-2 ">
            <img className="h-7 mx-2" src={data} alt="" />
            <h1 className={title}>2. Data Collection</h1>
          </p>
          <div className="flex justify-around ">
            <p className="w-[40%] bg-white p-5 rounded-2xl shadow-2xl ">
              <p className="flex">
                <img className="h-6 mx-2" src={tick} alt="" />
                <h1 className="font-light">Information You Provide</h1>
              </p>
              <ul className="text-sm list-disc font-extralight p-4 ml-4">
                <li>Contact details (Name, Email, Phone)</li>
                <li>Account credentials</li>
                <li>Billing and payment information</li>
                <li>Preference settings</li>
              </ul>
            </p>
            <p className="w-[40%] bg-white p-5 rounded-2xl shadow-2xl ">
              <p className="flex">
                <img className="h-6 mx-2" src={tick} alt="" />
                <h1 className="font-light">Automatic Information</h1>
              </p>
              <ul className="text-sm list-disc font-extralight p-4 ml-4">
                <li> IP address and device markers</li>
                <li>Browser type and version</li>
                <li>Page interaction data</li>
                <li>Geolocation (with consent)</li>
              </ul>
            </p>
          </div>
          <div className="h-[30vh] overflow-hidden w-[90%] m-auto rounded-3xl my-5">
            <img
              className="w-full h-full object-cover object-center"
              src={secure}
              alt="secure"
            />
          </div>
        </div>

        <div className="m-6">
          <p className="flex mb-2 ">
            <img className="h-7" src={cookie} alt="" />
            <h1 className={title}>3. Cookies and Tracking</h1>
          </p>
          <p className={subtitle}>
            LUXE uses cookies to recognize your browser, learn about your
            interests, and provide you with essential features and services. We
            use:
          </p>
          <div className="flex">
            <h1 className="flex items-center m-3">01</h1>
            <div>
              <h1>Essential Cookies</h1>
              <p className={subtitle}>
                Necessary for the website to function, such as maintaining your
                login session.
              </p>
            </div>
          </div>

          <div className="flex">
            <h1 className="flex items-center m-3">02</h1>
            <div>
              <h1>Analytical Cookies</h1>
              <p className={subtitle}>
                Help us understand how visitors interact with our website to
                improve our interface.
              </p>
            </div>
          </div>

          <div className="flex">
            <h1 className="flex items-center m-3">03</h1>
            <div>
              <h1>Preference Cookies</h1>
              <p className={subtitle}>
                Remember your settings like language or region for a customized
                experience.
              </p>
            </div>
          </div>
        </div>

        <div className="m-6">
          <p className="flex mb-2 ">
            <img className="h-7" src={law} alt="" />
            <h1 className={title}>4. Your User Rights</h1>
          </p>
          <p className={subtitle}>
            You have full control over your data. Under various global privacy
            regulations (including GDPR and CCPA), you have the right to:
          </p>
          <div className="flex ">
            <img className="h-3 " src={right} alt="" />
            <div className="flex ">
              <h1 className="mx-2">Right to Access:</h1>
              <p className={subtitle}>
                Request a copy of the personal data we hold about you.
              </p>
            </div>
          </div>

          <div className="flex ">
            <img className="h-3 " src={right} alt="" />
            <div className="flex ">
              <h1 className="mx-2">Right to Erasure: </h1>
              <p className={subtitle}>
                Request that we delete your personal information from our
                systems.
              </p>
            </div>
          </div>

          <div className="flex ">
            <img className="h-3 " src={right} alt="" />
            <div className="flex ">
              <h1 className="mx-2">Right to Rectification: </h1>
              <p className={subtitle}>
                Ask us to correct inaccurate or incomplete data.
              </p>
            </div>
          </div>

          <div className="flex ">
            <img className="h-3 " src={right} alt="" />
            <div className="flex ">
              <h1 className="mx-2">Right to Portability: </h1>
              <p className={subtitle}>
                Receive your data in a structured, machine-readable format.
              </p>
            </div>
          </div>
        </div>

        <div className="m-5 flex text-white bg-[#0f172a] p-6 rounded-3xl justify-around">
          <div className="gap-4 mb-1 w-[50%]">
            <h1 className="text-2xl font-semibold">
              Have questions about your privacy?
            </h1>
            <p className="font-extralight text-xs">
              Our dedicated privacy officer is available to address any concerns
              you may have regarding your data.
            </p>
          </div>
          <div className="w-[50%] flex justify-center items-center">
            <Button> Contact Our Team</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
