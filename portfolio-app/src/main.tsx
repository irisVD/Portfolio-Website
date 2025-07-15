import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import i18next from "i18next";
import {I18nextProvider} from "react-i18next";

import global_en from "./translations/en/global_en.json";
import global_nl from "./translations/nl/global_nl.json";

i18next.init({
  interpolation: {escapeValue: false}, // emitigate attacks,
  lng: "en",
  resources: {
    en: {
      global: global_en
    },
    nl: {
      global: global_nl
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>,
)
