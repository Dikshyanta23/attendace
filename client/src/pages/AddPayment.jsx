import React from "react";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useNavigation, useOutletContext } from "react-router-dom";
import { BELT } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useState } from "react";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { amount, paymentforMonth, paymentforYear } = data;

  if (Number(paymentforMonth) > 12 || Number(paymentforMonth) < 1) {
    toast.error("Enter valid month data");
    return redirect("/dashboard/");
  }
  if (Number(paymentforYear) > 2200 || Number(paymentforYear) < 2000) {
    toast.error("Enter valid year data");
    return redirect("/dashboard/");
  }
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();
    const newFormData = new FormData();
    newFormData.append("student", params.id);
    newFormData.append("paymentYear", currentYear);
    newFormData.append("paymentMonth", currentMonth);
    newFormData.append("paymentDay", currentDay);
    newFormData.append("amount", amount);
    newFormData.append("paymentforMonth", paymentforMonth);
    newFormData.append("paymentforYear", paymentforYear);
    const newData = Object.fromEntries(newFormData);

    await customFetch.post(`/payments?id=${params.id}`, newData);
    toast.success("Sucessfully added payment");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/dashboard/");
};

const AddPayment = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Payment</h4>
        <div className="form-center">
          <FormRow type="number" name="amount" />
          <FormRow type="number" name="paymentforMonth" labelText="month" />
          <FormRow type="number" name="paymentforYear" labelText="year" />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddPayment;
