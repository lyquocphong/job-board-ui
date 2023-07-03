export interface IJob {
    id: string;
    title: string;
    location: string;
    duration: string;
    startDate: string;
    requirements: string;
    companyDetails: string;
    contactDetails: string;
    publishEndDate: string;
    duty: string;
}

export type JobCardDetails = Pick<IJob, 'id' | 'title' | 'location' | 'duration' | 'startDate' | 'publishEndDate'>

export enum ActionType {
    Edit = "edit",
    View = "view",
    Delete = "delete",
}

export type ActionEventType = ActionType

export type ActionEvent<T> = {
    payload: T,
    type: ActionEventType,
}

export type ActionEventListener<T> = (event: ActionEvent<T>) => void

export enum ModalType {
    Base = "base",
    Confirm = "confirm"
}

export type ModalData = {
    type: ModalType;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmAction?: () => void;
};

export type BaseModalProps = {
    message: string;
    cancelLabel: string;
    onClose: () => void;
}

export type ConfirmModalProps = BaseModalProps & {
    confirmLabel: string;
    onConfirm: () => void;
}