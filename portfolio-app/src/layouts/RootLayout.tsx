import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Scroll the container to top on route change
  useEffect(() => {
    document.body.style.scrollBehavior = 'auto';
    document.body.scrollTo(0, 0);
    document.body.style.scrollBehavior = 'smooth'; // restore smooth for in-page scrolling
  }, [location.pathname]);

  return (
    <div ref={containerRef}>
      <Header darkMode={ darkMode} setDarkMode={setDarkMode} pathName={location.pathname}/>
      <Outlet context={{ darkMode, setDarkMode }} />
      <Footer />
    </div>
  );
};

export default RootLayout;