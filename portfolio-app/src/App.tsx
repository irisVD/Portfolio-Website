import './App.scss';
import './_shared.scss';
import Header from './components/Header';
import Office from './components/Office';
import { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import DottedLine from './DottedLine';
import skills from '../skills.json';
import React from 'react';
import { IoIosMail } from "react-icons/io";
import projects from "../projects.json";
import ProjectCard from './components/ProjectCard';

function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [isListView, setIsListView] = useState(false);
  const [darkmode, setDarkMode] = useState(false);

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
          <p>FULL STACK DEVELOPER</p>
          {!isMobile ? <p className='iris-name'>Iris Van Damme</p> : <></>}
        </div>
        
        <img src="../../profile_picture.jpeg" alt="profile picture" />
        {isMobile ? <p className='iris-name'>Iris Van Damme</p> : <></>}
      </div>
      <div className='qualities'>
        <p>TEAMWORK</p>
        <p>EAGER TO LEARN</p>
        <p>INDEPENDENT</p>
      </div>
      <div className='about-me'>
        <div style={{display: "flex", alignItems: "center"}}><h3>About me</h3><IoIosArrowForward style={{marginLeft: "0.5em"}}/></div>
        <p>
          I am a full stack developer pursuing an associate degree at HoGent (Ghent college) because I'm
          passionate about coding, algorithms and IT. Especially finding new challenges everyday and overcoming
          them drives me to learn more. Specialised in C# (.NET), Java, JavaScript (React & Node.js) and MySQL/
          Microsoft SQL Server/MongoDB.
        </p>
        <p style={{fontWeight: "600"}}>Currently looking for an internship (based in the East Flanders) for the period September 2025 - January 2026.</p>
      </div>

      <DottedLine />
      <div className='h2-title'><h2>Projects</h2><IoIosArrowDown size={30}/></div>

      <div className='office-instructions'>
        {!isListView && <p>Click on the different elements to explore past code projects</p>}
        <button className='green-button' style={{marginRight: "0px", marginLeft: "auto"}}
          onClick={() => setIsListView(!isListView)}>
            {isListView ? "Office view" : "Normal list view"}
        </button>
      </div>
      
      {!isListView ? <Office /> :
        <div className='project-list'>
          {projects.map((p, index) => <div key={index} className='project-list-item'><ProjectCard project={projects[index]} setCurrentProjectShown={null}/></div>)}
        </div>
      }
    

      <DottedLine />
      <div className='h2-title'><h2>Skills</h2><IoIosArrowDown size={30}/></div>

      <div className="skills">
        {Object.entries(skills).map(([k, v]) => <React.Fragment key={k}><div>{k}</div><div className='skill-value'>{v}</div></React.Fragment>)}
      </div>
      
      <DottedLine />
      <div className='about-me contact' style={{display: "flex", alignItems: "center"}}>
        <div style={{display: "flex", alignItems: "baseline", marginRight: "15%"}}><h3>Contact</h3><IoIosArrowForward style={{marginLeft: "0.5em"}}/></div>
        <button className="green-button" style={{display: "flex", alignItems: "center"}}
          onClick={() => {
            const mailLink = `mailto:irisvandamme@live.com`;
            window.location.href = mailLink;
          }}
        ><p style={{marginRight: "0.75em", color: "black"}}>Mail me</p><IoIosMail /></button>
      </div>

      <div className='footer'>Developed by Iris Van Damme</div>
    </div>
  )
}

export default App
