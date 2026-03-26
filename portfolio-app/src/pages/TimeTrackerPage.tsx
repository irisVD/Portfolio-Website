import React, { useState } from 'react';
import '../App.scss';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useTranslation } from 'react-i18next';

// Required worker setup
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const TimeTrackerPage = () => {
  const [numPages, setNumPages] = useState(0);
  const {t} = useTranslation(["global", "projects", "interieursim"]);

  return (
    <div className='xplanner-time-tracker'>
        <h1>XPlanner Time Tracker</h1>
        <p>{t("xplannerTimeTracker.graduateThesis", {ns:"global"})}</p>
        <Document
        file="../../VanDammeIrisBP.pdf"  // Place PDF in the /public folder
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
        {Array.from({ length: numPages }, (_, i) => (
            <Page key={i + 1} pageNumber={i + 1} />
        ))}
        </Document>
    </div>
    
  );
}

export default TimeTrackerPage