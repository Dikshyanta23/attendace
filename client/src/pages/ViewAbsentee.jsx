import { toast } from "react-toastify";
import { FormRowSelect, ViewAbsenteeContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`/absentees/student/${params.id}`);
    return data; // return currentDate;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ViewAbsenteeContext = createContext();

const ViewAbsentee = () => {
  const loaderdata = useLoaderData();
  const data = loaderdata;
  return (
    <ViewAbsenteeContext.Provider value={{ data }}>
      <ViewAbsenteeContainer />
    </ViewAbsenteeContext.Provider>
  );
};

export const useViewAbsenteeContext = () => useContext(ViewAbsenteeContext);

export default ViewAbsentee;
