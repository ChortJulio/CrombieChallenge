import * as yup from "yup";

export const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  address: yup.string().required("Address is required"),
  loanAmount: yup.number().required("Loan amount is required"),
  phoneNumber: yup.string().required("Phone number is required"),
});
