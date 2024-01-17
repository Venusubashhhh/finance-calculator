import axios  from "axios";
import { apiBase } from "../../constants/api";


class HistoryApiServices{
    apipath = apiBase

    async getHistoryData(data){
        const response = await axios.post(`${this.apipath}/historyHome`,data,{withCredentials:true})
        return response.data
    }
}


const HistoryApiService = new HistoryApiServices();

export default HistoryApiService;