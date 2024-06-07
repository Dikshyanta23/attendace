import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/payments/${params.id}`);
    toast.success("Payment deleted successfully");
    re;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/dashboard/all-payments");
};

const DeletePayment = () => {
  return <h1>DeletePayment</h1>;
};

export default DeletePayment;
