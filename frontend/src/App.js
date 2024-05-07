import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


import FeedbackDetails from './customer_component/feedbackdetails';
import AddFeedback from './customer_component/addfeedback';

import Header from './customer_component/header';
import UserDashBoard from './customer_component/customer_dashboard';
import Adddiscount from './discount_componenet/adddiscount';

import UpdateDiscount from './discount_componenet/updatediscount';
import DiscountDashboard from './discount_componenet/discount_dashboard';
import DiscountDetails from './discount_componenet/discountdetails';
import MainPage from './MainPageComponent/MainPage';



import AddSupplier from './supplier_component/addSupplier';
import AllSupplier from './supplier_component/allsupplier';
import UpdateSupplier from './supplier_component/updatesupplier';

import SupplierDashBoard from './supplier_component/supplierDashBoard';
import PlaceOrder from './supplier_order_comonent/placeOrder';
import AllOrders from './supplier_order_comonent/allOrders';
import UpdateOrder from './supplier_order_comonent/updateOrder';
import NavBar from './supplier_component/NavBar';
import SupplierUI from './supplierUI_component/supplierUI';




function App() {
  return (
    <Router>
    <div className="App">
    



      <Routes>
       
      <Route path="/" element={ <MainPage/>}> </Route>

      {/* Marketing routes */}
      <Route path="/marketing"  element={<div><Header/> <UserDashBoard/><DiscountDashboard/> </div>}> </Route>
    

      <Route path="/feedback_details" element={<div> <Header/><FeedbackDetails/></div>}> </Route>
      <Route path="/add_feedback" element={<div> <Header/><AddFeedback/></div>}></Route>
     


      <Route path="/add_discount" element={<div> <Header/><Adddiscount/></div>}></Route>
      <Route path="/discountdetails" element={<div> <Header/><DiscountDetails/></div>}></Route>
      <Route path="/update_discount/:id" element={<div> <Header/><UpdateDiscount/></div>}></Route>


    {/* Supplier routes */}
    
     <Route path="/adduser" element={<div> <NavBar/> <AddSupplier/></div>}></Route>
     <Route path="/allSupplier" element={<div><NavBar/> <AllSupplier/></div>}></Route>
     <Route path="/update/:id" element={<div> <NavBar/> <UpdateSupplier/></div>}></Route>
     <Route path="/count" element={<div> <NavBar/> <SupplierDashBoard/></div>}></Route>

     <Route path="/order/:id" element={<div> <NavBar/> <PlaceOrder/></div>}></Route>
     <Route path="/allorders" element={<div> <NavBar/> <AllOrders/></div>}></Route>
     <Route path="/updateorder/:id" element={<div> <NavBar/> <UpdateOrder/></div>}></Route>
     <Route path="/supplierui" element={ <SupplierUI/>}></Route>
   
      </Routes>
    
 
    </div>
    </Router>
  );
}

export default App;
