import React from "react";
import "./Login.scss";
import CustomTextField from "../../components/form/CustomTextField";
import CustomButtons from "../../components/form/CustomButton";
import gif from "../../../public/assets/hello.gif";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useAuth } from "../../context/AuthContext";
function Login() {
  const {flag} = useAuth();
  
  const handleLogingoogle = async () => {
    try {
      localStorage.setItem('loggedIn',true)
      const temp = window.location.assign(
        "http://165.232.132.112:4000/user/login/google"
      );

      

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container-wrapper">
      <div className="container">
        <div className="left">
          <div className="welcome-mascot-wrapper">
            <div className="mascot-text">
              <div className="welcome-bubble welcome-bubble-bottom-left">
                Hi I'm BB Please Login to access our servises
              </div>
            </div>
            <img src={gif} alt="Hello GIF" />
          </div>
        </div>
        <div className="right">
          <p className="Title-1">Welcome to DecaDex</p>
          <div className="spacer"></div>
          <button type="button" className="login-with-google-btn" onClick={handleLogingoogle}>
            Sign in with Google
          </button>
          <div className="spacer"></div>
          <div className="spacer"></div>
          <div className="or-div">Or</div>
          <div className="spacer"></div>
          <div className="Textfield-container">
            <CustomTextField />
          </div>
          <div className="spacer"></div>
          <div className="spacer"></div>
          <div
            className="Login-button"
            
          >
            <CustomButtons />
            {flag ? (
              <Stack sx={{ width: "74%", marginTop: "20px" }} spacing={2}>
                <Alert variant="outlined" severity="warning">
                  Please verify your login to continue!
                </Alert>
              </Stack>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
