import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MenuTopProjectPage = () => {
  //const [t] = useTranslation(["global", "projects", "skills"]);
  const navigate = useNavigate();
      return (
          <div className="menu">
              <div className="back-to-home"><FaArrowLeftLong /><button onClick={() => navigate("/")}>Back to home page</button></div>
          </div>
      )
}

export default MenuTopProjectPage