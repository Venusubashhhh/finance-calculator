import { createContext,useContext,useEffect,useState } from "react";

const MascotContext=createContext();


export const MascotProvider=({children})=>{
    const[mascotMessage,setMascotMessage]=useState('Hi there,hover the cards to know more information about the rules and click the to calculate and you can download the results as pdf and you can view the previous history');

    useEffect(() => {
        const timeout = setTimeout(() => {
          setMascotMessage(""); // Change the mascotMessage to an empty string after 10 seconds
        }, 10000); // 10 seconds in milliseconds
    
        return () => clearTimeout(timeout); // Clear the timeout on component unmount
      }, [mascotMessage]);



    
return(
    <MascotContext.Provider value={{mascotMessage,setMascotMessage}}>
        {children}
    </MascotContext.Provider>
);
};
export const useMascot=()=>useContext(MascotContext);