import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import "../GlovesPairing/GlovesPairing.css";
import "./PackDispatchTable.css";
import { Card, CardContent , Grid, TextField } from "@mui/material";
import Button from "../../components/Button/Button"


function PackDispatchTable(props) {

  const [isDelete,setisDelete] = useState(false);
  const [DispatchOrderDetail,setDispatchOrderDetail]= useState(false);
  const [DispatchOrderData, setDispatchOrderData]= useState([]);
  const [DeletePopup, setDeletePopup] = useState(false);
  const [DeleteUid,setDeleteUid] = useState('');
  
  // console.log("PackDispatchTable data", props.data[0].first_uid)
  // console.log("data type",typeof(props.data))
  const Data = isDelete ?  DispatchOrderDetail :  props.data


useEffect(()=>{
  Get_DispatchOrderData()


},[Data,props.data])


  const Get_DispatchOrderData = ()=>{


    const getlocaldata = localStorage.getItem(
      "DispatchOrderDetailTable"
    );

    const getlocaldata2 = JSON.parse(getlocaldata);
    setDispatchOrderData(getlocaldata2)


  }
  

  const DeleteIconHandle = (Uid) =>{
    setDeleteUid(Uid)
    setDeletePopup(true);
   }


  const DeleteHandle = async(e)=>{
    setDeletePopup(false);
    setisDelete(true)
    const key = 'DispatchOrderDetailTable';
    const oidkey = 'OrderIDList'
    // console.log("DeleteHandle data", e)
    const uidToRemove = e;
    
    
    const o_id_data = JSON.parse(localStorage.getItem(oidkey)) || [];
    const existingData = JSON.parse(localStorage.getItem(key)) || [];

    const Dispatch_Order_Detail_Table_filteredData = existingData.filter(item => item.first_uid == uidToRemove);
    
    const Order_id_Filter = existingData.filter(item=>item.order_id === Dispatch_Order_Detail_Table_filteredData[0].order_id)
  


    const updatedData = existingData.filter(item =>item.first_uid !== uidToRemove);

    await localStorage.setItem(key, JSON.stringify(updatedData));

   

    const getexistingData = JSON.parse(localStorage.getItem(key)) || [];
    setDispatchOrderDetail(getexistingData)
    setDeleteUid('')

    if(Order_id_Filter.length<2){
      const o_id_filter = o_id_data.filter(item=>item != Order_id_Filter[0].order_id)
      console.log("removed o_id",o_id_filter);
     await localStorage.setItem(oidkey, JSON.stringify(o_id_filter));
     if(JSON.parse(localStorage.getItem('DispatchOrderDetailTable')).length < 1){
      localStorage.removeItem("Customer_Name");
      localStorage.removeItem("DispatchOrderDetailTable");
      localStorage.removeItem("OrderIDList");
    }
     
     window.location.reload();
     
    }


  }
 

  return (
    <>
      <TableContainer className="pairing-table-container">
        <Table className="pairing-table">
          <TableHead>
            <TableRow>
              {/* <TableCell >
                <div className="d-flex">
                  <div>
                    
                  </div>
                  <div className="datepairing-checkbox">SR.No</div>
                </div>
              </TableCell> */}
              <TableCell className="cell-srno">SR.No</TableCell>
              <TableCell className="cell-uid">UID</TableCell>
              <TableCell >Product Description</TableCell>
              <TableCell className="cell-order-no">Order No</TableCell>
              <TableCell className="cell-order-id">Order ID</TableCell>
              <TableCell className="cell-delete-icon"></TableCell>

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
                                  ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Product Description"
                  name="Product Description"
                  
                ></input>
              </TableCell>
              <TableCell  className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Order No"
                  name="Order No"

                ></input>
              </TableCell>
              <TableCell  className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Order ID"
                  name="Class"
                  
                ></input>
              </TableCell>
              
              <TableCell ></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            {DispatchOrderData ? DispatchOrderData.map((e,index)=>{
          // const SrNumber = index +1
          return(
          <>
           <TableRow >
            <TableCell>{index + 1}</TableCell>
            <TableCell>{e.first_uid}-{e.second_uid}</TableCell>
            <TableCell> {e.product_discription}</TableCell>
            <TableCell> {e.order_number}</TableCell>
            <TableCell> {e.order_id}</TableCell>
          
            <TableCell><DeleteIcon value={e.first_uid} onClick={()=>{DeleteIconHandle(e.first_uid)}}/></TableCell>
          </TableRow>
          
          </>)
         
           

           }):null} 
            
            
            {/* <TableCell>{e.first_uid}-{e.second_uid}</TableCell>
            <TableCell> {e.product_discription}</TableCell>
            <TableCell> {e.order_id}</TableCell> */}
          </TableBody>
        </Table>
      </TableContainer>




{ DeletePopup ?(
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>Are You Sure</h4>
                  <h4>You Want To Delete ? </h4>
                </CardContent>
                <Button className='pairingcard-btn' title='Yes' onClick={()=>{DeleteHandle(DeleteUid)}}  />
                <Button className='pairingcard-btn' title='No' onClick={()=>{setDeletePopup(false)}}  />

              </Card>
            </div>
          </>
        ):null} 

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
    </>
  );


}

export default PackDispatchTable;
