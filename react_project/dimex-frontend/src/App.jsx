import './App.css'
import ListCustomerComponent from './components/ListCustomerComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent';
import ViewCustomerComponent from './components/ViewCustomerComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';
import UpdateCustomerComponent from './components/UpdateCustomerCompenent';
import SellerDashboard from './components/SellerDashboard';
import ListSupplierComponent from './components/ListSupplierComponent';
import ViewSupplierComponent from './components/ViewSupplierComponent';
import CreateSupplierComponent from './components/CreateSupplierComponent';
import UpdateSupplierComponent from './components/UpdateSupplierComponent';
import ListItemComponent from './components/ListItemComponent';
import ViewItemComponent from './components/ViewItemComponent';
import CreateItemComponent from './components/CreateItemComponent';
import UpdateItemComponent from './components/UpdateItemComponent';
import ListPurchaseOrderComponent from './components/ListPurchaseOrderComponent';
import ViewPurchaseOrderComponent from './components/ViewPurchaseOrderComponent';
import CreatePurchaseOrderComponent from './components/CreatePurchaseOrderComponent';
import UpdatePurchaseOrderComponent from './components/UpdatePurchaseOrderComponent';
import ListCategoryComponent from './components/ListCategoryComponent';
import CreateCategoryComponent from './components/CreateCategoryComponent';
import UpdateCategoryComponent from './components/UpdateCategoryComponent';
import ListSellingComponent from './components/ListSellingComponent';
import CreateSellingComponent from './components/CreateSellingComponent';
import LoginPage from './components/LoginPage';
import SellerViewSellingComponent from './components/SellerViewSellingComponent';
import SellerViewItemComponent from './components/SellerViewItemComponent';
import AdminDashboard from './components/AdminDashboard';
import BillPrint from './components/BillPrint';
import UpdateSellingComponent from './components/UpdateSellingComponent';
import CreateReturnComponent from './components/CreateReturnItemComponent';
import ListReturnItemComponent from './components/ListReturnItemComponent';
import CreateCreditPurchaseComponent from './components/CreateCreditPurchaseComponent';
import ListCreditPurchaseComponent from './components/ListCreditPurchaseComponent';
import CreateDamageItemComponent from './components/CreateDamageItemComponent';
import ListDamageItemComponent from './components/ListDamageItemComponent';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
 
        <div className="container">
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/list-customer" element={<ListCustomerComponent />} />
            <Route path="/add-customer" element={<CreateCustomerComponent />} />
            <Route path="/view-customer/:id" element={<ViewCustomerComponent />} />
            <Route path="/update-customer/:id" element={<UpdateCustomerComponent />} />
            <Route path="/list-supplier" element={<ListSupplierComponent />} />
            <Route path="/add-supplier" element={<CreateSupplierComponent />} />
            <Route path="/view-supplier/:id" element={<ViewSupplierComponent />} />
            <Route path="/update-supplier/:id" element={<UpdateSupplierComponent />} />
            <Route path="/list-item" element={<ListItemComponent />} />
            <Route path="/add-item" element={<CreateItemComponent />} />
            <Route path="/view-item/:id" element={<ViewItemComponent />} />
            <Route path="/update-item/:id" element={<UpdateItemComponent />} />
            <Route path="/list-purchase" element={<ListPurchaseOrderComponent />} />
            <Route path="/add-purchase" element={<CreatePurchaseOrderComponent />} />
            <Route path="/view-purchase/:id" element={<ViewPurchaseOrderComponent />} />
            <Route path="/update-purchase/:id" element={<UpdatePurchaseOrderComponent />} />
            <Route path="/list-category" element={<ListCategoryComponent />} />
            <Route path="/add-category" element={<CreateCategoryComponent />} />
            <Route path="/update-category/:id" element={<UpdateCategoryComponent />} />
            <Route path="/list-selling" element={<ListSellingComponent />} />
            <Route path="/add-selling" element={<CreateSellingComponent />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/seller-selling" element={<SellerViewSellingComponent />} />
            <Route path="/seller-item" element={<SellerViewItemComponent />} />
            <Route path="/update-selling/:id" element={<UpdateSellingComponent />} />
            <Route path="/add-return" element={<CreateReturnComponent />} />
            <Route path="/list-return" element={<ListReturnItemComponent />} />
            <Route path="/add-credit" element={<CreateCreditPurchaseComponent />} />
            <Route path="/list-credit" element={<ListCreditPurchaseComponent />} />
            <Route path="/add-damage" element={<CreateDamageItemComponent />} />
            <Route path="/list-damage" element={<ListDamageItemComponent />} />
            <Route path="/bill-print" element={<BillPrint />} />
           
        </Routes>
        </div>
       
      </Router>
    </div>
  );
}

export default App
