import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { useAllStudentsContext } from "../pages/AllStudents";

const SearchContainer = () => {
  const submit = useSubmit();
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search form</h5>
        <div className="form-center">
          <FormRow type="search" name="search" />
          <div style={{ marginTop: "30px" }}>
            <SubmitBtn />
          </div>
          <Link to="/dashboard" className="btn btn-block form-btn">
            Reset Search value
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
