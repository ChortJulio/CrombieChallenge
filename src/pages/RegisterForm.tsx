import { Box, Button, InputAdornment, Typography } from "@mui/material";
import MyTextField from "../components/MyTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../utils";
import { IRegisterForm } from "../interfaces";

const RegisterForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IRegisterForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      loanAmount: 0,
      phoneNumber: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: IRegisterForm) => {
    console.log(data);
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
      <Typography component="h1">Sign Up</Typography>

      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: "1rem", width: "100%" }}
      >
        <Typography
          sx={{ marginLeft: "2px" }}
          variant="caption"
          display="block"
          gutterBottom
        >
          First Name
        </Typography>
        <MyTextField
          id="first-name"
          placeholder="John"
          name="firstName"
          control={control}
          error={!!errors.firstName}
          helperText={errors.firstName ? String(errors.firstName.message) : ""}
        />
        <Typography
          sx={{ marginLeft: "2px" }}
          variant="caption"
          display="block"
          gutterBottom
        >
          Last Name
        </Typography>
        <MyTextField
          id="last-name"
          placeholder="Doe"
          name="lastName"
          control={control}
          error={!!errors.lastName}
          helperText={errors.lastName ? String(errors.lastName.message) : ""}
        />
        <Typography
          sx={{ marginLeft: "2px" }}
          variant="caption"
          display="block"
          gutterBottom
        >
          Email
        </Typography>
        <MyTextField
          id="email"
          placeholder="myemail@example.com"
          name="email"
          control={control}
          error={!!errors.email}
          helperText={errors.email ? String(errors.email.message) : ""}
        />
        <Typography
          sx={{ marginLeft: "2px" }}
          variant="caption"
          display="block"
          gutterBottom
        >
          Street Address Line
        </Typography>
        <MyTextField
          id="address"
          placeholder="123 Main St, City, State, Zip"
          name="address"
          control={control}
          error={!!errors.address}
          helperText={errors.address ? String(errors.address.message) : ""}
        />
        <Typography
          sx={{ marginLeft: "2px" }}
          variant="caption"
          display="block"
          gutterBottom
        >
          Requested New Loan
        </Typography>
        <MyTextField
          id="loan-amount"
          placeholder="25000"
          name="loanAmount"
          control={control}
          error={!!errors.loanAmount}
          helperText={
            errors.loanAmount ? String(errors.loanAmount.message) : ""
          }
          inputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            type: "number",
          }}
        />
        <Typography
          sx={{ marginLeft: "2px" }}
          variant="caption"
          display="block"
          gutterBottom
        >
          Phone Number
        </Typography>
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
            type: "number",
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
