import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import PaymentInfo from "./PaymentInfo";

const Payment = ({
  _id,
  studentName,
  reason,
  dateYear,
  dateMonth,
  dateDay,
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
          <PaymentInfo label="Day" text={dateDay} />
          <PaymentInfo label="Month" text={dateMonth} />
          <PaymentInfo label="Year" text={dateYear} />
          <PaymentInfo label="Reason" text={reason} />
        </div>
        <footer className="actions">
          <Link to={`../edit-absentee/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-absentee/${_id}`}>
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
