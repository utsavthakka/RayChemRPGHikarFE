import React from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

const ProductionExpand = ({ row }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          <div
            className={`${
              row.priority == "Low"
                ? "lowpriority"
                : row.priority == "Medium"
                ? "mediumpriorty"
                : "highpriority"
            }`}
          />
        </TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell scope="row">{row.days_left}</TableCell>
        <TableCell>{row.order_id}</TableCell>
        <TableCell>{row.customer_name}</TableCell>
        <TableCell>{row.order_quantity}</TableCell>
        <TableCell>{row.paired_quantity}</TableCell>
        <TableCell>{row.packed_quantity}</TableCell>
        <TableCell>{row.dispatched_quantity}</TableCell>

        <TableCell style={{ width: "0%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={9} className="insideProductionTable">
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="insideProductionTable">
              <Table
                size="small"
                aria-label="purchases"
                style={{ borderRadius: "0px" }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      style={{ fontSize: "17px", fontWeight: 500 }}
                    >
                      {row.order_item_code
                        ? row.order_item_code.ordered_item
                        : null}
                    </TableCell>
                    <TableCell style={{ fontSize: "17px", fontWeight: 500 }}>
                      Order Date
                    </TableCell>
                    <TableCell style={{ fontSize: "17px", fontWeight: 500 }}>
                      Promise Date
                    </TableCell>
                    <TableCell style={{ fontSize: "17px", fontWeight: 500 }}>
                      Type
                    </TableCell>
                    <TableCell style={{ fontSize: "17px", fontWeight: 500 }}>
                      Class
                    </TableCell>
                    <TableCell style={{ fontSize: "17px", fontWeight: 500 }}>
                      Length
                    </TableCell>
                    <TableCell style={{ fontSize: "17px", fontWeight: 500 }}>
                      {" "}
                      Size
                    </TableCell>
                    <TableCell style={{ fontSize: "17px", fontWeight: 500 }}>
                      Cuff
                    </TableCell>
                    <TableCell style={{ fontSize: "17px", fontWeight: 500 }}>
                      STD
                    </TableCell>
                    <TableCell style={{ fontSize: "17px", fontWeight: 500 }}>
                      Color
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ background: "#ffff" }}>
                      {row ? row.order_date : null}
                    </TableCell>
                    <TableCell style={{ background: "#ffff" }}>
                      {row ? row.promise_date : null}
                    </TableCell>
                    <TableCell style={{ background: "#ffff" }}>
                      {row.order_item_code ? row.order_item_code.type : null}
                    </TableCell>
                    <TableCell style={{ background: "#ffff" }}>
                      {row.order_item_code
                        ? row.order_item_code.class_id
                        : null}
                    </TableCell>
                    <TableCell style={{ background: "#ffff" }}>
                      {row.order_item_code ? row.order_item_code.length : null}
                    </TableCell>
                    <TableCell style={{ background: "#ffff" }}>
                      {row.order_item_code ? row.order_item_code.size : null}
                    </TableCell>
                    <TableCell style={{ background: "#ffff" }}>
                      {row.order_item_code ? row.order_item_code.cuff : null}
                    </TableCell>
                    <TableCell style={{ background: "#ffff" }}>
                      {row.order_item_code ? row.order_item_code.std : null}
                    </TableCell>
                    <TableCell style={{ background: "#ffff" }}>
                      {row.order_item_code ? row.order_item_code.color : null}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <div className="d-flex justify-content-end aborted">
        <p style={{ margin: 0, marginBottom: 0 }}>
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>
    </>
  );
};

export default ProductionExpand;
