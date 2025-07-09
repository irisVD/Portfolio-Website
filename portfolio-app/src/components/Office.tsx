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
        <div className={`${styles['room']} ${currentProjectShown == 1 ? styles['zoomIn1'] : ""}`} style={{marginLeft: currentProjectShown != null ? `${showScroll()}px` : "0px"}}>
            <div className={`${styles['side']} ${styles['back']}`} style={{zIndex: -1000}}></div>
            <div className={`${styles['side']} ${styles['left']}`}></div>
            <div className={`${styles['side']} ${styles['right']}`}></div>

            <div className={styles['plant']}>
                <img src="../../plant_top.png" alt="plant_top"
                    />
                <div className={styles['plant-pot']} >hello</div>
            </div>
            <MagnifyingGlass setCurrentProjectShown={setCurrentProjectShown} id = {1}/>

            <img src="../../table.png" alt="table"
                className={styles['table']}
                />
          </div>
          {
            currentProjectShown != null ? <div className={styles['project-card']} style={{marginLeft: currentProjectShown != null ? `${showScroll()}px` : "0px"}}><ProjectCard currentProjectShown={currentProjectShown} setCurrentProjectShown={setCurrentProjectShown}/></div> : <></>
          }
        </div>
        {showScroll()}
    </>


  )
}

export default Office