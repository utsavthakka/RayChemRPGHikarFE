import React from "react";

const RorLdropdown = ({ searchText, handleSearchData }) => {
  return (
    <>
      <select
        name="RorL"
        className="select_print_result"
        value={searchText.RorL}
        onChange={handleSearchData}
      >
        <option value="">L/R</option>
        <option value="Left">Left</option>
        <option value="Right">Right</option>
      </select>
    </>
  );
};

export default RorLdropdown;
