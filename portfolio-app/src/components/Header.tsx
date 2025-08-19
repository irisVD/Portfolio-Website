import "../App.scss";
import { AiOutlineMoon } from "react-icons/ai";
import { AiOutlineSun } from "react-icons/ai";
import GB from 'country-flag-icons/react/3x2/GB';
import NL from 'country-flag-icons/react/3x2/NL';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Header = (props : HeaderProps) => {
  const [t, i18n] = useTranslation(["global", "projects", "skills"]);

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
              
              <button
                onClick={() => props.setDarkMode(false)}>
                <AiOutlineSun size={24} className='sun-icon'/>
              </button>
            </div>
            <div className='languages'>
              <button style={{filter: i18n.language == "en" ? "saturate(0.5)" : "saturate(1)"}}
                onClick={() => handleChangeLanguage("en")}
              ><GB /></button>
              <button style={{filter: i18n.language == "nl" ? "saturate(0.5)" : "saturate(1)"}}
                onClick={() => handleChangeLanguage("nl")}
              ><NL /></button>
            </div>
          </div>
          
        </div>
        
        <div className="menu">
          <div><a href="#about-me">{t("header.aboutMe")}</a></div>
          <div><a href="#projects">{t("header.projects")}</a></div>
          <div><a href="#skills">{t("header.skills")}</a></div>
          <div><a href="#contact">{t("header.contact")}</a></div>
        </div>
    </>
    
  )
}

export default Header