import React from "react";
import { LoadingModal } from "../../types";


const LoaderModal: React.FC<LoadingModal> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 flex items-center rounded flex-col gap-1">
        <div>{message}</div>
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-gray-900 mr-3"></div>        
      </div>
    </div>
  );
};

export default LoaderModal;