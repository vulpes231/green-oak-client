import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const CustomWebcam = ({ cancelCapture }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const [webcamKey, setWebcamKey] = useState(0);

  let videoConstraints = {
    facingMode: FACING_MODE_USER,
    width: 475,
    height: 500,
  };

  const swapCamera = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );

    setWebcamKey((prevKey) => prevKey + 1);
  }, []);

  // create a capture function
  const capture = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    },
    [webcamRef]
  );

  const retake = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImgSrc(null);
  };

  const handleCancelCapture = () => {
    setImgSrc(null);
  };

  return (
    <div className="container flex flex-col gap-4">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{ ...videoConstraints, facingMode }}
          screenshotQuality={1}
          key={webcamKey}
        />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <div className="flex gap-2 items-center justify-center">
            <button
              className="bg-[#347338] text-white py-2 px-4"
              onClick={retake}
            >
              Retake photo
            </button>
            <button
              className="bg-[#347338] text-white py-2 px-4"
              onClick={(e) => {
                cancelCapture(e);
                handleCancelCapture();
              }}
            >
              Use Image
            </button>
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-center">
            <button
              className="bg-[#347338] text-white py-2 px-4"
              onClick={capture}
            >
              Capture photo
            </button>
            <button
              className="bg-[#347338] text-white py-2 px-4"
              onClick={cancelCapture}
            >
              Cancel capture
            </button>
            <button
              className="bg-[#347338] text-white py-2 px-4"
              onClick={swapCamera}
            >
              Switch camera
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;
