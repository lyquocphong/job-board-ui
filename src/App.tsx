import JobList from "./components/Job/JobList";
import MainLayout from "./components/Layout/MainLayout";
import { ActionEvent, IJob } from "./components/types";

function App() {
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

  const handleAction = (event: ActionEvent<IJob>) => {
    console.log(`${event.type}: ${event.payload.title}`)
  };

  return (
    <MainLayout>
      <JobList jobs={jobs} onAction={handleAction}/>
    </MainLayout>
  );
}

export default App;
