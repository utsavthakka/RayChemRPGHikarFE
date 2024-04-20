import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export const Dispatch = () => {
  return (
    <>
      <div className="sales-card d-flex">
        <p>Domestic : 1000</p>
        <p>Export : 1566</p>
        <p>Total : 2566</p>
      </div>
      <div className="production-qty">{/* <DispatchSummaryChart /> */}</div>
      <div>
        <div className="table-responsive sales-table">
          <Table aria-label="Analytics">
            <TableHead>
              <TableRow>
                <TableCell>Parameters</TableCell>
                <TableCell>Class 00</TableCell>
                <TableCell>Class 0</TableCell>
                <TableCell>Class 1</TableCell>
                <TableCell>Class 2</TableCell>
                <TableCell>Class 3</TableCell>
                <TableCell>Class 4</TableCell>
                <TableCell>Over Gloves</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="production-tablebody">
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="export-btn m-1"></span> Export
                  </div>
                </TableCell>
                <TableCell>8000</TableCell>
                <TableCell>8000</TableCell>
                <TableCell>8000</TableCell>
                <TableCell>8000</TableCell>
                <TableCell>8000</TableCell>
                <TableCell>8000</TableCell>
                <TableCell>8000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="acceptedparam-btn m-1"></span> Domestic
                  </div>
                </TableCell>
                <TableCell>790</TableCell>
                <TableCell>3534</TableCell>
                <TableCell>4200</TableCell>
                <TableCell>6717</TableCell>
                <TableCell>4500</TableCell>
                <TableCell>3889</TableCell>
                <TableCell>3889</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="produced-btn m-1"></span> Total
                  </div>
                </TableCell>
                <TableCell>326</TableCell>
                <TableCell>1588</TableCell>
                <TableCell>4000</TableCell>
                <TableCell>3638</TableCell>
                <TableCell>4000</TableCell>
                <TableCell>2132</TableCell>
                <TableCell>2132</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="d-flex justify-content-end aborted">
        <p style={{ margin: 0, marginBottom: 0 }}>
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>
    </>
  );
};
