import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobList from "../components/Job/JobList";
import JobForm from "../components/Job/JobForm";
import { ActionEvent, IJob, ActionType, ModalType, JobFormValue } from "../types";
import { useModalStore } from "../contexts/StoreContext";
import { createJob, deleteJob, updateJob, useFetchJobs } from "../services/job";

const DashboardPage: React.FC = () => {
  const modalStore = useModalStore();
  const navigate = useNavigate();

  const { data: jobs, isLoading, error } = useFetchJobs();
  const [message, setMessage] = useState<string | null>(null);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);

  const hideModal = () => {
    modalStore.hideModal();
  };

  useEffect(() => {
    if (isLoading) {
      modalStore.showModal({
        type: ModalType.Loader,
        message: "Loading jobs",
      });
    } else {
      hideModal();
    }
  }, [isLoading]);

  if (error) {
    return <div>Error fetching data</div>;
  }

  const handleAction = (event: ActionEvent<IJob>) => {
    const { type } = event;

    switch (type) {
      case ActionType.View:
        handleView(event);
        break;
      case ActionType.Delete:
        handleDelete(event);
        break;
      default:
        break;
    }
  };

  const handleView = (event: ActionEvent<IJob>) => {
    const {
      payload: { title, id },
      type,
    } = event;

    navigate(`/job/${id}`);
  };

  const handleConfirmDelete = async (job: { title: string; id: string }) => {
    const { title, id } = job;
    const loaderMessage = `Deleting job ${title}`;
    modalStore.showModal({
      type: ModalType.Loader,
      message: loaderMessage,
    });

    try {
      await deleteJob(id);
      setMessage(`Delete job ${title} successfully`);
    } catch (error: any) {
      setMessage(`Error while deleting job ${title}`);
    }
    modalStore.hideModal();
  };

  const handleDelete = async (event: ActionEvent<IJob>) => {
    const {
      payload: { title, id },
      type,
    } = event;

    const message = `Are you sure you want to delete job ${title}`;

    modalStore.showModal({
      type: ModalType.Confirm,
      message,
      confirmLabel: "Delete",
      confirmAction: () => {
        handleConfirmDelete({ title, id });
      },
    });
  };

  const handleToggleCreateForm = () => {
    setCreateFormOpen(!isCreateFormOpen);
  };

  const handleConfirmCreate = async (newValue: JobFormValue) => {    
    const loaderMessage = 'Creating job';
    modalStore.showModal({
      type: ModalType.Loader,
      message: loaderMessage,
    });

    try {
      await createJob(newValue);      
      setMessage(`Create job successfully`);
    } catch (error: any) {
      setMessage(`Error while creating job`);
    }
    modalStore.hideModal();
    handleToggleCreateForm();
  };

  const handleCreateFormSubmit = async (newValue: JobFormValue) => {    
    const message = `Are you sure you want to create job`;

    modalStore.showModal({
      type: ModalType.Confirm,
      message,
      confirmLabel: "Create",
      confirmAction: () => {
        handleConfirmCreate(newValue);
      },
    });
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        onClick={handleToggleCreateForm}
      >
        Create new job
      </button>
      {isCreateFormOpen && (
        <JobForm
          mode={"create"}
          onSubmit={handleCreateFormSubmit}
          onCancel={handleToggleCreateForm}
        />
      )}
      {!jobs || jobs.length === 0 ? (
        <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded relative">
          <p className="text-center">No items to display.</p>
        </div>
      ) : (
        <>
          {message && (
            <div
              className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          <div className="mt-4">
            <JobList jobs={jobs} onAction={handleAction} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
