import React from "react";
import {
  ActionEvent,
  ActionEventListener,
  ActionEventType,
  IJob,
  JobCardDetails,
} from "../../types";
import JobCard from "./JobCard";

type Props = {
  jobs: IJob[];
  onAction: ActionEventListener<IJob>;
};

const JobList: React.FC<Props> = ({ jobs, onAction }) => {
    
  const handleAction = (event: ActionEvent<JobCardDetails>) => {
    const job = jobs.find((job) => job.id == event.payload.id);

    onAction({
      payload: job as IJob,
      type: event.type,
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col">
        {jobs.map((job) => {
          const details = {
            id: job.id,
            title: job.title,
            location: job.location,
            duration: job.duration,
            startDate: job.startDate,
            publishEndDate: job.publishEndDate,
          };
          return <JobCard job={details} key={job.id} onAction={handleAction}/>;
        })}
      </div>
    </div>
  );
};

export default JobList;
