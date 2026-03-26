import { useEffect, useRef, useState } from 'react';
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
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef(null);
  const {t} = useTranslation(["global", "projects", "interieursim"]);

  // Watch container width and update on resize
  useEffect(() => {
    // ResizeObserver = built-in browser API that watches an element and fires a callback whenever it changes size
    const observer = new ResizeObserver((entries) => {
      // callback fires, it receives an entries array 
      // we only have one element -> entries[0]
      if (entries[0]) {
        const width = Math.min(
          entries[0].contentRect.width,
          window.innerWidth  // never exceeds the visible screen width
        );
        setContainerWidth(width);
      }
    });

    if (containerRef.current) {
      // start watching containerRef element
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className='xplanner-time-tracker'
      ref={containerRef}>
        <h1>XPlanner Time Tracker</h1>
        <p>{t("xplannerTimeTracker.graduateThesis", {ns:"global"})}</p>
        <div className='graduate-thesis'>
          <Document
            file="../../VanDammeIrisBP.pdf"  // Place PDF in the /public folder
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(error) => console.error("PDF load error:", error)}
            >
            {Array.from({ length: numPages }, (_, i) => (
                <Page key={i + 1} pageNumber={i + 1} 
                width={Math.min(containerWidth ?? 0, 900)}/>
            ))}
          </Document>
        </div>
        
    </div>
    
  );
}

export default TimeTrackerPage