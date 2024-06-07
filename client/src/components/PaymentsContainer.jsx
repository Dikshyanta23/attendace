import React from "react";
import { useAllPaymentsContext } from "../pages/AllPayments";
import Wrapper from "../assets/wrappers/JobsContainer";
import Payment from "./Payment";

const PaymentsContainer = () => {
  const { data } = useAllPaymentsContext();
  const { newPayments } = (data && data.data) || [];
  if (newPayments && newPayments.length === 0) {
    return (
      <Wrapper>
        <h2>No payments to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {newPayments &&
          newPayments.map((payment) => {
            return <Payment key={payment._id} {...payment} />;
          })}
      </div>
    </Wrapper>
  );
};

export default PaymentsContainer;
