import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import "../GlovesPairing/GlovesPairing.css";
import "./PackDispatchTable.css";
import {getPrintedBoxDetails} from './services';
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";





function PrintedBoxTable(props) {
const [ PrintedBoxDetails , setPrintedBoxDetails] = useState([]);
const [CustomerName, setCustomerName] = useState("");
const [BoxNo, setBoxNo] = useState("");
const [order_id, setorder_id] = useState([]);
const bulkvalue = {UID:"" ,ProductDescription:"" ,OrderNo: "" , OrderID : ""}
const [searchText, setsearchText]= useState(bulkvalue);


const box_no = props.box_number ??  BoxNo ;

console.log(".PrintedBoxTable........props.............",props);


useEffect(()=>{
  getPrintedBoxDetailsApi();
},[props,searchText])


const backButtonhandle = () =>{
  props.backButton()
}

const getPrintedBoxDetailsApi = async() =>{
  const params = {box_no:box_no}
  
  
const Uid_data = searchText.UID ??  null
console.log(".Uid_data........Uid_data............fffffffffffffffffffffffff",Uid_data)
  const search = {
    Uid:Uid_data,
    ProductDescription:searchText.ProductDescription,
    OrderNo:searchText.OrderNo,
    OrderID:searchText.OrderID
  }
  const Api = await getPrintedBoxDetails(params,search);
  
  if(Api.data.success==true){
    console.log("getPrintedBoxDetails.....",Api.data)
    const {printed_boxes ,customer_name , box_no, order_id} = Api.data.payload
    console.log(`printed_boxes:${printed_boxes},customer_name:${customer_name},box_no:${box_no},order_id:${order_id}`)
    setPrintedBoxDetails(printed_boxes);
    setCustomerName(customer_name);
    setBoxNo(box_no);
    setorder_id(order_id)


  }
}

const handleSearch = (e) =>{
  console.log(".......",e);
  const { name, value } = e.target;

  setsearchText({...searchText,[name]:value})
}



  return (
    <>
<div className="PrintedBoxDetail-container">

{/* <Link  > */}
  <div className="page-back-btn PBD-back-button" onClick={backButtonhandle}>
  <ArrowBackIcon />
              <span>Box Lable Printing</span>

  </div>

            {/* </Link> */}
          

      <div className="PrintedBoxDetail-main-container">
              
            <div
              className="PackDispatch-header-btn-group PrintedBoxDetail-header"
              style={{ gap: "70px" }}
            >
              <div className="PackDispatch-header-btn-data">
                <b style={{ margin: "3px" }}>Box No</b>
                <b style={{ margin: "3px" }}>:</b>
                {BoxNo}
              </div>

              <div className="PackDispatch-header-btn-data">
                <b style={{ margin: "3px" }}>Customer Name</b>
                <b style={{ margin: "3px" }}>:</b>
                <select className="Cname-drop-down" value={CustomerName}>
                  <option className="Cname-option" value={CustomerName}>{CustomerName}</option>
                </select>
              </div>
            </div>

            <div className="PackDispatch-header-btn-group orderid">
              <b>Order ID</b>
              <b style={{ margin: "2px" }}>:</b>

              {order_id
                ? order_id.map((m) => {
                    return (
                      <>
                        <button
                          className={`PackDispatch-page-header-btn filled `}
                        >
                          {m}
                        </button>
                      </>
                    );
                  })
                : null}
            </div>

      </div>




      <TableContainer className="pairing-table-container">
        <Table className="pairing-table">
          <TableHead>
            <TableRow>
             
              <TableCell className="cell-srno">SR.No</TableCell>
              <TableCell className="cell-uid">UID</TableCell>
              <TableCell >Product Description</TableCell>
              <TableCell className="cell-order-no">Order No</TableCell>
              <TableCell className="cell-order-id">Order ID</TableCell>

            </TableRow>

            <TableRow>
              <TableCell  className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="SR.No"
                  name="SR.No"

                ></input>
              </TableCell>
              <TableCell   className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="UID"
                  name="UID"
                  onChange={handleSearch}
                  value={searchText.UID}
                                  ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Product Description"
                  name="ProductDescription"
                  onChange={handleSearch}
                  value={searchText.ProductDescription}
                  
                ></input>
              </TableCell>
              <TableCell  className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Order No"
                  name="OrderNo"
                  onChange={handleSearch}
                  value={searchText.OrderNo}

                ></input>
              </TableCell>
              <TableCell  className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Order ID"
                  name="OrderID"
                  onChange={handleSearch}
                  value={searchText.OrderID}
                  
                ></input>
              </TableCell>
              

            </TableRow>
          </TableHead>
          <TableBody>

          {PrintedBoxDetails ? PrintedBoxDetails.map((e,index)=>{
          
                return(
                <>
                <TableRow >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{e.first_uid}-{e.second_uid}</TableCell>
                  <TableCell> {e.product_descriptions}</TableCell>
                  <TableCell> {e.order_number}</TableCell>
                  <TableCell> {e.order_id}</TableCell>
                </TableRow>
          
          </>)
           }):null} 
               
          </TableBody>

        </Table>
      </TableContainer>






      {/* <TablePagination
        className="table-pagination"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
      /> */}
      <div className="d-flex justify-content-end aborted">
        <p style={{ margin: 0, marginBottom: 0 }}>
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>

</div>

    </>
  );


}

export default PrintedBoxTable;
