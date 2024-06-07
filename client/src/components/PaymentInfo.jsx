import React from "react";
import Wrapper from "../assets/wrappers/JobInfo";

const PaymentInfo = ({ label, text }) => {
  return (
    <Wrapper>
      <span className="job-text">{label}</span>:
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

export default PaymentInfo;
