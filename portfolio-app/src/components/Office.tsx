import React, { useState, useRef } from 'react';
import styles from "./Office.module.scss";
import ProjectCard from "./ProjectCard";
import MagnifyingGlass from './MagnifyingGlass';
import projects from "../../projects.json";

const Office = () => {
    const [currentProjectShown, setCurrentProjectShown] = useState<number | null>(null);
    const [leftOffset, setLeftOffset] = useState<number | null>(null);
    const [topOffset, setTopOffset] = useState<number | null>(null);
    const roomContainerRef = useRef<HTMLDivElement>(null);

    // hardcoded because there will never be a lot of magnifying glasses
    const topPositionMagnGlass1 = 410;
    const leftPositionMagnGlass1 = 240;
    const topPositionMagnGlass2 = 150;
    const leftPositionMagnGlass2 = 580;
    const topPositionMagnGlass3 = 350;
    const leftPositionMagnGlass3 = 980;


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

            <div className={styles['plant']}>
                <img src="../../plant_top.png" alt="plant_top"
                    />
                <div className={styles['plant-pot']}></div>
            </div>
            <MagnifyingGlass setCurrentProjectShown={setCurrentProjectShown} id = {1} topPosition={topPositionMagnGlass1} leftPosition={leftPositionMagnGlass1} setLeftOffset={setLeftOffset} setTopOffset={setTopOffset}/>
            <MagnifyingGlass setCurrentProjectShown={setCurrentProjectShown} id = {2} topPosition={topPositionMagnGlass2} leftPosition={leftPositionMagnGlass2} setLeftOffset={setLeftOffset} setTopOffset={setTopOffset}/>
            <MagnifyingGlass setCurrentProjectShown={setCurrentProjectShown} id = {3} topPosition={topPositionMagnGlass3} leftPosition={leftPositionMagnGlass3} setLeftOffset={setLeftOffset} setTopOffset={setTopOffset}/>

            <img src="../../table.png" alt="table"
                className={styles['table']}
            />
            <img src="../../shelf.png" alt="shelf"
                className={styles['shelf']}
            />
            <img src="../../notice_board.png" alt="notice board"
                className={styles['notice-board']}
            />
          </div>
          {
            currentProjectShown != null && <div className={styles['project-card']} style={{marginLeft: currentProjectShown != null ? `${showScroll()}px` : "0px"}}><ProjectCard project={projects[currentProjectShown - 1]} setCurrentProjectShown={setCurrentProjectShown}/></div>
          }
        </div>
    </>


  )
}

export default Office