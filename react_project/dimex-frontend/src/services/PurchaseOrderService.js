import axios from "axios";

const PURCHASE_API_BASE_URL = "http://localhost:8080/add/dimex/purchase";

class PurchaseOrderService {

    getPurchaseOrders(){
        return axios.get(PURCHASE_API_BASE_URL);
    }

    createPurchaseOrder(purchase){
        return axios.post(PURCHASE_API_BASE_URL, purchase);
    }

    getPurchaseOrderById(purchaseId){
        return axios.get(PURCHASE_API_BASE_URL + '/' + purchaseId);
    }

    updatePurchaseOrder(purchase, purchaseId){
        return axios.put(PURCHASE_API_BASE_URL + '/' + purchaseId, purchase);
    }

    deletePurchaseOrder(purchaseId){
        return axios.delete(PURCHASE_API_BASE_URL + '/' + purchaseId);
    }
}

export default new PurchaseOrderService()