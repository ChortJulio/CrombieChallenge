import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { ITextField } from "../interfaces";

const MyTextField = ({
  id,
  name,
  placeholder,
  error,
  helperText,
  inputProps,
  control,
  children,
}: ITextField) => {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            {...field}
            id={id}
            placeholder={placeholder}
            required
            variant="outlined"
            error={error}
            helperText={helperText}
            InputProps={inputProps}
          >
            {children}
          </TextField>
        )}
      />
    </FormControl>
  );
};

export default MyTextField;
