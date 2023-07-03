import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchJobById } from "../services/job";
import { modalStore } from "../stores/ModalStore";
import { ModalType, IJob } from "../types";

const JobViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading, error } = useFetchJobById(id as string);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isLoading) {
      modalStore.showModal({
        type: ModalType.Loader,
        message: "Loading data",
      });
    } else {
      modalStore.hideModal();
    }
  }, [isLoading]);

  if (!job) {
    return null;
  }

  const {
    title,
    duration,
    location,
    requirements,
    companyDetails,
    contactDetails,
    startDate,
    publishEndDate,
    duty,
  } = job as IJob;

  return (
    <React.Fragment>
      <button
        onClick={handleGoBack}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex items-center ml-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            fillRule="evenodd"
            d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>Back to list</span>
      </button>
      <h2 className="text-3xl font-semibold text-center mb-4">{title}</h2>
      <div className="bg-white rounded-lg shadow-md p-6 flex gap-8 flex-col">
        <p className="text-gray-500">Duty: {duty}</p>
        <p className="text-gray-500 mb-2">Company: XYZ Tech Inc.</p>
        <p className="text-gray-500 mb-2">Location: {location}</p>
        <p className="text-gray-500 mb-2">Duration: {duration}</p>
        <p className="text-gray-500 mb-2">Start Date: {startDate}</p>
        <p className="text-gray-500 mb-4">Requirements: {requirements}</p>
        <p className="text-gray-500 mb-2">Contact: {contactDetails}</p>
        <p className="text-gray-500 mb-2">Publish End Date: {publishEndDate}</p>
      </div>
    </React.Fragment>
  );
};

export default JobViewPage;
