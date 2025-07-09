import React, { useEffect, useState} from 'react';
import styles from "./ProjectCard.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ProjectCardProps {
  currentProjectShown: number,
  setCurrentProjectShown: (value: number | null) => void;
}

const ProjectCard = (props : ProjectCardProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className={styles['this-project-card']} 
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 3s"
      }}
    >
      <button 
        className={styles['button-close-icon']}
        onClick={() => {
          props.setCurrentProjectShown(null);
        }}
        >
          <IoIosCloseCircleOutline  className={styles['close-icon']}/>
      </button>
    </div>
  )
}

export default ProjectCard