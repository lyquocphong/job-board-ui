import React, { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl">Page Not Found</p>
      <p className="mt-4">
        {/* Go back to <Link to="/">Dashboard</Link> */}
      </p>
    </div>
  );
};

export default NotFoundPage;

