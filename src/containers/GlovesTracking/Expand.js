import React, { useState, PureComponent, useMemo, useEffect } from "react";
import { Box, Card, Grid } from "@material-ui/core";
import dayjs from "dayjs";
import "./GlovesTracking.css";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import nextIcon from "../../assets/images/nextIcon.svg";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import InfoIcon from "@mui/icons-material/Info";
import "react-datepicker/dist/react-datepicker.css";
import { useCubeQuery } from "@cubejs-client/react";
import { images } from "../../config/images";

const statusFlow = [
  {
    statsusName: "UID Printing",
    status: "true",
  },
  {
    statsusName: "Visual Inspection",
    status: "true",
  },
  {
    statsusName: "Electric Test",
    status: "pending",
  },
  {
    statsusName: "Final Visual Inspection",
    status: "true",
  },
  {
    statsusName: "QR Printing",
    status: "pending",
  },
  {
    statsusName: "Pairing",
    status: "pending",
  },
  {
    statsusName: "Dispatch",
    status: "pending",
  },
];

const Expanded = ({
  row,
  isItemSelected,
  label,
  ButtonPress,
  handleVisualModalOpen,
  handleClickedOpen,
  handleClick,
  uidPrintGreenCheck,
  uidPrintBlackCheck,
  uidPrintRedCheck,
  uidPrinting,
  handleUpiPrinting,
  handleFinalVisualModal,
  visualInspection,
  visualRedCheck,
  visualBlackCheck,
  visualGreenCheck,
  electricTest,
  electricGreenCheck,
  greenCheck,
  redCheck,
  blackCheck,
  electricRedCheck,
  electricBlackCheck,
  finalVisualInspection,
  qrPrinting,
  pairing,
  finalVisualGreenCheck,
  finalVisualBlackCheck,
  finalVisualRedCheck,
  page,
  filterData,
  setFilterData,
  userPermission,
  handleToastMsg
}) => {
  const [isExpand, setExpand] = useState(false);
  const [result, setResult] = useState(null);
  const [batchUID, setBatchUID] = useState([]);
  const [isChecked, setIsChecked] = React.useState([]);
  const UID = batchUID.length ?  batchUID.map(String) : [`${row.batchid}`] ;

  useEffect(() => {
    setExpand(false);
    setFilterData(false);
  }, [page]);

  useEffect(() => {
    if(filterData){
      if(isChecked.length){
        console.log(isChecked);
        setExpand(true);
      }else{
        setExpand(false);
      }
    }
  },[filterData,isChecked])

  useEffect(() => {
    if (!result) {
      return true;
    }


   if(filterData){
    if (
      uidPrinting == true ||
      visualInspection == true ||
      electricTest == true ||
      finalVisualInspection == true ||
      qrPrinting == true ||
      pairing == true
    ) {
      if (greenCheck == true || redCheck == true || blackCheck == true) {
        const newArray = [[], [], [], [], [], []];
        const newArray2 = [[], [], [], [], [], []];
        const newArray1 = [];

        for (const item of result) {
          if (uidPrinting && greenCheck && item.uidPrinting == true) {
            newArray[0].push(item);
          }

          if (uidPrinting && redCheck && item.uidPrinting == false) {
            newArray[0].push(item);
          }

          if (uidPrinting && blackCheck && item.uidPrinting == null) {
            newArray[0].push(item);
          }

          if (visualInspection && greenCheck && item.visualInspection == true) {
            newArray[1].push(item);
          }
          if (visualInspection && redCheck && item.visualInspection == false) {
            newArray[1].push(item);
          }

          if (visualInspection && blackCheck && item.visualInspection == null) {
            newArray[1].push(item);
          }
          if (electricTest && greenCheck && item.electricTest == true) {
            newArray[2].push(item);
          }
          if (electricTest && redCheck && item.electricTest == false) {
            newArray[2].push(item);
          }

          if (electricTest && blackCheck && item.electricTest == null) {
            newArray[2].push(item);
          }

          if (
            finalVisualInspection &&
            greenCheck &&
            item.finalVisualInspection == true
          ) {
            newArray[3].push(item);
          }

          if (
            finalVisualInspection &&
            redCheck &&
            item.finalVisualInspection == false
          ) {
            newArray[3].push(item);
          }
          if (
            finalVisualInspection &&
            blackCheck &&
            item.finalVisualInspection == null
          ) {
            newArray[3].push(item);
          }
          if (qrPrinting && greenCheck && item.qrPrinting == true) {
            newArray[4].push(item);
          }
          if (qrPrinting && redCheck && item.qrPrinting == false) {
            newArray[4].push(item);
          }
          if (qrPrinting && blackCheck && item.qrPrinting == null) {
            newArray[4].push(item);
          }
          if (pairing && greenCheck && item.pairing == true) {
            newArray[5].push(item);
          }
          if (pairing && redCheck && item.pairing == false) {
            newArray[5].push(item);
          }
          if (pairing && blackCheck && item.pairing == null) {
            newArray[5].push(item);
          }
        }

        const shortestIndex = newArray.reduce((acc, curr, index) => {
          if (curr.length === 0) return acc; // skip empty sub-arrays
          if (newArray[acc].length === 0) return index; // handle the case where the accumulator is an empty sub-array
          return curr.length < newArray[acc].length ? index : acc;
        }, 0);

        newArray[shortestIndex].map((item) => {
          if (uidPrinting && greenCheck) {
            // if (!blackCheck) {
            if (item.uidPrinting == true) {
              return true;
            } else {
              newArray2[0].push("filter");
            }
            // } else {
            //     return true
            // }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (uidPrinting && blackCheck) {
            if (item.uidPrinting == null) {
              return true;
            } else {
              newArray2[0].push("filter");
            }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (uidPrinting && redCheck) {
            if (item.uidPrinting == false) {
              return true;
            } else {
              newArray2[0].push("filter");
            }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (visualInspection && greenCheck) {
            if (item.visualInspection == true) {
              return true;
            } else {
              newArray2[1].push("filter");
            }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (visualInspection && redCheck) {
            // if (!blackCheck) {
            if (item.visualInspection == false) {
              return true;
            } else {
              newArray2[1].push("filter");
            }
            // } else {
            //     return true
            // }
          }
        });
        newArray[shortestIndex].map((item) => {
          if (visualInspection && blackCheck) {
            if (item.visualInspection == null) {
              return true;
            } else {
              newArray2[0].push("filter");
            }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (electricTest && greenCheck) {
            // if (!blackCheck) {
            if (item.electricTest == true) {
              return true;
            } else {
              newArray2[2].push("filter");
            }
            // } else {
            //     return true
            // }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (electricTest && redCheck) {
            // if (!blackCheck) {
            if (item.electricTest == false) {
              return true;
            } else {
              newArray2[2].push("filter");
            }
            // } else {
            //     return true
            // }
          }
        });
        newArray[shortestIndex].map((item) => {
          if (electricTest && blackCheck) {
            if (item.electricTest == null) {
              return true;
            } else {
              newArray2[0].push("filter");
            }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (finalVisualInspection && greenCheck) {
            // if (!blackCheck) {
            if (item.finalVisualInspection == true) {
              return true;
            } else {
              newArray2[3].push("filter");
            }
            // } else {
            //     return true
            // }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (finalVisualInspection && redCheck) {
            // if (!blackCheck) {
            if (item.finalVisualInspection == false) {
              return true;
            } else {
              newArray2[3].push("filter");
            }
            // } else {
            //     return true
            // }
          }
        });
        newArray[shortestIndex].map((item) => {
          if (finalVisualInspection && blackCheck) {
            if (item.finalVisualInspection == null) {
              return true;
            } else {
              newArray2[0].push("filter");
            }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (qrPrinting && greenCheck) {
            // if (!blackCheck) {
            if (item.qrPrinting == true) {
              return true;
            } else {
              newArray2[4].push("filter");
            }
            // } else {
            //     return true
            // }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (qrPrinting && redCheck) {
            // if (!blackCheck) {
            if (item.qrPrinting == false) {
              return true;
            } else {
              newArray2[4].push("filter");
            }
            // } else {
            //     return true
            // }
          }
        });
        newArray[shortestIndex].map((item) => {
          if (qrPrinting && blackCheck) {
            if (item.qrPrinting == null) {
              return true;
            } else {
              newArray2[0].push("filter");
            }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (pairing && greenCheck) {
            // if (!blackCheck) {
            if (item.pairing == true) {
              return true;
            } else {
              newArray2[5].push("filter");
            }
            // } else {
            //     return true
            // }
          }
        });

        newArray[shortestIndex].map((item) => {
          if (pairing && redCheck) {
            // if (!blackCheck) {
            if (item.pairing == false) {
              return true;
            } else {
              newArray2[5].push("filter");
            }
            // } else {
            //     return true
            // }
          }
        });
        newArray[shortestIndex].map((item) => {
          if (pairing && blackCheck) {
            if (item.pairing == null) {
              return true;
            } else {
              newArray2[0].push("filter");
            }
          }
        });

        if (
          newArray2[0].length == newArray[shortestIndex].length ||
          newArray2[0].length - newArray[shortestIndex].length ==
            newArray[shortestIndex].length ||
          newArray2[0].length - newArray[shortestIndex].length * 2 ==
            newArray[shortestIndex].length ||
          newArray2[1].length == newArray[shortestIndex].length ||
          newArray2[1].length - newArray[shortestIndex].length ==
            newArray[shortestIndex].length ||
          newArray2[1].length - newArray[shortestIndex].length * 2 ==
            newArray[shortestIndex].length ||
          newArray2[2].length == newArray[shortestIndex].length ||
          newArray2[2].length - newArray[shortestIndex].length ==
            newArray[shortestIndex].length ||
          newArray2[2].length - newArray[shortestIndex].length * 2 ==
            newArray[shortestIndex].length ||
          newArray2[3].length == newArray[shortestIndex].length ||
          newArray2[3].length - newArray[shortestIndex].length ==
            newArray[shortestIndex].length ||
          newArray2[3].length - newArray[shortestIndex].length * 2 ==
            newArray[shortestIndex].length ||
          newArray2[4].length == newArray[shortestIndex].length ||
          newArray2[4].length - newArray[shortestIndex].length ==
            newArray[shortestIndex].length ||
          newArray2[4].length - newArray[shortestIndex].length * 2 ==
            newArray[shortestIndex].length ||
          newArray2[5].length == newArray[shortestIndex].length ||
          newArray2[5].length - newArray[shortestIndex].length ==
            newArray[shortestIndex].length ||
          newArray2[5].length - newArray[shortestIndex].length * 2 ==
            newArray[shortestIndex].length
        ) {
          setIsChecked([]);
        } else {
          for (const element of row.batch_id) {
            for (const item of newArray[shortestIndex]) {
              if (item.uId_type == element.uid_id_type) {
                newArray1.push(element);
              }
            }
            setIsChecked(newArray1);
          }
        }
      } else {
        setIsChecked(row.batch_id);
      }
    } else {
      setIsChecked(row.batch_id);
    }
   } else {
    setIsChecked(row.batch_id);
  }
  }, [
    result,
    greenCheck,
    redCheck,
    blackCheck,
    uidPrinting,
    visualInspection,
    electricTest,
    finalVisualInspection,
    qrPrinting,
    pairing,
    page,
  filterData
    ]);

  const GlovesTrackingResult = useCubeQuery(
    {
      dimensions: [
        "GlovesTrackingGlovestracking.batchId",
        "GlovesTrackingGlovestracking.thickness",
        "HomeUid.uidIdType",
        "GlovesTrackingGlovestracking.uidPrinting",
        "GlovesTrackingGlovestracking.visualInspection",
        "GlovesTrackingGlovestracking.electricTest",
        "GlovesTrackingGlovestracking.finalVisualInspection",
        "GlovesTrackingGlovestracking.qrPrinting",
        "GlovesTrackingGlovestracking.pairing",
      ],
      filters: [
        {
          member: "GlovesTrackingGlovestracking.batchId",
          operator: "equals",
          values: UID.length ? UID : ["1"],
        },
      ],
    },
    { subscribe: isExpand ? true : false }
  );

  useMemo(() => {
    if (GlovesTrackingResult.resultSet) {
      const data = GlovesTrackingResult.resultSet.tablePivot();
      const array = data.map((_element, index) => {
        return {
          batchId: data[index]["GlovesTrackingGlovestracking.batchId"],
          uId_type: data[index]["HomeUid.uidIdType"],
          thickness: data[index]["GlovesTrackingGlovestracking.thickness"],
          uidPrinting: data[index]["GlovesTrackingGlovestracking.uidPrinting"],
          visualInspection:
            data[index]["GlovesTrackingGlovestracking.visualInspection"],
          electricTest:
            data[index]["GlovesTrackingGlovestracking.electricTest"],
          finalVisualInspection:
            data[index]["GlovesTrackingGlovestracking.finalVisualInspection"],
          qrPrinting: data[index]["GlovesTrackingGlovestracking.qrPrinting"],
          pairing: data[index]["GlovesTrackingGlovestracking.pairing"],
        };
      });
      setResult(array);
    }
  }, [GlovesTrackingResult.resultSet]);

  const onExpandPress = (uid) => {
    setExpand(!isExpand);
    if (batchUID.length) {
      setBatchUID(
        batchUID.filter((item) => item !== uid.slice(0, 1)[0].batch_id)
      );
    }
    if (!batchUID.includes(uid.slice(0, 1)[0].batch_id)) {
      setBatchUID([...batchUID, uid.slice(0, 1)[0].batch_id]);
    }
  };

  function visualInpectionhandle(uid, visual) {
    if (visual === true) {
      handleVisualModalOpen(uid, visual);
    } else if (visual === false) {
      handleVisualModalOpen(uid, visual);
    }
  }

  function electricTesthandle(uid, electric) {
    if (electric === true) {
      handleClickedOpen(uid, electric);
    }

    if (electric === false) {
      handleClickedOpen(uid, electric);
    }
  }

  function finalVisualInspectionhandle(uid, finalVisual) {
    if (finalVisual === true) {
      handleFinalVisualModal(uid, finalVisual);
    }

    if (finalVisual === false) {
      handleFinalVisualModal(uid, finalVisual);
    }
  }

  return (
    <React.Fragment key={row.bNo}>
      <TableRow
        className={`${row.is_abort ? "aborded_batch " : ""}`}
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.bNo}
        selected={isItemSelected}
      >
          {userPermission.find(
                        (permission) => permission.module === "Gloves Tracking").is_editor == true &&
           userPermission.find(
          (permission) => permission.module === "Gloves Tracking"
        ) .is_viewer == true ?
        <TableCell padding="checkbox">
          <Checkbox
            onClick={(event) => handleClick(event, row.batchid)}
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": label,
            }}
          />
        </TableCell>
      :
      <TableCell padding="checkbox">
      <Checkbox
        onClick={() => handleToastMsg()}
        color="primary"
        checked={isItemSelected}
        inputProps={{
          "aria-labelledby": label,
        }}
      />
    </TableCell>
      }
        <TableCell> {dayjs(row.created_at).format("YYYY-MM-DD")}</TableCell>

        <TableCell scope="row" padding="none">
          {row.batch_type}
        </TableCell>

        <TableCell className="has-printer-button">
          {" "}
          {row.batch_id?.length > 0
            ? `${row.batch_id[0].uid_id_type} - ${
                row.batch_id[row.batch_id.length - 1].uid_id_type
              }`
            : "-"}
             {userPermission.find(
                        (permission) => permission.module === "Gloves Tracking").is_editor == true &&
           userPermission.find(
          (permission) => permission.module === "Gloves Tracking"
        ) .is_viewer == true ?
          <button
            className={
              row.is_printed
                ? "page-header-btn-disabled printer-icon"
                : "page-header-btn printer-icon"
            }
            onClick={ButtonPress}
          >
            <img
              src={images.printIcon}
              className={row.is_printed ? "disable-print-btn" : ""}
            />
          </button>
          :

          <button
          className={
            row.is_printed
              ? "page-header-btn-disabled printer-icon"
              : "page-header-btn printer-icon"
          }
          onClick={handleToastMsg}
        >
          <img
            src={images.printIcon}
            className={row.is_printed ? "disable-print-btn" : ""}
          />
        </button>
}
        </TableCell>
        <TableCell>{row.lot_number || "-"}</TableCell>
        <TableCell>{row.class_name}</TableCell>
        <TableCell>{row.size_name}</TableCell>
        <TableCell>{row.scre}</TableCell>

        <TableCell style={{ width: "0%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => onExpandPress(row.batch_id)}
          >
            {isExpand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
       
      </TableRow>

      <TableRow>
        <TableCell colSpan={9} className="insideModalTable">
          <Collapse in={isExpand} timeout="auto" unmountOnExit>
            <Box className="insideTable">
              <Table
                size="small"
                aria-label="purchases"
                style={{ borderRadius: "0px" }}
              >
                <TableBody>
                  {isChecked.map((element) => {
                    const array =
                      result !== null
                        ? result.find((e) => e.uId_type === element.uid_id_type)
                        : "";
                    return (
                      <>
                        <TableRow key={row.batch_id}>
                          <TableCell>{element.uid_id_type}</TableCell>
                          <TableCell className="status-flow-wrap">
                            <div
                              className={`status ${
                                array ? array.uidPrinting : null
                              } table-tag-btn`}
                            >
                              UID Printing
                            </div>
                            <img
                              src={nextIcon}
                              alt=""
                              className="nextIcon"
                            ></img>
                            <div
                              className={`status ${
                                array ? array.visualInspection : null
                              } table-tag-btn`}
                              onClick={() =>
                                visualInpectionhandle(
                                  element.uid_id_type,
                                  array.visualInspection
                                )
                              }
                            >
                              Visual Inspection
                              {array ? (
                                array.visualInspection ? (
                                  array ? (
                                    array.thickness ? (
                                      <InfoIcon />
                                    ) : (
                                      <InfoIcon className="disabled-icon" />
                                    )
                                  ) : (
                                    <InfoIcon className="disabled-icon" />
                                  )
                                ) : array ? (
                                  array.thickness ? (
                                    <InfoIcon />
                                  ) : (
                                    <InfoIcon className="disabled-icon" />
                                  )
                                ) : (
                                  <InfoIcon className="disabled-icon" />
                                )
                              ) : (
                                <InfoIcon className="disabled-icon" />
                              )}
                            </div>
                            <img
                              src={nextIcon}
                              alt=""
                              className="nextIcon"
                            ></img>
                            <div
                              className={`status ${
                                array ? array.electricTest : null
                              } table-tag-btn`}
                              onClick={() =>
                                electricTesthandle(
                                  element.uid_id_type,
                                  array.electricTest
                                )
                              }
                            >
                              Electric Test
                              {array ? (
                                array.electricTest ? (
                                  <InfoIcon />
                                ) : array.electricTest === false ? (
                                  <InfoIcon />
                                ) : (
                                  <InfoIcon className="disabled-icon" />
                                )
                              ) : (
                                <InfoIcon className="disabled-icon" />
                              )}
                            </div>
                            <img
                              src={nextIcon}
                              alt=""
                              className="nextIcon"
                            ></img>
                            <div
                              className={`status ${
                                array ? array.finalVisualInspection : null
                              } table-tag-btn`}
                              onClick={() =>
                                finalVisualInspectionhandle(
                                  element.uid_id_type,
                                  array.finalVisualInspection
                                )
                              }
                            >
                              Final Visual Inspection
                              {array ? (
                                array.finalVisualInspection ? (
                                  <InfoIcon />
                                ) : array.finalVisualInspection === false ? (
                                  <InfoIcon />
                                ) : (
                                  <InfoIcon className="disabled-icon" />
                                )
                              ) : (
                                <InfoIcon className="disabled-icon" />
                              )}
                            </div>
                            <img
                              src={nextIcon}
                              alt=""
                              className="nextIcon"
                            ></img>
                            <div
                              className={`status ${
                                array ? array.qrPrinting : null
                              } table-tag-btn`}
                            >
                              QR Printing
                            </div>
                            <img
                              src={nextIcon}
                              alt=""
                              className="nextIcon"
                            ></img>
                            <div
                              className={`status ${
                                array ? array.pairing : null
                              } table-tag-btn`}
                            >
                              Pairing
                            </div>
                            <img
                              src={nextIcon}
                              alt=""
                              className="nextIcon"
                            ></img>
                            <div
                              className={`status ${statusFlow[6].status} table-tag-btn`}
                            >
                              Dispatch
                            </div>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
export default Expanded;
