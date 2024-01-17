import axios  from "axios";
import { apiBase } from "../../constants/api";



class CalculationServices {
     apipath = apiBase

     async getCalculatedData(id,data){
        
        const response = await axios.post(`${this.apipath}/calculation?rule_id=${id}`,data,{withCredentials:true});
        return response.data;
     }
}



const CalculationService = new CalculationServices();

export default CalculationService;