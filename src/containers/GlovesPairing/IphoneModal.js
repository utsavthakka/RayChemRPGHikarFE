import React, { useRef, useState } from 'react';
import QrReader from "react-qr-reader";
import { images } from '../../config/images';
import "../../containers/GlovesPairing/GlovesScan/GlovesScan.css"

function IphoneModal({ handleIphoneModal }) {
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const qrRef = useRef(null);

  const handleErrorWebCam = (error) => {
    console.log(error);
  }

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  }

   // Handle the scan result and close the modal if there is a result
  if (scanResultWebCam) {
    handleIphoneModal(false, scanResultWebCam)
  }

  return (
    <>
      <div className='iphonemodal'>
        <img src={images.iphoneImage} className="h-100" />
        <div className='camera-div'>
           {/* Render the QR scanner */}
          <QrReader
            key="environment"
            constraints={{ facingMode: 'environment' }}
            style={{ width: '100%' }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
          />
        </div>
      </div>
    </>
  );
};

export default IphoneModal