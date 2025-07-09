import React from 'react';
import styles from "./Office.module.scss";

interface MagnifyingGlassProps {
    setCurrentProjectShown: (value: number | null) => void;
    id: number;
}

const MagnifyingGlass = (props : MagnifyingGlassProps) => {
  return (
    <button className={`${styles["magnifying-glass"]} ${styles[`magnifying-glass-${props.id}`]}`}
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