import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};
const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
