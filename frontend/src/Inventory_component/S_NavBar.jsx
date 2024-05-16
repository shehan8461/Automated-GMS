import React from 'react'
import './S_navBar.css'
// import logo from '../Images/selyn-high-resolution-logo-transparent.png'
function NavBar(){
    return(
        
        <div class="navbar-details">
          <a href="/">Home</a>
          <a href="/Inventory">All Inventory</a>
          <a href="/AddStock">Add Inventory</a>
          <a href="/UpdateStock/:id">Update Inventory</a>
          <a href="/">About Us</a>
          <a href="/">Contact</a>
        
          
        </div>
        
             
            )
}
export default NavBar