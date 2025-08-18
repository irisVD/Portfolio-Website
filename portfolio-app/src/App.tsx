import './App.scss';
import './_shared.scss';
import Header from './components/Header';
import Office from './components/Office';
import { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import DottedLine from './components/DottedLine';
import skills from './translations/en/skills_en.json';
import React from 'react';
import { IoIosMail } from "react-icons/io";
import projects from "./translations/en/projects_en.json";
import ProjectCard from './components/ProjectCard';
import { useTranslation } from 'react-i18next';

function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [isListView, setIsListView] = useState(false);
  const [darkmode, setDarkMode] = useState(false);

  const [t] = useTranslation("global");

  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })
  return (
    <div className="app" data-theme={darkmode ? "dark" : "light"}>
      <Header setDarkMode={setDarkMode}/>
      
      <div className='me-card'>
        <div>
          <p>{t("app.fullStackDeveloper")}</p>
          {!isMobile ? <p className='iris-name'>Iris Van Damme</p> : <></>}
        </div>
        
        <img src="../../profile_picture.jpeg" alt="profile picture" />
        {isMobile ? <p className='iris-name'>Iris Van Damme</p> : <></>}
      </div>
      <div className='qualities'>
        <p>{t("app.qualities.teamwork")}</p>
        <p>{t("app.qualities.eagerToLearn")}</p>
        <p>{t("app.qualities.independent")}</p>
      </div>

      {/* ABOUT ME */}
      <div className='about-me' id="about-me">
        <div style={{display: "flex", alignItems: "center"}}><h3>{t("header.aboutMe")}</h3><IoIosArrowForward style={{marginLeft: "0.5em"}}/></div>
        <p>{t("app.aboutMe")}</p>
        <p style={{fontWeight: "600"}}>{t("app.internship")}</p>
      </div>

      <DottedLine />
      {/* PROJECTS */}
      <div className='h2-title fade-in'><h2 id="projects">{t("header.projects")}</h2><IoIosArrowDown size={30}/></div>

      <div className='office-instructions'>
        {!isListView && <p>{t("app.officeInstructions.instruction")}</p>}
        <button className='green-button' style={{marginRight: "0px", marginLeft: "auto"}}
          onClick={() => setIsListView(!isListView)}>
            {isListView ? `${t("app.officeInstructions.buttonOfficeView")}` : `${t("app.officeInstructions.normalListView")}`}
        </button>
      </div>
      
      {!isListView ? <div className='fade-in'><Office /></div> :
        <div className='project-list'>
          {[...Array(projects.allProjects.length)].map((_, i) => (
            <div key={i} className='project-list-item fade-in'>
              <ProjectCard project={i} setCurrentProjectShown={null} />
            </div>
          ))}
        </div>
      }
    

      <DottedLine />
      {/* SKILLS */}
      <div className='h2-title'><h2 id="skills">{t("header.skills")}</h2><IoIosArrowDown size={30}/></div>

      <div className="skills">
        {Object.entries(skills).map(([k, v]) => <React.Fragment key={k}><div className='fade-in'>{k}</div><div className='skill-value fade-in'>{v}</div></React.Fragment>)}
      </div>
      
      <DottedLine />
      <div className='about-me contact fade-in' style={{display: "flex", alignItems: "center"}} id="contact">
        <div style={{display: "flex", alignItems: "baseline", marginRight: "15%"}}><h3>{t("header.contact")}</h3><IoIosArrowForward style={{marginLeft: "0.5em"}}/></div>
        <button className="green-button" style={{display: "flex", alignItems: "center"}}
          onClick={() => {
            const mailLink = `mailto:irisvandamme@live.com`;
            window.location.href = mailLink;
          }}
        ><p style={{marginRight: "0.75em", color: "black"}}>Mail me</p><IoIosMail /></button>
      </div>
      
      {/* FOOTER */}
      <div className='footer'>Developed by Iris Van Damme</div>
    </div>
  )
}

export default App
