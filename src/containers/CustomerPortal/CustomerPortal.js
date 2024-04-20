import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../ViewReport/index.css";
import CustomerPortalHeader from "../../components/Header/customerPortalHeader";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import Loader from "../../components/Loader/Loader";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import GetAppIcon from "@mui/icons-material/GetApp";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "./CustomerPortal.css";

const CustomerPortal = () => {
  const [fileUrl, setFileurl] = useState("");
  const uidLocation = useParams();
  const [Scale, setScale] = useState(calculateScale(window.screen.width));

  useEffect(() => {
    console.log("Scale", Scale);
  }, [Scale]);
  useEffect(() => {
    handleCubeJs();
  }, []);

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

  const handleCubeJs = async () => {
    if (uidLocation.id) {
      try {
        
        const BoxLabel = await cubejsApi.load({
          dimensions: [
            "GlovesPrintingBoxlabel.boxNo",
            "GlovesPrintingBoxlabel.boxLabelPdf",
          ],
          order: {
            "GlovesPrintingBoxlabel.boxNo": "asc",
          },
          filters: [
            {
              member: "GlovesPrintingBoxlabel.boxNo",
              operator: "equals",
              values: [uidLocation.id],
            },
          ],
        });

        const pdfView = BoxLabel.rawData().length
          ? "https://raychem-backend-storage.s3.amazonaws.com/media/reports/box_label_report/" +
            BoxLabel.rawData()[0]["GlovesPrintingBoxlabel.boxLabelPdf"]
          : null;
        setFileurl(pdfView);
        
      } catch (error) {
        console.log("error", error);
        
      }
    }
  };
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  function downloadFile(url, filename) {
    fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objectURL;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(objectURL);
      });
  }

  const handledownload = () => {
    downloadFile(fileUrl, `${uidLocation.id}_box_report.pdf`);
  };
  return (
    <>
      <div className="send-docs">
        <div>
          <CustomerPortalHeader />
        </div>

        <div className="send-email">
          <a
            className={fileUrl ? "send-report" : "send-email-report"}
            onClick={handledownload}
          >
            Download <GetAppIcon />
          </a>
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
    </>
  );
};
export default CustomerPortal;
