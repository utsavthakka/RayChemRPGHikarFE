import React from "react";
import "../Header/Header.css"

// Defining a functional component called 'CustomerPortalHeader'
const CustomerPortalHeader = () => {
    return (
        <>
            <div className="customerPortal-Header">
                <div className="customerPortal-logo"><img src={require("../../assets/images/rayChemlogo.png")} style={{height:"41px"}} alt="RayChemlogo"/></div>
            </div>
        </>
    )
}
export default CustomerPortalHeader