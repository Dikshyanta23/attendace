import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddStudent,
  AllStudents,
  AddAbsentees,
  AddPayment,
  EditStudent,
  AllAbsentees,
  AllPayments,
  EditPayment,
  ViewPayment,
  Attendance,
  ComboPayment,
  ViewAbsentee,
  EditAbsentee,
  DeleteAbsentee,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addStudentACtion } from "./pages/AddStudent";
import { action as addPaymentAction } from "./pages/AddPayment";
import { action as addAbsenteeAction } from "./pages/AddAbsentees";
import { action as deleteStudentAction } from "./pages/DeleteStudent";
import { action as deletePaymentAction } from "./pages/DeletePayment";
import { action as deleteAbsenteeAction } from "./pages/DeleteAbsentee";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allPaymentsLoader } from "./pages/AllPayments";
import { loader as ViewPaymentLoader } from "./pages/ViewPayment";
import { loader as ViewAbsenteeLoader } from "./pages/ViewAbsentee";
import { loader as allStudentsLoader } from "./pages/AllStudents";
import { loader as allAbsenteesLoader } from "./pages/AllAbsentees";
import { action as editStudentAction } from "./pages/EditStudent";
import { loader as editStudentLoader } from "./pages/EditStudent";
import { action as editAbsenteeAction } from "./pages/EditAbsentee";
import { loader as editAbsenteeLoader } from "./pages/EditAbsentee";
import { loader as attendanceLoader } from "./pages/Attendance";
import { loader as editPaymentLoader } from "./pages/EditPayment";
import { action as editPaymentAction } from "./pages/EditPayment";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5,
//     },
//   },
// });

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AllStudents />,
            loader: allStudentsLoader,
          },
          {
            path: "add-student",
            element: <AddStudent />,
            action: addStudentACtion,
          },
          {
            path: "all-absentees",
            element: <AllAbsentees />,
            loader: allAbsenteesLoader,
          },
          {
            path: "all-payments",
            element: <AllPayments />,
            loader: allPaymentsLoader,
          },
          {
            path: "edit-student/:id",
            element: <EditStudent />,
            action: editStudentAction,
            loader: editStudentLoader,
          },
          {
            path: "edit-payment/:id",
            element: <EditPayment />,
            action: editPaymentAction,
            loader: editPaymentLoader,
          },
          {
            path: "edit-absentee/:id",
            element: <EditAbsentee />,
            action: editAbsenteeAction,
            loader: editAbsenteeLoader,
          },
          {
            path: "add-payment/:id",
            element: <AddPayment />,
            action: addPaymentAction,
          },
          {
            path: "view-payment/:id",
            element: <ViewPayment />,
            loader: ViewPaymentLoader,
          },
          {
            path: "view-absentee/:id",
            element: <ViewAbsentee />,
            loader: ViewAbsenteeLoader,
          },
          {
            path: "add-absentee/:id",
            element: <AddAbsentees />,
            action: addAbsenteeAction,
          },
          {
            path: "delete-student/:id",
            action: deleteStudentAction,
          },
          {
            path: "delete-payment/:id",
            action: deletePaymentAction,
          },
          {
            path: "delete-absentee/:id",
            action: deleteAbsenteeAction,
          },
          {
            path: "attendance",
            element: <Attendance />,
            loader: attendanceLoader,
          },
          {
            path: "combo-payment",
            element: <ComboPayment />,
            loader: attendanceLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    //   <ReactQueryDevtools initialIsOpen={false} />
    // </QueryClientProvider>;
  );
}

export default App;
