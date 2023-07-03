import React from "react";
import { LoadingModal } from "../../types";
import Spinner from "../Spinner/Spinner";


const LoaderModal: React.FC<LoadingModal> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 flex items-center rounded flex-col gap-1">
        <div>{message}</div>
        <Spinner />
      </div>
    </div>
  );
};

export default LoaderModal;