import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { BELT } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`/students/${params.id}`);
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-students");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const phoneNumber = String(data.phoneNumber);
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength !== 10) {
    toast.error("Enter valid phone number");
    return redirect("/dashboard");
  }
  try {
    await customFetch.patch(`/students/${params.id}`, data);
    toast.success("Student edited successfully");
    return redirect("/dashboard/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditStudent = () => {
  // const params = useParams();
  // console.log(params);
  const student = useLoaderData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit student</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            defaultValue={student.data.student.name}
          />
          <FormRow
            type="number"
            name="phoneNumber"
            defaultValue={student.data.student.phoneNumber}
          />
          <FormRowSelect
            name="belt"
            list={Object.values(BELT)}
            defaultValue={student.data.student.belt}
          />
          <SubmitBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditStudent;
