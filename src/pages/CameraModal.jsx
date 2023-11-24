import React from "react";

const CameraModal = ({ children }) => (
  <div className="fixed top-0 left-0 bg-black bg-opacity-90 min-h-screen flex items-center justify-center">
    {children}
  </div>
);

export default CameraModal;
