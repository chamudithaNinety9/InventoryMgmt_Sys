import axios from "axios";

const SELLING_API_BASE_URL = "http://localhost:8080/add/dimex/selling";

class SellingService {

    getSellings(){
        return axios.get(SELLING_API_BASE_URL);
    }

    createSelling(selling){
        return axios.post(SELLING_API_BASE_URL, selling);
    }

    getSellingById(sellingId){
        return axios.get(SELLING_API_BASE_URL + '/' + sellingId);
    }

    updateSelling(selling, sellingId){
        return axios.put(SELLING_API_BASE_URL + '/' + sellingId, selling);
    }

    deleteSelling(sellingId){
        return axios.delete(SELLING_API_BASE_URL + '/' + sellingId);
    }

}

export default new SellingService()