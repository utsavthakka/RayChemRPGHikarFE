import React from "react";

function StatusList({ title, status }) {
  return (
    <>
      <li>
        <div className="status-list-item">
          <div>{title}</div>
          <div className={`status-icon ${status ? "pass" : "falied"}`}>
            {status ? "P" : "F"}
          </div>
        </div>
      </li>
    </>
  );
}

export default StatusList;
