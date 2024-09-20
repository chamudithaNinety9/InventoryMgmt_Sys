import axios from "axios";

const CREDIT_API_BASE_URL = "http://localhost:8080/add/dimex/creditpurchase";

class CreditPurchaseService {

    // Fetch all credit purchases
    getCreditPurchases() {
        return axios.get(CREDIT_API_BASE_URL);
    }

    // Create a new credit purchase
    createCreditPurchase(creditpurchase) {
        return axios.post(CREDIT_API_BASE_URL, creditpurchase);
    }

    // Fetch a credit purchase by ID
    getCreditPurchaseById(creditpurchaseId) {
        return axios.get(`${CREDIT_API_BASE_URL}/${creditpurchaseId}`);
    }

    // Update a credit purchase
    updateCreditPurchase(creditpurchase, creditpurchaseId) {
        return axios.put(`${CREDIT_API_BASE_URL}/${creditpurchaseId}`, creditpurchase);
    }

    // Delete a credit purchase
    deleteCreditPurchase(creditpurchaseId) {
        return axios.delete(`${CREDIT_API_BASE_URL}/${creditpurchaseId}`);
    }

    // Update only the status of a credit purchase
    updateCreditStatus(creditpurchaseId, status) {
        return axios.patch(`${CREDIT_API_BASE_URL}/${creditpurchaseId}/status`, { status });
    }

}

export default new CreditPurchaseService();
