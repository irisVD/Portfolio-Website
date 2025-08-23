import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <Header darkMode={ darkMode} setDarkMode={setDarkMode} pathName={location.pathname}/>
      <Outlet context={{ darkMode, setDarkMode }} />
      <Footer />
    </>
  );
};

export default RootLayout;