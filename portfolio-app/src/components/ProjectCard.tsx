import React, { useEffect, useState} from 'react';
import styles from "./ProjectCard.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ProjectCardProps {
  setCurrentProjectShown: (value: number | null) => void;
  project: Project;
}
interface Project {
  title: string,
  image: string,
  description: string,
  backend: string,
  frontend: string,
  database: string,
  extra: string
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
          <IoIosCloseCircleOutline  className={styles['close-icon']} size = {30}/>
      </button>
      <div className={styles['project-content']}>
        <h1>{props.project.title}</h1>
        <img src={props.project.image} alt={`image ${props.project.title}`}/>
        <p>{props.project.description}</p>
        <p className={styles['specs']}>
          <span>Backend: </span>
          <span>{props.project.backend}</span>
        </p>
        <p className={styles['specs']}>
          <span>Frontend: </span>
          <span>{props.project.frontend}</span>
        </p>
        <p className={styles['specs']}>
          <span>Database: </span>
          <span>{props.project.database}</span>
        </p>
        <p>{props.project.extra}</p>
      </div>
    </div>
  )
}

export default ProjectCard