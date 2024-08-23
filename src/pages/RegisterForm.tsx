import { Alert, Box, Button, InputAdornment, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  calculateLoanTerm,
  defaultValues,
  FORM_DATA_KEY,
  validationSchema,
} from "../utils";
import { IRegisterForm } from "../interfaces";
import MyFormField from "../components/MyFormField";
import MyTextField from "../components/MyTextField";
import MyDatePicker from "../components/MyDatePicker";
import React from "react";
import MyPhoneNumberMask from "../components/MyPhoneNumberMask";
import { useLocalStorage } from "../hooks/useLocalStorage";

const RegisterForm = () => {
  const getSavedData = () => {
    let data = localStorage.getItem(FORM_DATA_KEY);
    if (data) {
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }
      return data;
    }
    return defaultValues;
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm<IRegisterForm>({
    defaultValues: getSavedData(),
    resolver: yupResolver(validationSchema),
  });

  useLocalStorage({
    value: getValues(),
    localStorageKey: FORM_DATA_KEY,
  });

  const watchAllFields = watch();
  const loanAmount = watch("loanAmount");
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(getValues()));
  }, [getValues, watchAllFields]);

  React.useEffect(() => {
    if (loanAmount) {
      const calculatedLoanTerm = calculateLoanTerm(loanAmount);
      setValue("loanTerm", calculatedLoanTerm);
    }
  }, [loanAmount, setValue]);

  const onSubmit = (data: IRegisterForm) => {
    console.log(data);
    setSuccessMessage("Form submitted successfully!");
    localStorage.removeItem(FORM_DATA_KEY);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    localStorage.removeItem(FORM_DATA_KEY);
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "1rem",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        <strong style={{ color: "rgb(103 103 162)" }}>Hello.</strong> Apply for
        your loan here.
      </Typography>

      {successMessage && (
        <Alert variant="outlined" severity="success">
          {successMessage}
        </Alert>
      )}

      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: "1rem", width: "100%" }}
      >
        <MyFormField label="First Name">
          <MyTextField
            id="first-name"
            placeholder="John"
            name="firstName"
            control={control}
            error={!!errors.firstName}
            helperText={
              errors.firstName ? String(errors.firstName.message) : ""
            }
            success={Boolean(successMessage)}
          />
        </MyFormField>

        <MyFormField label="Last Name">
          <MyTextField
            id="last-name"
            placeholder="Doe"
            name="lastName"
            control={control}
            error={!!errors.lastName}
            helperText={errors.lastName ? String(errors.lastName.message) : ""}
            success={Boolean(successMessage)}
          />
        </MyFormField>
        <MyFormField label="Email">
          <MyTextField
            id="email"
            placeholder="myemail@example.com"
            name="email"
            control={control}
            error={!!errors.email}
            helperText={errors.email ? String(errors.email.message) : ""}
            success={Boolean(successMessage)}
          />
        </MyFormField>

        <MyFormField label="Street Address Line">
          <MyTextField
            id="address"
            placeholder="123 Main St, City, State, Zip"
            name="address"
            control={control}
            error={!!errors.address}
            helperText={errors.address ? String(errors.address.message) : ""}
            success={Boolean(successMessage)}
          />
        </MyFormField>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <MyFormField label="Requested New Loan">
            <MyTextField
              id="loan-amount"
              placeholder="25000"
              name="loanAmount"
              control={control}
              error={!!errors.loanAmount}
              helperText={
                errors.loanAmount ? String(errors.loanAmount.message) : ""
              }
              success={Boolean(successMessage)}
            />
          </MyFormField>

          <MyFormField label="Loan Term (months)">
            <MyTextField
              id="loan-term"
              placeholder="12"
              name="loanTerm"
              control={control}
              error={!!errors.loanTerm}
              helperText={
                errors.loanTerm ? String(errors.loanTerm.message) : ""
              }
              inputProps={{
                readOnly: true,
              }}
              success={Boolean(successMessage)}
            />
          </MyFormField>
        </Box>

        <MyFormField label="Phone Number">
          <MyTextField
            id="phone-number"
            placeholder="(123) 456-7890"
            name="phoneNumber"
            control={control}
            error={!!errors.phoneNumber}
            helperText={
              errors.phoneNumber ? String(errors.phoneNumber.message) : ""
            }
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">+1</InputAdornment>
              ),
              inputComponent: MyPhoneNumberMask as any,
            }}
            success={Boolean(successMessage)}
          />
        </MyFormField>

        <MyFormField label="Date of Birth">
          <MyDatePicker
            control={control}
            error={!!errors.dateOfBirth}
            helperText={
              errors.dateOfBirth ? String(errors.dateOfBirth.message) : ""
            }
            success={Boolean(successMessage)}
          />
        </MyFormField>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!!successMessage}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>
        <Button
          type="button"
          color="secondary"
          fullWidth
          variant="outlined"
          onClick={handleReset}
        >
          Reset Form
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
