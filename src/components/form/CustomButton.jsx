import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#00B386",
  width: "74%",

  "&:hover": {
    backgroundColor: "#00B386",
  },
}));

export default function CustomizedButtons() {
  const { email, setemail, flag, setflag, setLoggedIn } = useAuth();
  const navigate = useNavigate();
  function handleSubmit() {
    axios
      .post("http://165.232.132.112:4000/user/login", {
        email: email,
      })
      .then((res) => {
        if (res?.data?.message == "user verified") {
          document.cookie = `token=${res.data.data.access_token}`;
          localStorage.setItem("loggedIn", true);
          setLoggedIn(true);

          setflag(false);
          navigate("/home");
        } else {
          setflag(true);
        }
      });
  }
  return (
    <Stack spacing={2} direction="row">
      <ColorButton onClick={handleSubmit} variant="contained">
        Login
      </ColorButton>
    </Stack>
  );
}
