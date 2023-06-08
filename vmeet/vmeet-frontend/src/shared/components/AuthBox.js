import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
// with styled we can also create custom components with react components

const BoxWrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#66023C",
});
//Box is predefined we just imported it readymade
const AuthBox = (props) => {
  return (
    <BoxWrapper>
      <Box
        sx={{
          width: 700,
          height: 400,
          bgcolor: "#33393f",
          borderRadius: "5px",
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          display: "flex",
          flexDirection: "column",
          padding: "25px",
        }}
      >
        {/* here we pass all children from the parent */}
        {props.children}
      </Box>
    </BoxWrapper>
  );
};

export default AuthBox;
