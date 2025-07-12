import React from 'react';
import styles from "./Office.module.scss";

interface MagnifyingGlassProps {
    setCurrentProjectShown: (value: number | null) => void;
    id: number;
    topPosition: number;
    leftPosition: number;
}

const MagnifyingGlass = (props : MagnifyingGlassProps) => {
  return (
    <button className={`${styles["magnifying-glass"]}`} style={{top: `${props.topPosition}px`, left: `${props.leftPosition}px`}}
        onClick={() => 
        {
            props.setCurrentProjectShown(props.id);
        }}
    >
        <div className={styles['magnifying-glass-glasspart']}></div>
        <div className={styles['magnifying-glass-handle']}></div>
    </button>
  )
}

export default MagnifyingGlass