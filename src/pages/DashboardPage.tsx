import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobList from "../components/Job/JobList";
import { ActionEvent, IJob, ActionType, ModalType } from "../types";
import { useModalStore } from "../contexts/StoreContext";
import { deleteJob, useFetchJobs } from "../services/job";

const DashboardPage: React.FC = () => {
  const modalStore = useModalStore();
  const navigate = useNavigate();

  const { data: jobs, isLoading, error } = useFetchJobs();
  const [message, setMessage] = useState<string | null>(null);

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
      setMessage(`Error while deleting job ${title} successfully`);
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

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
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
