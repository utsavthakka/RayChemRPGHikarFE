import React from "react"
import "../../common/Button/Button.css"
import CButton from "@mui/material/Button";


// Defining a functional component called 'Button' which takes a 'name' prop
const Button = ({ name }) => {
    return (
        <CButton color="primary" type="submit" className="send-docs-button">{name}</CButton>
    )
}
export default Button