import React, { createContext, useContext } from "react";
import { modalStore } from "../stores/ModalStore";

const ModalContext = createContext(modalStore);

export const useModalStore = () => useContext(ModalContext);