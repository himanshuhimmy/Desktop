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
      <div className="w-full max-w-4xl mx-auto px-4 py-4">
        <div>
          <p className="inline-block p-1 px-3 rounded-2xl bg-[#dde5f2] font-semibold text-[#124abf] text-center mb-3">
            Security First
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-7">Privacy Policy</h1>
          <p className="font-extralight">
            Last updated: October 2023. At LUXE, we believe that your privacy is
            a fundamental human right. This policy outlines how we protect and
            respect your data across our entire premium service ecosystem.
          </p>
        </div>

        <div className="m-4 md:m-6">
          <p className="flex mb-2">
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

        <div className="m-4 md:m-6">
          <p className="flex mb-2">
            <img className="h-7 mx-2" src={data} alt="" />
            <h1 className={title}>2. Data Collection</h1>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="bg-white p-5 rounded-2xl shadow-2xl">
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
            <p className="bg-white p-5 rounded-2xl shadow-2xl">
              <p className="flex">
                <img className="h-6 mx-2" src={tick} alt="" />
                <h1 className="font-light">Automatic Information</h1>
              </p>
              <ul className="text-sm list-disc font-extralight p-4 ml-4">
                <li>IP address and device markers</li>
                <li>Browser type and version</li>
                <li>Page interaction data</li>
                <li>Geolocation (with consent)</li>
              </ul>
            </p>
          </div>
          <div className="h-[25vh] md:h-[30vh] overflow-hidden w-full rounded-3xl my-5">
            <img
              className="w-full h-full object-cover object-center"
              src={secure}
              alt="secure"
            />
          </div>
        </div>

        <div className="m-4 md:m-6">
          <p className="flex mb-2">
            <img className="h-7" src={cookie} alt="" />
            <h1 className={title}>3. Cookies and Tracking</h1>
          </p>
          <p className={subtitle}>
            LUXE uses cookies to recognize your browser, learn about your
            interests, and provide you with essential features and services. We use:
          </p>
          {[
            { num: "01", name: "Essential Cookies", desc: "Necessary for the website to function, such as maintaining your login session." },
            { num: "02", name: "Analytical Cookies", desc: "Help us understand how visitors interact with our website to improve our interface." },
            { num: "03", name: "Preference Cookies", desc: "Remember your settings like language or region for a customized experience." },
          ].map((c) => (
            <div key={c.num} className="flex gap-3 mb-2">
              <h1 className="flex items-center font-bold shrink-0">{c.num}</h1>
              <div>
                <h1>{c.name}</h1>
                <p className={subtitle}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="m-4 md:m-6">
          <p className="flex mb-2">
            <img className="h-7" src={law} alt="" />
            <h1 className={title}>4. Your User Rights</h1>
          </p>
          <p className={subtitle}>
            You have full control over your data. Under various global privacy
            regulations (including GDPR and CCPA), you have the right to:
          </p>
          {[
            { label: "Right to Access:", desc: "Request a copy of the personal data we hold about you." },
            { label: "Right to Erasure:", desc: "Request that we delete your personal information from our systems." },
            { label: "Right to Rectification:", desc: "Ask us to correct inaccurate or incomplete data." },
            { label: "Right to Portability:", desc: "Receive your data in a structured, machine-readable format." },
          ].map((r) => (
            <div key={r.label} className="flex gap-2 mb-2">
              <img className="h-3 mt-1.5 shrink-0" src={right} alt="" />
              <div className="flex flex-wrap gap-1">
                <h1 className="font-medium">{r.label}</h1>
                <p className={subtitle}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="m-4 md:m-5 flex flex-col sm:flex-row text-white bg-[#0f172a] p-6 rounded-3xl gap-6 items-center">
          <div className="w-full sm:w-1/2">
            <h1 className="text-2xl font-semibold">
              Have questions about your privacy?
            </h1>
            <p className="font-extralight text-xs mt-1">
              Our dedicated privacy officer is available to address any concerns
              you may have regarding your data.
            </p>
          </div>
          <div className="w-full sm:w-1/2 flex justify-center">
            <Button className="bg-white text-gray-900 hover:bg-gray-100">Contact Our Team</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
