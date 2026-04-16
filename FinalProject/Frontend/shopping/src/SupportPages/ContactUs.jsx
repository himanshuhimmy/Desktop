import React from "react";
import InputBar from "../CommonUi/InputBar";
import Button from "../CommonUi/Button";
import show from "../assets/SupportPges/ContactUs.png";

// ! working Form to be added
const ContactUs = () => {
  return (
    <div className="bg-[rgb(246,246,248)]">
      <div className="flex flex-col md:flex-row pt-10 w-full max-w-6xl mx-auto px-4">
        {/* Left: info */}
        <div className="w-full md:w-1/2 p-4">
          <div>
            <p className="text-[#104eaf]">Inquiries</p>
            <h1 className="text-3xl md:text-5xl font-semibold mb-1">Contact Us</h1>
            <p className="mb-5 font-light">
              Whether you're seeking styling advice or tracking an exquisite
              piece, our concierge team is at your service.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row mb-6 gap-4">
            <div className="w-full sm:w-1/2">
              <h1 className="text-xl font-bold mb-2">Client Service</h1>
              <p className="font-light">Available Mon—Fri</p>
              <p className="font-light mb-4">9am — 6pm EST</p>
              <p className="font-light text-[#104eaf]">concierge@luxe.com</p>
            </div>
            <div className="w-full sm:w-1/2">
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
            <div className="w-full h-[30vh] md:h-[40vh] overflow-hidden mt-6 opacity-85">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src={show}
                alt="show"
              />
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="w-full md:w-1/2 p-4">
          <div className="w-full max-w-md mx-auto p-7 shadow-sm rounded-3xl bg-white">
            <h1 className="text-2xl mb-4 text-center underline">Form Fill Up</h1>
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <div className="w-full sm:w-1/2">
                <p>First Name</p>
                <InputBar />
              </div>
              <div className="w-full sm:w-1/2">
                <p>Last Name</p>
                <InputBar />
              </div>
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
              <textarea className="w-full h-25 p-1 rounded-xl mb-4 bg-[rgb(246,246,248)]"></textarea>
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
