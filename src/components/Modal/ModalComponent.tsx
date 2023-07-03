import React from "react";
import { observer } from "mobx-react";
import { useModalStore } from "../../contexts/StoreContext";
import { ModalData, ModalType } from "../../types";
import BaseModal from "./BaseModal";
import ConfirmModal from "./ConfirmModal";
import LoaderModal from "./LoaderModal";

const ModalComponent: React.FC = () => {
  const modalStore = useModalStore();
  const { modalData } = modalStore;

  if (!modalData) {
    return null; // If no modal data, render nothing
  }

  const handleClose = () => {
    modalStore.hideModal();
  };

  const handleConfirm = () => {
    if (modalData.confirmAction) {
      modalData.confirmAction();
    } else {
      handleClose();
    }
  };

  const { type, message } = modalData;

  const confirmLabel = modalData.confirmLabel ?? "Ok";
  const cancelLabel = modalData.cancelLabel ?? "Cancel";

  const renderModalContent = () => {
    switch (type) {
      case ModalType.Base:
        return (
          <BaseModal
            message={message}
            cancelLabel={cancelLabel}
            onClose={handleClose}
          />
        );
      case ModalType.Confirm:
        return (
          <ConfirmModal
            message={message}
            cancelLabel={cancelLabel}
            confirmLabel={confirmLabel}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />
        );
      case ModalType.Loader:
        return (
          <LoaderModal
            message={message}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-container bg-white p-4">{renderModalContent()}</div>
    </div>
  );
};

export default observer(ModalComponent);
