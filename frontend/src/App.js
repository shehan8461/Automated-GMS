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





function App() {
  return (
    <Router>
    <div className="App">
    



      <Routes>
       
      <Route path="/" element={ <MainPage/>}> </Route>

      
      <Route path="/marketing"  element={<div><Header/> <UserDashBoard/><DiscountDashboard/> </div>}> </Route>
    

      <Route path="/feedback_details" element={<div> <Header/><FeedbackDetails/></div>}> </Route>
      <Route path="/add_feedback" element={<div> <Header/><AddFeedback/></div>}></Route>
     


      <Route path="/add_discount" element={<div> <Header/><Adddiscount/></div>}></Route>
      <Route path="/discountdetails" element={<div> <Header/><DiscountDetails/></div>}></Route>
      <Route path="/update_discount/:id" element={<div> <Header/><UpdateDiscount/></div>}></Route>
  
   
      </Routes>
    
 
    </div>
    </Router>
  );
}

export default App;
