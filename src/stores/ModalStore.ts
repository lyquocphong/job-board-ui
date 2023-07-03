import { action, makeObservable, observable } from "mobx";
import { ModalData } from "../types";

class ModalStore {
  modalData: ModalData | null = null;

  constructor() {
    makeObservable(this, {
      modalData: observable,
      showModal: action,
      hideModal: action,
    });
  }

  showModal(data: ModalData) {
    this.modalData = data;
  }

  hideModal() {
    this.modalData = null;
  }
}

export const modalStore = new ModalStore();