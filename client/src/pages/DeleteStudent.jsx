import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/students/${params.id}`);
    toast.success("Student deleted successfully");
    re;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/dashboard/");
};

const DeleteStudent = () => {
  return <h1>DeleteStudent</h1>;
};

export default DeleteStudent;
