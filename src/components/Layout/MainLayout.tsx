import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


type Props = {
  children?: React.ReactNode;
};
const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main className="content">{children}</main>
      <Footer/>
    </React.Fragment>
  );
};

export default MainLayout;
