import { toast } from "react-toastify";
import { AbsenteesContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/absentees", {
      params,
    });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllAbsenteesContext = createContext();

const AllAbsentees = () => {
  const data = useLoaderData();
  return (
    <AllAbsenteesContext.Provider value={{ data }}>
      <SearchContainer />
      <AbsenteesContainer />
    </AllAbsenteesContext.Provider>
  );
};

export const useAllAbsenteesContext = () => useContext(AllAbsenteesContext);

export default AllAbsentees;
