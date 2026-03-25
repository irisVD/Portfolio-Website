import { useEffect, useState} from 'react';
import styles from "./ProjectCard.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  // is null when shown ProjectCard is shown in list view
  setCurrentProjectShown: ((value: number | null) => void) | null;
  project: number;
}

const ProjectCard = (props : ProjectCardProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);

  }, []);

  const {t} = useTranslation(["global", "projects", "skills"]);

  return (
    <div className={`${styles['this-project-card']} ${props.setCurrentProjectShown ? styles['this-office-project-card'] : styles['this-list-project-card']}`} 
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 3s"
      }}
    >
      <button 
        className={styles['button-close-icon']}
        style={{display: props.setCurrentProjectShown ? "block" : "none"}}
        onClick={() => {
          if(props.setCurrentProjectShown)
            props.setCurrentProjectShown(null);
        }}
        >
          <IoIosCloseCircleOutline  className={styles['close-icon']} size = {30}/>
      </button>
      <div className={styles['project-content']}>
        <h1>{t(`allProjects.${props.project}.title`, {ns:"projects"})}</h1>
        <img src={t(`allProjects.${props.project}.image`, {ns:"projects"})} alt={`image ${t("title", {ns:"projects"})}`}/>

        <p>{t(`allProjects.${props.project}.description`, {ns:"projects"})}</p>
        <p className={styles['specs']}>
          <span>Backend: </span>
          <span>{t(`allProjects.${props.project}.backend`, {ns:"projects"})}</span>
        </p>
        <p className={styles['specs']}>
          <span>Frontend: </span>
          <span>{t(`allProjects.${props.project}.frontend`, {ns:"projects"})}</span>
        </p>
        <p className={styles['specs']}>
          <span>Database: </span>
          <span>{t(`allProjects.${props.project}.database`, {ns:"projects"})}</span>
        </p>
        <p>{t(`allProjects.${props.project}.extra`, {ns:"projects"})}</p>
        {
          t(`allProjects.${props.project}.link`, {ns:"projects"}).startsWith("http") 
          ?
          <a href={t(`allProjects.${props.project}.link`, {ns:"projects"})} target="_blank" rel="noopener noreferrer">{t(`allProjects.${props.project}.linkText`, {ns:"projects"})}</a>
          :
          <Link to={t(`allProjects.${props.project}.link`, {ns:"projects"})}>{t(`allProjects.${props.project}.linkText`, {ns:"projects"})}</Link>
        }
        
      </div>
    </div>
  )
}

export default ProjectCard