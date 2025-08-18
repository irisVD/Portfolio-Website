import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import i18next from "i18next";
import {I18nextProvider} from "react-i18next";

import global_en from "./translations/en/global_en.json";
import global_nl from "./translations/nl/global_nl.json";
import projects_en from "./translations/en/projects_en.json";
import projects_nl from "./translations/nl/projects_nl.json";
import RootLayout from './layouts/RootLayout.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InterieurSimPage from './pages/InterieurSimPage.tsx';

i18next.init({
  interpolation: {escapeValue: false}, // emitigate attacks,
  lng: "en",
  resources: {
    en: {
      global: global_en,
      projects: projects_en
    },
    nl: {
      global: global_nl,
      projects: projects_nl
    }
  }
})

const browserRouter = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/interieursim",
        element: <InterieurSimPage />,
      },
    ],
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <RouterProvider router={browserRouter} />
    </I18nextProvider>
  </StrictMode>,
)
