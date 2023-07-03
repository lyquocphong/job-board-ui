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