import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`/payments/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-payments");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { paymentforMonth, paymentforYear } = data;
  if (Number(paymentforMonth) > 12 || Number(paymentforMonth) < 1) {
    toast.error("Enter valid month data");
    return redirect("/dashboard/");
  }
  if (Number(paymentforYear) > 2200 || Number(paymentforYear) < 2000) {
    toast.error("Enter valid year data");
    return redirect("/dashboard/");
  }

  try {
    await customFetch.patch(`/payments/${params.id}`, data);
    toast.success("Payment edited successfully");
    return redirect("/dashboard/all-payments");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditPayment = () => {
  // const params = useParams();
  // console.log(params);
  const payment = useLoaderData();
  console.log(payment);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Payment</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="amount"
            defaultValue={payment.data.payment.amount}
          />
          <FormRow
            type="text"
            name="paymentforMonth"
            labelText="month"
            defaultValue={payment.data.payment.paymentforMonth}
          />
          <FormRow
            type="text"
            name="paymentforYear"
            labelText="month"
            defaultValue={payment.data.payment.paymentforYear}
          />

          <SubmitBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditPayment;
