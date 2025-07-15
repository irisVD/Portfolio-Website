import styles from "./Office.module.scss";

interface MagnifyingGlassProps {
    setCurrentProjectShown: (value: number | null) => void;
    id: number;
    topPosition: number;
    leftPosition: number;
    setLeftOffset: (value: number | null) => void;
    setTopOffset: (value: number | null) => void;
}

const MagnifyingGlass = (props : MagnifyingGlassProps) => {
  return (
    <button className={`${styles["magnifying-glass"]}`} style={{top: `${props.topPosition}px`, left: `${props.leftPosition}px`}}
        onClick={() => 
        {
            props.setCurrentProjectShown(props.id);
            props.setLeftOffset(props.leftPosition);
            props.setTopOffset(props.topPosition);
        }}
    >
        <div className={styles['magnifying-glass-glasspart']}></div>
        <div className={styles['magnifying-glass-handle']}></div>
    </button>
  )
}

export default MagnifyingGlass