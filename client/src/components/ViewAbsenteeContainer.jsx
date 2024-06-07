import React from "react";
import { useViewAbsenteeContext } from "../pages/ViewAbsentee";
import Wrapper from "../assets/wrappers/JobsContainer";
import Absentee from "./Absentee";

const ViewAbsenteeContainer = () => {
  const { data } = useViewAbsenteeContext();
  const payments = data.data.absentees;
  console.log(payments);
  if (payments && payments.length === 0) {
    return (
      <Wrapper>
        <h2>No payments to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {payments.map((payment) => {
          return <Absentee key={payment._id} {...payment} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ViewAbsenteeContainer;
