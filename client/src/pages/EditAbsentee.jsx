import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`/absentees/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { dateDay, dateMonth, dateYear } = data;
  if (Number(dateMonth) > 12 || Number(dateMonth) < 1) {
    toast.error("Enter valid month data");
    return redirect("/dashboard/");
  }
  if (Number(dateYear) > 2200 || Number(dateYear) < 2000) {
    toast.error("Enter valid year data");
    return redirect("/dashboard/");
  }
  if (Number(dateDay) > 31 || Number(dateDay) < 1) {
    toast.error("Enter valid day data");
    return redirect("/dashboard/");
  }

  try {
    await customFetch.patch(`/absentees/${params.id}`, data);
    toast.success("Payment edited successfully");
    return redirect("/dashboard/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditAbsentee = () => {
  // const params = useParams();
  // console.log(params);
  const payment = useLoaderData();
  console.log(payment);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Absentee</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="reason"
            defaultValue={payment.data.absentee.reason}
          />
          <FormRow
            type="text"
            name="dateDay"
            labelText="day"
            defaultValue={payment.data.absentee.dateDay}
          />
          <FormRow
            type="text"
            name="dateMonth"
            labelText="month"
            defaultValue={payment.data.absentee.dateMonth}
          />
          <FormRow
            type="text"
            name="dateYear"
            labelText="year"
            defaultValue={payment.data.absentee.dateYear}
          />

          <SubmitBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditAbsentee;
