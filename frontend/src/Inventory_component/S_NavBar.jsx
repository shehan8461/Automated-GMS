import React from 'react'
import './S_navBar.css'
// import logo from '../Images/selyn-high-resolution-logo-transparent.png'
function NavBar(){
    return(
        
        <div class="navbar-details">
          <a href="/">Home</a>
          <a href="/Inventory">All Inventory</a>
          <a href="/AddStock">Add Inventory</a>
          <a href="/Update/:id">Update Inventory</a>
          <a href="/Update/:id">About Us</a>
          <a href="/Update/:id">Contact</a>
        
          
        </div>
        
             
            )
}
export default NavBar