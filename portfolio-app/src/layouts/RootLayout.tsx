import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <Header darkMode={ darkMode} setDarkMode={setDarkMode}/>
      <Outlet context={{ darkMode, setDarkMode }} />
      <Footer />
    </>
  );
};

export default RootLayout;