import './App.scss';
import Header from './components/Header';
import Office from './components/Office';
import { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import DottedLine from './DottedLine';

function App() {
  const [isMobile, setIsMobile] = useState(false)

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
    <>
      <Header />
      <div className='me-card'>
        <div>
          <p style={{fontSize: "40px"}}>FULL STACK DEVELOPER</p>
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
        <p>Click on the different elements to explore past code projects</p>
        <button>Normal grid view</button>
      </div>
      
      <Office />

      <DottedLine />
      <div className='h2-title'><h2>Skills</h2><IoIosArrowDown size={30}/></div>
    </>
  )
}

export default App
