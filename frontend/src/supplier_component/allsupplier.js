import {useState,useEffect, useRef } from 'react'
import axios  from 'axios'
import "./allSuppliers.css";
import {useReactToPrint} from "react-to-print";
import html2pdf from 'html2pdf.js';

function AllSupplier(){

const [supplierlist,setsupplierlist]=useState([]);
const [searchbtn, setSearchBtn]=useState('');
const componentPDF = useRef();

//read
const getfetchdetails=async()=>{
    try{
        const data=await axios.get("http://localhost:8080/supplier")
        console.log(data.data.success)
        if(data.data.success){
            setsupplierlist(data.data.data)
        }
    }catch(err){
        console.log(err)
    }
}
useEffect(()=>{
getfetchdetails()
},[])

//delete
const handledelete=async(id)=>{
    const data=await axios.delete("http://localhost:8080/delete_supplier/"+id)
    if(data.data.success){
        getfetchdetails()
        console.log(data.data.message)
        alert("delete user successfully")
    }
}

//Search Button
const generateSearch = (e)=>{
    getData(searchbtn)
}

const getData = (searchbtn)=>{
    const getdata = supplierlist.filter(supplier=> 
        supplier.product.toLowerCase().includes(searchbtn.toLowerCase())
        );
        setsupplierlist(getdata);
}

 // Generate PDF report
 const generatePDF = () => {
    const opt = {
        margin:       1,
        filename:     'supplier_report.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a2', orientation:'portrait' }
    };

    html2pdf().from(componentPDF.current).set(opt).save();
};


    return(
<div>
    <body className='supplier_background'>
        <div className="container">
            <input
              id="srchinput"
              type="search"
              onChange={(e)=>setSearchBtn(e.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
            
          
            <button onClick={(e)=>generateSearch(e)} className="srchbtn" type="submit">
              Search
              
            </button>
            </div>

<div ref={componentPDF} style={{width: '100%'}}>
<table className='supplier_table'>
    
              
                        <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>E-mail</th>
                        <th>Product</th>
                        <th>Type</th>
                        <th>Unit Price</th>
                        <th>contract Start</th>
                        <th>Contract End</th>
                        <th>Place Orders</th>
                        <th>Update</th>
                        <th>Delete</th>
                        </tr>


                        <tbody>
                            { 
                               supplierlist.map((e1)=>{
                                return(
                                    <tr> 
                                      <td> {e1.name}</td> 
                                      <td> {e1.phone}</td> 
                                      <td> {e1.email}</td>
                                      <td> {e1.product}</td> 
                                      <td> {e1.type}</td>
                                      <td> {e1.unitPrice}</td>
                                      <td> {e1.contractStart}</td>
                                      <td> {e1.contractEnd}</td>
                                      <td>
                                      <a href={`/order/${e1._id}`} className='btn1'>Place Order</a>
                                      </td>
                                      <td>
                                        <a href={`/update/${e1._id}`} className='btn1'>Update</a>
                                     </td>
                                     <td>
                                        <button onClick={()=>handledelete(e1._id)}>Delete</button>
                                      </td>
                                    </tr>
                                )

                        })
                            }
                        </tbody>
            </table>
            </div>

            <button onClick={generatePDF} className="reportbtn" type="submit">
              Generate Report 
            </button>
            </body>
</div>
    )
}
export default AllSupplier