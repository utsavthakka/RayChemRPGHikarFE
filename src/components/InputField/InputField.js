import React from 'react'
import { TextValidator } from "react-material-ui-form-validator";
import "./ImputField.css"

// Defining a functional component called 'InputField' which takes any props passed to it using the spread operator
export const InputField = ({
  ...props
}) => {
  // Returning a TextValidator component with any props passed to the component using the spread operator
  // The component has a custom class name 'input-field' which is defined in the imported CSS file
  return (
    <TextValidator className="input-field"
      {...props}
    />
  )
}
