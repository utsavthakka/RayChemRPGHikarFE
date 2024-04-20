import React from 'react';
import "./SectionTitle.css"

// Defining a functional component called 'SectionTitle' which takes a 'title' prop
function SectionTitle({ title}) {
  return (
        <h2>{title}</h2>
  )
}

export default SectionTitle