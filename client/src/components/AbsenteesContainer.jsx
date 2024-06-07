import React from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllAbsenteesContext } from "../pages/AllAbsentees";
import Absentee from "./Absentee";

const AbsenteesContainer = () => {
  const { data } = useAllAbsenteesContext();
  const { newAbsentees } = data;
  if (newAbsentees.length === 0) {
    return (
      <Wrapper>
        <h2>No absentees to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {newAbsentees.map((payment) => {
          return <Absentee key={payment._id} {...payment} />;
        })}
      </div>
    </Wrapper>
  );
};

export default AbsenteesContainer;
