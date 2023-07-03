import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAIJobDescription, useFetchJobById } from "../services/job";
import { modalStore } from "../stores/ModalStore";
import { ModalType, IJob } from "../types";
import Spinner from "../components/Spinner/Spinner";
import LanguageDropDown from "../components/Dropdown/LanguageDropDown";

const JobViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading, error } = useFetchJobById(id as string);
  const [gettingAIContent, setGettingAIContent] = useState(false);
  const [AIContent, setAIContent] = useState<null | string>(null);

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
    navigate(-1);
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
      <h2 className="text-3xl font-semibold text-center my-4">{title}</h2>
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
