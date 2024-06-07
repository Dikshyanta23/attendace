import React from "react";
import { useViewPaymentContext } from "../pages/ViewPayment";
import Wrapper from "../assets/wrappers/JobsContainer";
import Payment from "./Payment";

const ViewPaymentContainer = () => {
  const { data } = useViewPaymentContext();
  const { payments } = data.data;
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
          return <Payment key={payment._id} {...payment} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ViewPaymentContainer;
