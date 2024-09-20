import axios from "axios";

const RETURNITEM_API_BASE_URL = "http://localhost:8080/add/dimex/returnitem";

class ReturnItemService {

    getReturnItems(){
        return axios.get(RETURNITEM_API_BASE_URL);
    }

    createReturnItem(returnitem){
        return axios.post(RETURNITEM_API_BASE_URL, returnitem);
    }

    getReturnItemById(returnitemId){
        return axios.get(RETURNITEM_API_BASE_URL + '/' + returnitemId);
    }

    updateReturnItem(returnitem, returnitemId){
        return axios.put(RETURNITEM_API_BASE_URL + '/' + returnitemId, returnitem);
    }

    deleteReturnItem(returnitemId){
        return axios.delete(RETURNITEM_API_BASE_URL + '/' + returnitemId);
    }

}

export default new ReturnItemService()