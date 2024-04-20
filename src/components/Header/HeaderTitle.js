import { colors } from "../../config/colors"
import React from "react"

// Defining a functional component called 'HeaderTitle' which takes a single 'props' argument
const HeaderTitle =(props)=>{
return(
    <div>
     <h1 style={{color:colors.primary}}>{props.title}</h1>

    </div>
)}
export default HeaderTitle