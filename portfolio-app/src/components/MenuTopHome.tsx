import { useTranslation } from 'react-i18next';

const MenuTopHome = () => {
    const {t} = useTranslation(["global"]);

    return (
        <div className='menu-items'>
            <div><a href="#about-me">{t("header.aboutMe")}</a></div>
            <div><a href="#experience">{t("header.experience")}</a></div>
            <div><a href="#projects">{t("header.projects")}</a></div>
            <div><a href="#skills">{t("header.skills")}</a></div>
            <div><a href="#contact">{t("header.contact")}</a></div>
        </div>
    )
}

export default MenuTopHome