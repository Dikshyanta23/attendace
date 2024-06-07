import { toast } from "react-toastify";
import { StudentsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/students", {
      params,
    });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllStudentsContext = createContext();

const AllStudents = () => {
  const data = useLoaderData();

  return (
    <AllStudentsContext.Provider value={{ data }}>
      <SearchContainer />
      <StudentsContainer />
    </AllStudentsContext.Provider>
  );
};

export const useAllStudentsContext = () => useContext(AllStudentsContext);

export default AllStudents;
