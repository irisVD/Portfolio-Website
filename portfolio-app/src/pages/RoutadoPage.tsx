import { useTranslation } from 'react-i18next';
// import ReactPlayer from 'react-player';
import styles from "./RoutadoPage.module.scss";
// import adminDogInfo from "../../public/videos/routado_admin_dogs.mp4";
// import dogwalkerDogs from "../../public/videos/routado_dogwalker_dogs.mp4";
// import dogwalkerWalks from "../../public/videos/routado_dogwalker_walks.mp4";
// import dogwalkerGps from "../../public/videos/routado_gps.mp4";
// import dogwalkerLogin from "../../public/videos/routado_login.mp4";
// import dogwalkerProfile from "../../public/videos/routado_profile_dogshelterinfo.mp4";

const RoutadoPage = () => {
    const {t} = useTranslation(["global", "projects", "interieursim", "routado"]);

  return (
    <div className={styles['routado']}>
        <h1>Routado</h1>
        <p className={styles['description']}>{t(`allProjects.2.description`, {ns:"projects"})}</p>
        <a href="https://github.com/irisVD/routado" target="_blank" rel="noopener noreferrer"
            className={styles['btn-primary']}>{t("app.github.viewOnGithub", {ns:"global"})}</a>
        <p>{t("adminFunctions", {ns:"routado"})}</p>
        <ul>
            <li>{t("adminFunct1", {ns:"routado"})}</li>
            {/* <ReactPlayer className={styles['videoplayer']} src={adminDogInfo} controls width="75%" height="100%" muted /> */}
            <li>{t("adminFunct2", {ns:"routado"})}</li>
            <li>{t("adminFunct3", {ns:"routado"})}</li>
            
        </ul>
        <p>{t("dogWalkerFunctions", {ns:"routado"})}</p>
        <ul>
            <li>{t("dogWalkerFunct1", {ns:"routado"})}</li>
            {/* <ReactPlayer className={styles['videoplayer']} src={dogwalkerGps} controls width="75%" height="100%"/> */}
            <video
                controls
                width="30%"
                src={`${import.meta.env.VITE_REACT_APP_URL}/routado_dogwalker_walks.mp4`}> 
                Your browser does not support the video tag.
            </video>
            <li>{t("dogWalkerFunct2", {ns:"routado"})}</li>
            <div className={styles['flex-container']}>
                {/* <ReactPlayer className={styles['videoplayer']} src={dogwalkerDogs} controls width="48%" height="100%" />
                <ReactPlayer className={styles['videoplayer']} src={dogwalkerProfile} controls width="48%" height="100%" /> */}
                <video
                    controls
                    width="30%"
                    src={`${import.meta.env.VITE_REACT_APP_URL}/routado_dogwalker_dogs.mp4`}> 
                    Your browser does not support the video tag.
                </video>
                <video
                    controls
                    width="30%"
                    src={`${import.meta.env.VITE_REACT_APP_URL}/routado_profile_dogshelterinfo.mp4`}> 
                    Your browser does not support the video tag.
                </video>
            </div>
            
            <li>{t("dogWalkerFunct3", {ns:"routado"})}</li>
            
            <div className={styles['flex-container']}>
                {/* <ReactPlayer className={styles['videoplayer']} src={dogwalkerWalks} controls width="48%" height="100%" />
                <ReactPlayer className={styles['videoplayer']} src={dogwalkerLogin} controls width="48%" height="100%" /> */}

            </div>
            
        </ul>
    </div>
  )
}

export default RoutadoPage