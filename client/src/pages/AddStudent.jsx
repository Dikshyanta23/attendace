import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useNavigation, useOutletContext } from "react-router-dom";
import { BELT } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useState } from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const { name, phoneNumber, belt } = data;
    const ultimateFormData = new FormData();
    ultimateFormData.append("name", name);
    ultimateFormData.append("phoneNumber", phoneNumber);
    ultimateFormData.append("belt", belt);

    if (String(phoneNumber).length !== 10) {
      toast.error("Enter proper phone number");
      return null;
    }

    await customFetch.post("/students", ultimateFormData);
    toast.success("Sucessfully created student");
    // const imageObject = await customFetch.post("/students/uploadImage");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddStudent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const { user } = useOutletContext();
  const navigation = useNavigation();
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Add Student</h4>
        <div className="form-center">
          <FormRow type="text" name="name" />
          <FormRow type="number" name="phoneNumber" />
          <FormRowSelect
            name="belt"
            list={Object.values(BELT)}
            defaultValue={BELT.WHITE}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddStudent;
