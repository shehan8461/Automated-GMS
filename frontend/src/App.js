import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


import FeedbackDetails from './customer_component/feedbackdetails';
import AddFeedback from './customer_component/addfeedback';

import Header from './customer_component/header';
import UserDashBoard from './customer_component/customer_dashboard';
import Adddiscount from './discount_componenet/adddiscount';

import UpdateDiscount from './discount_componenet/updatediscount';
import DiscountDashboard from './discount_componenet/discount_dashboard';
import DiscountDetails from './discount_componenet/discountdetails';





function App() {
  return (
    <Router>
    <div className="App">
    
<Header/>


      <Routes>
   
      <Route path="/"  element={<div> <UserDashBoard/><DiscountDashboard/> </div>}> </Route>
    

      <Route path="/feedback_details" element={<FeedbackDetails/>}> </Route>
      <Route path="/add_feedback" element={<AddFeedback/>}></Route>
     


      <Route path="/add_discount" element={<Adddiscount/>}></Route>
      <Route path="/discountdetails" element={<DiscountDetails/>}></Route>
      <Route path="/update_discount/:id" element={<UpdateDiscount/>}></Route>
  
   
      </Routes>
    
 
    </div>
    </Router>
  );
}

export default App;
