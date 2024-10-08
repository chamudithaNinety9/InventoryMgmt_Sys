import axios from "axios";

const SUPPLIER_API_BASE_URL = "http://localhost:8080/add/dimex/supplier";

class SupplierService {

    getSuppliers(){
        return axios.get(SUPPLIER_API_BASE_URL);
    }

    createSupplier(supplier){
        return axios.post(SUPPLIER_API_BASE_URL, supplier);
    }

    getSupplierById(supplierId){
        return axios.get(SUPPLIER_API_BASE_URL + '/' + supplierId);
    }

    updateSupplier(supplier, supplierId){
        return axios.put(SUPPLIER_API_BASE_URL + '/' + supplierId, supplier);
    }

    deleteSupplier(supplierId){
        return axios.delete(SUPPLIER_API_BASE_URL + '/' + supplierId);
    }
}

export default new SupplierService()