import { createContext,useContext,useState } from "react";

const AuthContext=createContext();


export const AuthProvider=({children})=>{



    const[email,setemail]=useState('');
    const [selectedDate,setSelectedDate]=useState();
    const [flag, setflag] = useState(false);
    const [loggedIn,setLoggedIn]=useState(JSON.parse(localStorage.getItem("loggedIn")) ?? false)
  
 
return(
    <AuthContext.Provider value={{email,setemail,selectedDate,setSelectedDate,flag, setflag,loggedIn,setLoggedIn}}>
        {children}
    </AuthContext.Provider>
);
};
export const useAuth=()=>useContext(AuthContext);