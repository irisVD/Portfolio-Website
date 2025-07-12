import React, { useState, useRef } from 'react';
import styles from "./Office.module.scss";
import ProjectCard from "./ProjectCard";
import MagnifyingGlass from './MagnifyingGlass';

const Office = () => {
    const [currentProjectShown, setCurrentProjectShown] = useState<number | null>(null);
    const roomContainerRef = useRef<HTMLDivElement>(null);

    const showScroll = () => {
      if(roomContainerRef.current != null)
        return roomContainerRef.current.scrollLeft;
    };


  return (
    <>
      <div ref={roomContainerRef} className={styles['room-container']}>
        <div className={`${styles['room']} 
            ${currentProjectShown == 1 && styles['zoomIn1']} 
            ${currentProjectShown == 2 && styles['zoomIn2']}
            ${currentProjectShown == 3 && styles['zoomIn3']}`} 
            style={{marginLeft: currentProjectShown != null ? `${showScroll()}px` : "0px"}}>
            <div className={`${styles['side']} ${styles['back']}`} style={{zIndex: -1000}}></div>
            <div className={`${styles['side']} ${styles['left']}`}></div>
            <div className={`${styles['side']} ${styles['right']}`}></div>

            <div className={styles['plant']}>
                <img src="../../plant_top.png" alt="plant_top"
                    />
                <div className={styles['plant-pot']}></div>
            </div>
            <MagnifyingGlass setCurrentProjectShown={setCurrentProjectShown} id = {1} topPosition={110} leftPosition={230}/>
            <MagnifyingGlass setCurrentProjectShown={setCurrentProjectShown} id = {2} topPosition={-150} leftPosition={530}/>
            <MagnifyingGlass setCurrentProjectShown={setCurrentProjectShown} id = {3} topPosition={-150} leftPosition={920}/>

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
            currentProjectShown != null ? <div className={styles['project-card']} style={{marginLeft: currentProjectShown != null ? `${showScroll()}px` : "0px"}}><ProjectCard currentProjectShown={currentProjectShown} setCurrentProjectShown={setCurrentProjectShown}/></div> : <></>
          }
        </div>
    </>


  )
}

export default Office