import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import JobList from "../components/Job/JobList";
import { ActionEvent, IJob } from "../types";

const DashboardPage: React.FC = () => {

    const navigate = useNavigate();

    const handleAction = (event: ActionEvent<IJob>) => {

        const { payload: {title, id} , type} = event; 

        console.log(`${type}: ${title}`);
        navigate(`/job/${id}`);
      };

    const jobs: IJob[] = [
        {
          id: "1",
          title: "Software Engineer",
          location: "New York",
          duration: "Full-time",
          startDate: "2023-07-01",
          requirements:
            "Bachelor's degree in Computer Science, 3+ years of experience",
          companyDetails: "XYZ Tech Inc.",
          contactDetails: "jobs@xyztech.com",
          publishEndDate: "2023-07-10",
          duty: "Develop and maintain software applications.",
        },
        {
          id: "2",
          title: "Graphic Designer",
          location: "Los Angeles",
          duration: "Contract",
          startDate: "2023-08-01",
          requirements:
            "Bachelor's degree in Graphic Design, Proficient in Adobe Creative Suite",
          companyDetails: "ABC Design Studio",
          contactDetails: "designjobs@abcstudio.com",
          publishEndDate: "2023-07-15",
          duty: "Create visually appealing designs for print and digital media.",
        },
        // Add more job items here...
      ];

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>      
      <div className="mt-4">
         <JobList jobs={jobs} onAction={handleAction}/>
      </div>
    </div>
  );
};

export default DashboardPage;

