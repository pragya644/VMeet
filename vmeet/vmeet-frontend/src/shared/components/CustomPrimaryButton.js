import React from "react";
import Button from "@mui/material/Button";

const CustomPrimaryButton = ({
  label,
  additionalStyles,
  disabled,
  onClick,
}) => {
  return (
    // we will customize the button
    <Button
      variant="contained"
      sx={{
        bgcolor: "#66023C",
        color: "white",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 500,
        width: "100%",
        height: "40px",
      }}
      style={additionalStyles ? additionalStyles : {}}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomPrimaryButton;
