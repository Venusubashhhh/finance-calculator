import React, { useEffect } from "react";
import InputSlider from "../../components/form/Inputslider/InputSlider";
import Statistics from "../../components/UI/Statistics/Statistics";
import { Grid, Box } from "@mui/material";
import NavBar from "../../components/UI/Navbar/Navbar";
import Mascot from "../../components/UI/Mascot/Mascot";
import { useMascot } from "../../context/MascotContext";

const Calculation = () => {
  const{mascotMessage,setMascotMessage}=useMascot()
  useEffect(()=>{
    setMascotMessage('Enter the input values and click generate to get the result and you can download the  data in the form of pdf and you can have the similar cards in the previous section')
  },[])
  return (
    <>
  
    <Box sx={{
     marginTop:'6%'
    }}>
      <Grid container >
        <Grid item xs={12} md={10} lg={7} style={{margin:"10px 10px 15px 30px"}}>
          <InputSlider />
        </Grid>
        <Grid item xs={12} md={4} lg={4} style={{margin:"10px 10px 15px 30px"}}>
          <Statistics />
        </Grid>
      </Grid>
    </Box>
    <Mascot/>
    <NavBar/>
    </>
  );
};

export default Calculation;
