import React from "react";
import { JobCardDetails } from "../types";
import Logo from "../Logo/Logo";

type Props = {
  details: JobCardDetails;
  key: string;
};

const JobCard: React.FC<Props> = ({ details, key }: Props) => {
  const { title, location, duration } = details;

  return (
    <div className="flex flex-col justify-between bg-gray-500 shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid sm:flex-row">
      <Logo
        alt="Logo"
        src="https://www.bolt.works/app/themes/bolt-works/dist/images/bolt-logo.svg"
        cssClass="mt-11mb-4 w-20 h-20 sm:mt-0 sm:h-24 sm:my-0"
      />

      <div className="flex-flex-col-justify-between ml-4">
        {/* job position */}
        <h1 className="text-xl font-bold cursor-pointer">{title}</h1>

        {/* job info */}
        <p className="flex items-center gap-2 text-dark_gray_cyan text-base">
          {location} - {duration}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
