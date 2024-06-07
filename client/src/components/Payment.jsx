import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import PaymentInfo from "./PaymentInfo";

const Payment = ({
  _id,
  studentName,
  paymentforMonth,
  amount,
  paymentforYear,
}) => {
  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>
            <strong>{studentName}</strong>
          </h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <PaymentInfo label="Month" text={paymentforMonth} />
          <PaymentInfo label="Year" text={paymentforYear} />
          <PaymentInfo label="Amount" text={amount} />
        </div>
        <footer className="actions">
          <Link to={`../edit-payment/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-payment/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Payment;
