import React from "react";
import Student from "./Student";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllStudentsContext } from "../pages/AllStudents";

const StudentsContainer = () => {
  const { data } = useAllStudentsContext();
  const { students } = data;
  if (students.length === 0) {
    return (
      <Wrapper>
        <h2>No students to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {students.map((student) => {
          return <Student key={student._id} {...student} />;
        })}
      </div>
    </Wrapper>
  );
};

export default StudentsContainer;
