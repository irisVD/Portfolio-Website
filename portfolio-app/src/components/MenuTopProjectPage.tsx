import { useTranslation } from "react-i18next";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MenuTopProjectPage = () => {
  const {t} = useTranslation(["global"]);
  
  const navigate = useNavigate();
      return (
          <div className="menu">
                <div className="back-to-home"><button onClick={() => navigate("/")}><FaArrowLeftLong />{t("header.backToHome")}</button></div>
          </div>
      )
}

export default MenuTopProjectPage