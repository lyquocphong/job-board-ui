import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAIJobDescription,
  updateJob,
  useFetchJobById,
} from "../services/job";
import { modalStore } from "../stores/ModalStore";
import { ModalType, IJob, JobFormValue } from "../types";
import Spinner from "../components/Spinner/Spinner";
import LanguageDropDown from "../components/Dropdown/LanguageDropDown";
import JobForm from "../components/Job/JobForm";
import { useModalStore } from "../contexts/StoreContext";

const JobViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading, error, mutate } = useFetchJobById(id as string);
  const [gettingAIContent, setGettingAIContent] = useState(false);
  const [AIContent, setAIContent] = useState<null | string>(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const languageOptions = [
    "Finnish",
    "English",
    "Swedish",
    "Vietnamese",
    "Spanish",
  ];

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languageOptions[0]
  );

  const handleOnLanguageDropDownChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleGetAIContent = async () => {
    try {
      setGettingAIContent(true);
      setAIContent(null);
      const content = await getAIJobDescription(id as string, selectedLanguage);
      setAIContent(content);
    } catch (error) {
    } finally {
      setGettingAIContent(false);
    }
  };

  const handleConfirmUpdate = async (newValue: JobFormValue) => {    
    const loaderMessage = 'Updating job';
    modalStore.showModal({
      type: ModalType.Loader,
      message: loaderMessage,
    });

    try {
      await updateJob(id as string, newValue);
      mutate('http://localhost:3000/api/jobs');
      setMessage(`Update job successfully`);
    } catch (error: any) {
      setMessage(`Error while updating job`);
    }
    modalStore.hideModal();
    setEditMode(false);
  };

  const handleFormSubmit = (newValue: JobFormValue) => {
    const message = `Are you sure you want to update job ${title}`;

    modalStore.showModal({
      type: ModalType.Confirm,
      message,
      confirmLabel: "Update",
      confirmAction: () => {
        handleConfirmUpdate(newValue);
      },
    });
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
  };

  const handleFormCancel = () => {
    setEditMode(false);
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

  if (editMode) {
    return (
      <div className="flex flex-col items-center p-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-6/12">
          <JobForm
            initialValues={job}
            mode="update"
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <button
        onClick={handleGoBack}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex items-center"
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
      {!editMode && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex items-center disabled:bg-gray-400 disabled:pointer-events-none"
          onClick={handleEditButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
          <span>Edit</span>
        </button>
      )}
      {message && (
            <div
              className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
          )}
      <h2 className="text-3xl font-semibold text-center m-4">{title}</h2>
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 items-start w-6/12">
        <p className="text-gray-500">Duty: {duty}</p>
        <p className="text-gray-500">Company: XYZ Tech Inc.</p>
        <p className="text-gray-500">Location: {location}</p>
        <p className="text-gray-500">Duration: {duration}</p>
        <p className="text-gray-500">Start Date: {startDate}</p>
        <p className="text-gray-500">Requirements: {requirements}</p>
        <p className="text-gray-500">Contact: {contactDetails}</p>
        <p className="text-gray-500">Publish End Date: {publishEndDate}</p>
      </div>

      {!gettingAIContent && (
        <div className="m-4">
          <LanguageDropDown
            selectedLanguage={selectedLanguage}
            options={languageOptions}
            onChange={handleOnLanguageDropDownChange}
          />
        </div>
      )}

      <button
        disabled={gettingAIContent}
        onClick={handleGetAIContent}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex items-center disabled:bg-gray-400 disabled:pointer-events-none"
      >
        {!gettingAIContent ? (
          <React.Fragment>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
                clipRule="evenodd"
              />
              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
            </svg>

            <span className="mr-2">Generate job description by AI</span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Spinner />
            <span className="ml-2">
              Generating job description by AI in {selectedLanguage}
            </span>
          </React.Fragment>
        )}
      </button>

      {AIContent && (
        <React.Fragment>
          <div className="bg-white rounded-lg shadow-md p-6 mt-4 flex flex-col items-center border-4 w-6/12">
            <h2
              className=""
              dangerouslySetInnerHTML={{
                __html: AIContent.replace(/\n/g, "<br>"),
              }}
            ></h2>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default JobViewPage;
