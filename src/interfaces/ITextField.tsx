import { InputProps } from "@mui/material";
import { Control } from "react-hook-form";
import { IRegisterForm } from "./IRegisterForm";

export interface ITextField {
  label?: string;
  id: string;
  placeholder: string;
  name: string;
  inputProps?: InputProps;
  control: Control<IRegisterForm>;
  error: boolean;
  helperText: string;
  children?: React.ReactNode;
  success: boolean;
}
