import React from "react";
import { Typography } from "@mui/material";
// Typography helps us to get different components rather than plain text

const LoginPageHeader = () => {
  return (
    <>
    {/* sx change text color and variant we can choose various types h1-5,body */}
      <Typography variant="h5" sx={{ color: "white" }}>
        Welcome Back!
      </Typography>
      <Typography sx={{ color: "#b9bbbe" }}>
        We are happy that you are with us!
      </Typography>
    </>
  );
};

export default LoginPageHeader;
