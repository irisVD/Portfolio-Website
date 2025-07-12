import React, { useEffect, useState} from 'react';
import styles from "./ProjectCard.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import projects from "../../projects.json";

interface ProjectCardProps {
  currentProjectShown: number,
  setCurrentProjectShown: (value: number | null) => void;
}

const ProjectCard = (props : ProjectCardProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  console.log(props.currentProjectShown)

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
          <IoIosCloseCircleOutline  className={styles['close-icon']} size = {30}/>
      </button>
      <div className={styles['project-content']}>
        <h1>{projects[props.currentProjectShown - 1].title}</h1>
        <img src={projects[props.currentProjectShown - 1].image} alt={`image ${projects[props.currentProjectShown - 1].title}`}/>
        <p>{projects[props.currentProjectShown - 1].description}</p>
        <p className={styles['specs']}>
          <span>Backend: </span>
          <span>{projects[props.currentProjectShown - 1].backend}</span>
        </p>
        <p className={styles['specs']}>
          <span>Frontend: </span>
          <span>{projects[props.currentProjectShown - 1].frontend}</span>
        </p>
        <p className={styles['specs']}>
          <span>Database: </span>
          <span>{projects[props.currentProjectShown - 1].database}</span>
        </p>
        <p>{projects[props.currentProjectShown - 1].extra}</p>
      </div>
    </div>
  )
}

export default ProjectCard