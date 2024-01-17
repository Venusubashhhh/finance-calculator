import { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import NavBar from "./components/UI/Navbar/Navbar";
import Home from "./pages/home/Home";
import Calculation from "./pages/calculation/Calculation";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import HistoryPage from "./pages/History/HistoryPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { loggedIn, setLoggedIn } = useAuth();

  // const loggedin = localStorage.getItem("loggedIn");

  // useEffect(() => {
  //   setLoggedIn(Boolean(loggedin));
  // }, [loggedin]);

  console.log("check",loggedIn)



  return (
    <>
    
        {loggedIn ? (
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/calculation/:id" element={<Calculation />}></Route>
            <Route path="/history" element={<HistoryPage />}></Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
        {/* <HistoryCard/> */}
     
    </>
  );
}

export default App;
