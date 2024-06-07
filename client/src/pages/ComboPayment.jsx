import { toast } from "react-toastify";
import { StudentsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { Form, redirect } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/students");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const ComboPayment = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const data = useLoaderData();
  const students = data.students;
  const [attendance, setAttendance] = useState(
    students.map((student) => ({
      id: student._id,
      amount: 0,
    }))
  );
  const handleAttendanceChange = (id, field, value) => {
    setAttendance((prevState) =>
      prevState.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };
  const handleSubmit = async () => {
    console.log("Attendance:", attendance);
    const selectedMonth = month;
    const selectedYear = year;
    if (!selectedMonth || !selectedYear) {
      toast.error("Please select proper date");
      setYear(0);
      setMonth(0);

      return;
    }
    if (selectedMonth <= 0 || selectedYear <= 0) {
      toast.error("Please select proper date");
      setYear(0);
      setMonth(0);
      return;
    }
    if (selectedMonth < 1 || selectedMonth > 12) {
      toast.error("Please select proper month");
      setYear(0);
      setMonth(0);
      return;
    }
    if (selectedYear < 2000 || selectedYear > 2200) {
      toast.error("Please select proper date");
      setYear(0);
      setMonth(0);
      return;
    }
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    try {
      const promises = attendance
        .filter((attendanceItem) => attendanceItem.amount >= 0)
        .map((attendanceItem) =>
          customFetch.post(`/payments?id=${attendanceItem.id}`, {
            amount: attendanceItem.amount,
            paymentforMonth: selectedMonth,
            paymentforYear: selectedYear,
            paymentDay: currentDay,
            paymentMonth: currentMonth,
            paymentYear: currentYear,
          })
        );

      await Promise.all(promises);
      toast.success("Payment completed");
      return navigate("/dashboard/");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return navigate("/dashboard/");
    }
  };

  const tableStyles = {
    width: "90%",
    margin: "auto",
    borderCollapse: "collapse",
  };

  const thStyles = {
    backgroundColor: "rgb(44, 177, 188)",
    color: "white",
    padding: "5px",
    textAlign: "center",
  };

  const tdStyles = {
    padding: "5px",
    textAlign: "center",
  };
  const inputStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    alignItems: "center",
    marginBottom: "10px",
  };

  const inputNumberStyles = {
    padding: "5px",
    borderRadius: "8px",
  };
  const buttonStyles = {
    backgroundColor: "rgb(44, 177, 188)",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  if (students && students.length == 0) {
    return (
      <div className="container">
        <h3>No students in the system</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        className="date"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "15px 0px",
        }}
      >
        <label style={inputStyles}>
          Month:
          <input
            style={inputNumberStyles}
            type="number"
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </label>
        <label style={inputStyles}>
          Year:
          <input
            style={inputNumberStyles}
            type="number"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
      </div>
      <table style={tableStyles} border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th style={thStyles}>Name</th>
            <th style={thStyles}>Phone Number</th>
            <th style={thStyles}>Belt</th>
            <th style={thStyles}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const studentAttendance = attendance.find(
              (a) => a.id === student._id
            );
            return (
              <tr key={student._id}>
                <td style={tdStyles}>{student.name}</td>
                <td style={tdStyles}>{student.phoneNumber}</td>
                <td style={tdStyles}>{student.belt}</td>
                <td style={tdStyles}>
                  <input
                    type="number"
                    style={{
                      padding: "5px",
                      width: "90%",
                      borderRadius: "10px",
                    }}
                    value={studentAttendance.amount}
                    onChange={(e) =>
                      handleAttendanceChange(
                        student._id,
                        "amount",
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <button style={buttonStyles} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ComboPayment;
