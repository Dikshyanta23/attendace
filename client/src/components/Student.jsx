import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import StudentInfo from "./StudentInfo";
import advancedFormat from "dayjs/plugin/advancedFormat";

const Student = ({ _id, name, phoneNumber, belt }) => {
  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>
            <strong>{name}</strong>
          </h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <StudentInfo icon={<FaLocationArrow />} text={phoneNumber} />
          <div className={`status ${belt}`}>{belt}</div>
        </div>
        <footer className="actions">
          <Link to={`./edit-student/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Link to={`./add-payment/${_id}`} className="btn edit-btn">
            Add Payment
          </Link>
          <Link to={`./view-payment/${_id}`} className="btn edit-btn">
            View Payments
          </Link>
          <Link to={`./add-absentee/${_id}`} className="btn edit-btn">
            Add Absentee
          </Link>
          <Link to={`./view-absentee/${_id}`} className="btn edit-btn">
            View Absentee
          </Link>
          <Form method="post" action={`./delete-student/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Student;
