import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JobViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          JobView, viewing job id is {id}
        </h1>
      </div>
      <button
        onClick={handleGoBack}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Go Back
      </button>
    </React.Fragment>
  );
};

export default JobViewPage;
