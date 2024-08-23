import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import { IDatePicker } from "../interfaces";
import { maximumPossibleDateToRegister } from "../utils";

const MyDatePicker = ({ control, error, helperText, success }: IDatePicker) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }) => (
          <DatePicker
            disableFuture
            onChange={(date) => field.onChange(date)}
            views={["year", "month", "day"]}
            maxDate={maximumPossibleDateToRegister}
            slotProps={{
              textField: {
                error: error,
                helperText: helperText,
                focused: success,
                color: success ? "success" : "primary",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default MyDatePicker;
