import { toast } from "react-toastify";
import { FormRowSelect, ViewPaymentContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`/payments/student/${params.id}`);
    return data; // return currentDate;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ViewPaymentContext = createContext();

const ViewPayments = () => {
  const loaderdata = useLoaderData();
  console.log(loaderdata);
  const data = loaderdata;
  return (
    <ViewPaymentContext.Provider value={{ data }}>
      <ViewPaymentContainer />
    </ViewPaymentContext.Provider>
  );
};

export const useViewPaymentContext = () => useContext(ViewPaymentContext);

export default ViewPayments;
