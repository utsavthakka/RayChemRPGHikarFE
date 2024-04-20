import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import "../ViewReport/index.css";
import { getDocReport } from "./services";
import { getDocumentForm } from "../DippingParameters/batchSlice";
import CustomerPortalHeader from "../../components/Header/customerPortalHeader";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const screenWidth = window.screen.width;

const ViewReport = () => {
  const [fileUrl, setFileurl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [Scale, setScale] = useState(calculateScale(window.screen.width));
  const uidLocation = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getReport();
  }, []);

  useEffect(() => {
    dispatch(getDocumentForm(uidLocation.id));
  });

  const getReport = async () => {
    const params = {
      Uid: uidLocation.id,
    };
    try {
      const resp = await getDocReport(params);
      setLoading(false);
      if (resp.status == 200 || resp.status == 201) {
        setFileurl(resp.data.payload.declaration_of_conformity_report);
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  function calculateScale(screenWidth) {
    console.log("screenWidth", screenWidth);
    if (screenWidth < 450 && screenWidth > 350) {
      return 0.6;
    }
    if (screenWidth < 780 && screenWidth > 700) {
      return 1;
    }
    if (screenWidth > 800 && screenWidth < 900) {
      return 1.1;
    }
    if (screenWidth > 1500 && screenWidth < 1950) {
      return 1.8;
    }

    // Add more conditions as required
    return 1; // default scale
  }

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="send-docs">
      <div>
        <CustomerPortalHeader />
      </div>

      <div className="send-email">
        <Link
          to="/send-docs"
          className={fileUrl ? "send-reportdata" : "send-email-report"}
        >
          Email Reports <ForwardToInboxIcon />
        </Link>
      </div>

      <div className="pdf-viewer-email">
        {fileUrl && (
          <div className="pdf-viewer">
            <Worker
              workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js"
              className="boxpdf"
            >
              <div className="pdf-file-viewer">
                <Viewer
                  fileUrl={fileUrl}
                  plugins={[defaultLayoutPluginInstance]}
                  defaultScale={Scale}
                />
              </div>
            </Worker>
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewReport;
