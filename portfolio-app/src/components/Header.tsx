import "../App.scss";
import { AiOutlineMoon } from "react-icons/ai";
import { AiOutlineSun } from "react-icons/ai";
import GB from 'country-flag-icons/react/3x2/GB';
import NL from 'country-flag-icons/react/3x2/NL';
import { useTranslation } from 'react-i18next';
import MenuTopHome from "./MenuTopHome";
import MenuTopProjectPage from "./MenuTopProjectPage";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  pathName: string;
}

const Header = (props : HeaderProps) => {
  const {i18n} = useTranslation(["global", "projects", "skills"]);

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
        <div className='title-part'>
          <h1>Iris Van Damme</h1>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className='darkmode'>
              <button
                onClick={() => props.setDarkMode(true)}>
                <AiOutlineMoon size={24} className='moon-icon'/>
              </button>
              <div></div>
              
              <button
                onClick={() => props.setDarkMode(false)}>
                <AiOutlineSun size={24} className='sun-icon'/>
              </button>
            </div>
            <div className='languages'>
              <button style={{filter: i18n.language == "en" ? "saturate(0.5)" : "saturate(1)"}}
                onClick={() => handleChangeLanguage("en")}
              ><GB /></button>
              <div></div>
              <button style={{filter: i18n.language == "nl" ? "saturate(0.5)" : "saturate(1)"}}
                onClick={() => handleChangeLanguage("nl")}
              ><NL /></button>
            </div>
          </div>
        </div>
        {props.pathName == '/' ? <MenuTopHome /> : <MenuTopProjectPage /> }
    </>
    
  )
}

export default Header