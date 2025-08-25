import { useTranslation } from 'react-i18next';

const Footer = () => {
  const {t} = useTranslation(["global"]);

  return (
    <div className='footer'>{t("app.footer.developedBy")}</div>
  )
}

export default Footer