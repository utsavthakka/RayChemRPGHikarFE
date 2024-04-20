import React, { useState } from "react";
import BasicTabs from "./Tabs";
import "../Reports & Approvals/Reports.css";
import Loader from "../../components/Loader/Loader";

function ReportMain(props) {
  const [glovesTable, setGlovesTable] = useState(true);
  const [finalVisual, setFinalVisual] = useState(true);
  const [electricTestTable, setElectricTestTable] = useState(true);
  const [uidPrinting, setUidPrinting] = useState(true);
  const [qrPrinting, setQrPrinting] = useState(true);
  const [finalVisualClickIcon, setFinalVisualClickIcon] = useState(false);
  const [checkUidData, setCheckUidData] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const handleBack = () => {
    setGlovesTable(true);
    setElectricTestTable(true);
    setFinalVisual(true);
    setCheckUidData(false);
    setUidPrinting(true);
    setQrPrinting(true);
  };

  const handleCheckUidData = (finddata) => {
    setCheckUidData(finddata);
  };

  const handleVisualDetail = () => {
    setGlovesTable(false);
  };

  const handleElecticTestDetail = () => {
    setElectricTestTable(false);
  };

  const handleFinalVisualDetail = () => {
    setFinalVisual(false);
  };

  const handleUidPrintingDetail = () => {
    setUidPrinting(false);
  };

  const handleQrPrintingDetail = () => {
    setQrPrinting(false);
  };

  const handleFinalVisualClickIcon = (value) => {
    if (value == "3") {
      setFinalVisualClickIcon(true);
    } else {
      setFinalVisualClickIcon(false);
    }
  };

  return (
    <div className="dashboard-wrapper page-wraper">
      {isLoading && <Loader />}

      <BasicTabs
        handleBack={handleBack}
        glovesTable={glovesTable}
        handleVisualDetail={handleVisualDetail}
        electricTestTable={electricTestTable}
        handleElecticTestDetail={handleElecticTestDetail}
        handleFinalVisualDetail={handleFinalVisualDetail}
        finalVisual={finalVisual}
        handleFinalVisualClickIcon={handleFinalVisualClickIcon}
        checkUidData={checkUidData}
        handleCheckUidData={handleCheckUidData}
        handleUidPrintingDetail={handleUidPrintingDetail}
        handleQrPrintingDetail={handleQrPrintingDetail}
        uidPrinting={uidPrinting}
        qrPrinting={qrPrinting}
      />
    </div>
  );
}

export default ReportMain;
