import React from "react";
import Wrapper from "../assets/wrappers/JobInfo";

const StudentInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

export default StudentInfo;
