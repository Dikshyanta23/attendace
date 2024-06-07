import { toast } from "react-toastify";
import {
  FormRowSelect,
  PaymentsContainer,
  SearchContainer,
} from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const currentYear = new Date().getFullYear();

export const loader = async () => {
  try {
    const trialdata = await customFetch.get(`/payments?year=${currentYear}`);
    const uniqueYears = await customFetch.get(`/payments/unique-years`);
    return { trialdata, uniqueYears };
    // return currentDate;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllPaymentsContext = createContext();

const AllPayments = () => {
  const loaderdata = useLoaderData();
  const initialData = loaderdata.trialdata;
  const uniqueYearspss = loaderdata.uniqueYears;
  const [data, setChosenData] = useState(initialData || {});
  const [choosenyear, setchoosensetYear] = useState(currentYear);
  const handleYearChange = async (event) => {
    const chosenYear = event.target.value;
    try {
      const trialdata = await customFetch.get(`/payments?year=${chosenYear}`);
      setChosenData(trialdata);
      setchoosensetYear(chosenYear);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AllPaymentsContext.Provider value={{ data }}>
      <div className="form-row">
        <label htmlFor="year" className="form-label">
          year
        </label>
        <select
          name="year"
          className="form-select"
          value={choosenyear}
          onChange={handleYearChange}
        >
          {uniqueYearspss &&
            uniqueYearspss.data.years.map((itemValue) => {
              return (
                <option key={itemValue} value={itemValue}>
                  {itemValue}
                </option>
              );
            })}
        </select>
      </div>
      <SearchContainer />
      <PaymentsContainer />
    </AllPaymentsContext.Provider>
  );
};

export const useAllPaymentsContext = () => useContext(AllPaymentsContext);

export default AllPayments;
