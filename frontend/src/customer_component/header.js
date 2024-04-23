
import './header.css'

function Header(){
 return(
    <div>
        <nav>
        <ul>
            <a href="/"><li>Dash Board</li> </a>
            <a href="/feedback_details"><li>Customer Feedback Details</li> </a> 
             <a href="/add_feedback"><li>Enter Feedback</li> </a> 
             <a href="/add_discount"><li>Add Discount</li> </a> 
             <a href="/discountdetails"><li>Discount details</li> </a> 
            <li>About</li>
            <li>Contacts</li>
            
        </ul>
        </nav>
    </div>
 )
}
export default Header