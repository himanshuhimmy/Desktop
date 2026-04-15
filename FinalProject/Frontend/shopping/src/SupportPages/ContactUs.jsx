import React from "react";
import InputBar from "../CommonUi/InputBar";
import Button from "../CommonUi/Button";
import show from "../assets/SupportPges/ContactUs.png";

// ! working Form to be added
const ContactUs = () => {
  return (
    <div className="bg-[rgb(246,246,248)] ">
      <div className="flex pt-10 w-[75%] m-auto">
        <div className="w-[50%] p-4">
          <div className="">
            <p className="text-[#104eaf]">Inquiries</p>
            <h1 className="text-5xl font-semibold mb-1">Contact Us</h1>
            <p className="mb-5 font-light">
              Whether you're seeking styling advice or tracking an exquisite
              piece, our concierge team is at your service.
            </p>
          </div>

          <div className="flex mb-6">
            <div className="w-[50%]">
              <h1 className="text-xl font-bold mb-2">Client Service</h1>
              <p className="font-light">Available Mon—Fri</p>
              <p className="font-light mb-4 ">9am — 6pm EST</p>
              <p className="font-light text-[#104eaf]">concierge@luxe.com</p>
            </div>
            <div className="w-[50%]">
              <h1 className="text-xl font-bold mb-2">Global Atelier</h1>
              <p className="font-light mb-4">
                742 Madison Avenue New York, NY 10065
              </p>

              <p className="font-light text-[#104eaf] underline">View on Map</p>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-2">Follow our journey</h1>
            <div>
              <p className="font-light">Instagram</p>
              <p className="font-light">Facebook</p>
            </div>
            <div className="w-[90%] h-[40vh] m-auto overflow-hidden mt-6 opacity-85">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src={show}
                alt="show"
              />
            </div>
          </div>
        </div>
        <div className="w-[50%] ">
          <div className="w-[80%]  m-auto p-7 border-amber-50 shadow-2xs rounded-3xl bg-white">
            <h1 className="text-2xl mb-4 text-center underline">
              Form Fill Up
            </h1>
            <div className="flex gap-2 mb-3">
              <p>
                <p>First Name</p>
                <InputBar />
              </p>
              <p>
                <p>Last Name</p>
                <InputBar />
              </p>
            </div>
            <div className="mb-4">
              <p>Email Address</p>
              <InputBar />
            </div>
            <div className="mb-4">
              <p>Subject</p>
              <InputBar />
            </div>
            <div className="text-center w-full">
              <p className="mb-1">How can we assist you?</p>
              <textarea className="w-[90%] h-25 p-1  m-auto rounded-xl mb-4 bg-[rgb(246,246,248)]"></textarea>
            </div>
            <Button>Send Message</Button>
            <p className="mt-2 font-extralight text-center">
              By submitting, you agree to our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
