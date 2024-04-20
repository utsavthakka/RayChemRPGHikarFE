import React from 'react'
import "./Button.css"

function Button({ ...props }) {
  // Returning a JSX element which is a button with any props passed to the component using the spread operator
  // The text content of the button is specified by the 'title' prop
  return (
    <button {...props}>
        {props.title}
    </button>
  )
}

export default Button