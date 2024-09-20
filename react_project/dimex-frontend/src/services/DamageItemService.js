import axios from "axios";

const DAMAGEITEM_API_BASE_URL = "http://localhost:8080/add/dimex/damageitem";

class DamageItemService {

    getDamageItems(){
        return axios.get(DAMAGEITEM_API_BASE_URL);
    }

    createDamageItem(damageitem){
        return axios.post(DAMAGEITEM_API_BASE_URL, damageitem);
    }

    getDamageItemById(damageitemId){
        return axios.get(DAMAGEITEM_API_BASE_URL + '/' + damageitemId);
    }

    updateDamageItem(damageitem, damageitemId){
        return axios.put(DAMAGEITEM_API_BASE_URL + '/' + damageitemId, damageitem);
    }

    deleteDamageItem(damageitemId){
        return axios.delete(DAMAGEITEM_API_BASE_URL + '/' + damageitemId);
    }

}

export default new DamageItemService()