import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/absentees/${params.id}`);
    toast.success("Absentee deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect(`/dashboard/`);
};

const DeleteAbsentee = () => {
  return <h1>DeleteAbsentee</h1>;
};

export default DeleteAbsentee;
