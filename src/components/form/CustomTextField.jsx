import * as React from "react";
import { Box } from "@mui/material";

import TextField from "@mui/material/TextField";
import { useAuth } from "../../context/AuthContext";
function CustomTextField() {
  const { email, setemail } = useAuth();

  const handleNameChange = (event) => {
    setemail(event.target.value);
  };

  return (
    <div
      className="login-textfield"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "150%",
        }}
      >
        <TextField
          sx={{ width: "150%" }}
          helperText="Please enter your email"
          id="standard"
          label="Email"
          value={email}
          onChange={handleNameChange}
          variant="standard"
        />
      </Box>
    </div>
  );
}
export default CustomTextField;
