import React from "react";
import HeadderPage from "../Headder&footer/headderPage";
import SupportFooter from "./SupportFooter";
import ContactUs from "./ContactUs";
import TermsConditions from "./Terms&Conditions";

import Policy from "./Policy";
import { Outlet } from "react-router-dom";

const Support = () => {
  return (
    <div>
      <HeadderPage />
      {/* <ContactUs /> */}
      {/* <TermsConditions /> */}
      {/* <Policy /> */}
      <Outlet />
      <SupportFooter />
    </div>
  );
};

export default Support;
