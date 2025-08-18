import React, { useState, useRef } from 'react';
import styles from "./Office.module.scss";
import ProjectCard from "./ProjectCard";
import MagnifyingGlass from './MagnifyingGlass';
import { useOutletContext } from 'react-router-dom';

const Office = () => {
    const [currentProjectShown, setCurrentProjectShown] = useState<number | null>(null);
    const [leftOffset, setLeftOffset] = useState<number | null>(null);
    const [topOffset, setTopOffset] = useState<number | null>(null);
    const roomContainerRef = useRef<HTMLDivElement>(null);
    const [lightOn, setLightOn] = useState<boolean>(false);
    const { darkMode } = useOutletContext<{ darkMode: boolean}>();

    // hardcoded because there will never be a lot of magnifying glasses
    const topPositionMagnGlass1 = 350;
    const leftPositionMagnGlass1 = 980;
    const topPositionMagnGlass2 = 160;
    const leftPositionMagnGlass2 = 520;
    // const topPositionMagnGlass3 = 350;
    // const leftPositionMagnGlass3 = 980;


    const showScroll = () => {
      if(roomContainerRef.current != null)
        return roomContainerRef.current.scrollLeft;
    };


  return (
    <>
      <div ref={roomContainerRef} className={styles['room-container']}>
        <div className={`${styles['room']} ${currentProjectShown != null && styles['zoomIn']}`} 
            style={{'--scroll': `${showScroll()}px`, '--top-offset': `${topOffset}px`, '--left-offset': `${leftOffset}px`} as React.CSSProperties}>
            <div className={`${styles['side']} ${styles['back']}`} style={{zIndex: -1000}}></div>
            <div className={`${styles['side']} ${styles['left']}`}></div>
            <div className={`${styles['side']} ${styles['right']}`}></div>

            {/* <div className={styles['plant']}>
                <img src="../../plant_top.png" className={styles["plant-top"]} alt="plant_top"
                    />
                <div className={styles['plant-pot']}></div>
            </div> */}
            <MagnifyingGlass setCurrentProjectShown={setCurrentProjectShown} id = {1} topPosition={topPositionMagnGlass1} leftPosition={leftPositionMagnGlass1} setLeftOffset={setLeftOffset} setTopOffset={setTopOffset}/>
            <MagnifyingGlass setCurrentProjectShown={setCurrentProjectShown} id = {2} topPosition={topPositionMagnGlass2} leftPosition={leftPositionMagnGlass2} setLeftOffset={setLeftOffset} setTopOffset={setTopOffset}/>
            {/* <MagnifyingGlass setCurrentProjectShown={setCurrentProjectShown} id = {3} topPosition={topPositionMagnGlass3} leftPosition={leftPositionMagnGlass3} setLeftOffset={setLeftOffset} setTopOffset={setTopOffset}/> */}

            <img src="../../table-with-top.png" alt="table"
                className={styles['table']}
            />
            <img src="../../shelf.png" alt="shelf"
                className={styles['shelf']}
            />
            <img src="../../notice_board.png" alt="notice board"
                className={styles['notice-board']}
            />
            <img src="../../computer-640.png" alt="computer"
                className={styles['computer']}
            />
            <img src="../../public/computer-mouse.png" alt="computer mouse"
                className={styles['computer-mouse']}
            />
            <img src="../../public/monstera.png" alt="monstera plant"
                className={styles['plant-monstera']}
            />
            <img src="../../public/carpet.png" alt="carpet"
                className={styles['carpet']}
            />
            <img src="../../public/calendar-640.png" alt="calendar"
                className={styles['calendar']}
            />
            <img src="../../public/room-design.jpg" alt="room poster"
                className={styles['room-design']}
            />
            <img src="../../public/bike.png" alt="bike"
                className={styles['bike']}
            />
            <img src="../../public/window.png" alt="window"
                className={styles['window']} style={{backgroundColor: darkMode ? "rgb(45, 53, 73)" : "rgb(168, 219, 233)"}}
            />
            <img src="../../public/lamp.png" alt="table-lamp"
                className={styles['lamp']}
            />
            <div className={styles['light-bulb']} style={{backgroundColor: lightOn ? "yellow" : "rgb(227, 227, 165)"}}></div>
            <button className={styles['light-button']}
              onClick={
                () => {
                  setLightOn(!lightOn);
                }
              }
            ></button>
            {
              Array.from({ length: 2 }).map((_, i) => (
                <img
                  key={i}
                  src={`../../public/thumbtack.png`}
                  alt={`thumbtack-${i+1}`}
                  className={styles[`thumbtack-${i+1}`]}
                />
              ))
            }
            {
              Array.from({ length: 8 }).map((_, i) => (
                <img
                  key={i}
                  src={`../../public/can${i+1}.png`}
                  alt={`can-${i+1}`}
                  className={styles[`can-${i+1}`]}
                />
              ))
            }
          </div>
          {
            currentProjectShown != null && <div className={styles['project-card']} style={{marginLeft: currentProjectShown != null ? `${showScroll()}px` : "0px"}}><ProjectCard project={currentProjectShown - 1} setCurrentProjectShown={setCurrentProjectShown}/></div>
          }
        </div>
    </>


  )
}

export default Office