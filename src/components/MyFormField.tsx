import { Box, Typography } from "@mui/material";
import { IFormField } from "../interfaces";

const MyFormField = ({ label, children }: IFormField) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{ marginLeft: "2px" }}
        variant="caption"
        display="block"
        gutterBottom
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};

export default MyFormField;
