import React, { useState } from 'react';
import styles from "./Office.module.scss";

const Office = () => {
    const [zoomedInPlantApp, setZoomedInPlantApp] = useState(false);
  return (
    <div className={styles['room-container']}>
        <div className={`${styles['room']} ${zoomedInPlantApp ? styles['zoomed'] : ''} `}>
            <div className={`${styles['side']} ${styles['back']}`} style={{zIndex: -1000}}></div>
            <div className={`${styles['side']} ${styles['left']}`}></div>
            <div className={styles['right']}></div>

            <div className={styles['plant']}>
                <img src="../../plant_top.png" alt="plant_top"
                    />
                <div className={styles['plant-pot']} >hello</div>
            </div>
            <button className={styles['magnifying-glass']}
                onClick={() => setZoomedInPlantApp(true)}
            >
                <div className={styles['magnifying-glass-glasspart']}></div>
                <div className={styles['magnifying-glass-handle']}></div>
            </button>
            <img src="../../table.png" alt="table"
                className={styles['table']}
                />
        </div>
    </div>

  )
}

export default Office