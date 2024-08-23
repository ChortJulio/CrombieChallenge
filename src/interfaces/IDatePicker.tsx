import { Control } from "react-hook-form";
import { IRegisterForm } from "./IRegisterForm";

export interface IDatePicker {
  control: Control<IRegisterForm>;
  error: boolean;
  helperText: string;
  success: boolean;
}
