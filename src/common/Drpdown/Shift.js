import React from "react";

const ShiftDrpdown = ({ searchText, HandleSearch }) => {
  return (
    <>
      <select
        name="Shift"
        className="select_print_result"
        value={searchText.Shift}
        onChange={HandleSearch}
      >
        <option value="">Shift</option>
        <option value="Shift 1">Shift 1</option>
        <option value="Shift 2">Shift 2</option>
        <option value="Shift 3">Shift 3</option>
      </select>
    </>
  );
};
export default ShiftDrpdown;
