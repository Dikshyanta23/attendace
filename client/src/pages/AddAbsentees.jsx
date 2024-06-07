import React from "react";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useNavigation, useOutletContext } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { reason, dateYear, dateMonth, dateDay } = data;
  if (Number(dateMonth) > 12 || Number(dateMonth) < 1) {
    toast.error("Enter valid month data");
    return redirect("/dashboard/");
  }
  if (Number(dateYear) > 2200 || Number(dateYear) < 2000) {
    toast.error("Enter valid year data");
    return redirect("/dashboard/");
  }
  if (Number(dateDay) > 31 || Number(dateDay) < 1) {
    toast.error("Enter valid day data");
    return redirect("/dashboard/");
  }

  try {
    const newFormData = new FormData();
    newFormData.append("student", params.id);
    newFormData.append("reason", reason);
    newFormData.append("dateYear", dateYear);
    newFormData.append("dateMonth", dateMonth);
    newFormData.append("dateDay", dateDay);

    const newData = Object.fromEntries(newFormData);

    await customFetch.post(`/absentees?id=${params.id}`, newData);
    toast.success("Sucessfully added absentee");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/dashboard/");
};

const AddAbsentee = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Absentee</h4>
        <div className="form-center">
          <FormRow type="text" name="reason" />
          <FormRow type="number" name="dateDay" labelText="day" />
          <FormRow type="number" name="dateMonth" labelText="month" />
          <FormRow type="number" name="dateYear" labelText="year" />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddAbsentee;
