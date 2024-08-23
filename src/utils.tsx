import dayjs from "dayjs";
import * as yup from "yup";
import { IRegisterForm } from "./interfaces";

const nameRegEx = /^[A-Za-z\s]+$/;
const minimumNameLength = 2;
const maximumNameLength = 50;
const registeredEmails = ["test@example.com", "user@example.com"];
const minimumAddressLength = 10;
const addressRegEx = /^[a-zA-Z0-9\s,.'-]{3,}$/;
const minimumLoanAmount = 25000;
const maximumLoanAmount = 250000;
const loanAmountBreakpoint = 100000;
const minimumLoanTerm = 12;
const maximumLoanTerm = 24;
const minimumLegalAge = 18;
const phoneNumberRegEx = /^\(\d{3}\) \d{3}-\d{4}$/;

export const FORM_DATA_KEY = "formState";

export const defaultValues: IRegisterForm = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  loanAmount: 0,
  loanTerm: 0,
  phoneNumber: "",
  dateOfBirth: {},
};

export const calculateLoanTerm = (amount: number) => {
  if (amount < minimumLoanAmount || amount > maximumLoanAmount) {
    return 0;
  } else if (amount >= loanAmountBreakpoint) {
    return maximumLoanTerm;
  } else {
    return minimumLoanTerm;
  }
};

export const maximumPossibleDateToRegister = dayjs().subtract(
  minimumLegalAge,
  "year"
);

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(
      minimumNameLength,
      `First name must be at least ${minimumNameLength} characters`
    )
    .max(
      maximumNameLength,
      `First name must be at most ${maximumNameLength} characters`
    )
    .matches(
      nameRegEx,
      "First name cannot contain numbers or special characters"
    ),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(
      minimumNameLength,
      `Last name must be at least ${minimumNameLength} characters`
    )
    .max(
      maximumNameLength,
      `Last name must be at most ${maximumNameLength} characters`
    )
    .matches(
      nameRegEx,
      "Last name cannot contain numbers or special characters"
    ),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required")
    .notOneOf(registeredEmails, "Email is already registered"),
  address: yup
    .string()
    .trim()
    .required("Address is required")
    .min(
      minimumAddressLength,
      `Address must be at least ${minimumAddressLength} characters`
    )
    .matches(addressRegEx, "Address cannot be only numbers"),
  loanAmount: yup
    .number()
    .typeError("Loan amount must be a number")
    .required("Loan amount is required")
    .min(minimumLoanAmount, `Loan amount must be at least ${minimumLoanAmount}`)
    .max(maximumLoanAmount, `Loan amount must be at most ${maximumLoanAmount}`),
  loanTerm: yup
    .number()
    .typeError("Loan term must be a number")
    .required("Loan term is required")
    .when("loanAmount", {
      is: (loanAmount: number) => loanAmount >= loanAmountBreakpoint,
      then: (schema) =>
        schema.min(maximumLoanTerm, "Verify the loan amount requested"),
      otherwise: (schema) =>
        schema.min(minimumLoanTerm, "Verify the loan amount requested"),
    }),
  dateOfBirth: yup
    .object()
    .typeError("Date of birth must be a valid date in MM/DD/YYYY format")
    .test(
      "18-years-old",
      `Must be at least ${minimumLegalAge} years old`,
      function (value: any) {
        return dayjs().diff(value, "year") >= minimumLegalAge;
      }
    )
    .required("Date of birth is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      phoneNumberRegEx,
      "Phone number must be in the format (XXX) XXX-XXXX"
    ),
});
