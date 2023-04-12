import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

import classes from "./PdfReader.module.css";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const utterance = new SpeechSynthesisUtterance();
utterance.rate = 0.8;

const PdfReader = () => {
    const [pageNum, setPageNum] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [speed, setSpeed] = useState(1);
    const [pendingElements, setPendingElements] = useState([]);
    const [currentElement, setCurrentElement] = useState(null);

    useEffect(() => {
        if (!currentElement) return;

        utterance.addEventListener("end", () => {
            setPendingElements((prev) => {
                const newE = prev.filter(
                    (data) => data.innerText !== currentElement.innerText
                );

                console.log({ newE, prev });

                return newE;
            });
        });
    }, [currentElement]);

    useEffect(() => {
        if (!pendingElements || pendingElements.length === 0) return;

        setCurrentElement(pendingElements[0]);
    }, [pendingElements]);

    useEffect(() => {
        if (!currentElement) return;

        const text = currentElement.textContent;

        currentElement.classList.add(classes.highlight);

        playText(text, speed);

        return () => currentElement.classList.remove(classes.highlight);
    }, [currentElement, speed]);

    const playText = (text, rate) => {
        if (window.speechSynthesis.speaking) return;

        utterance.text = text;
        utterance.rate = rate || 1;

        window.speechSynthesis.speak(utterance);
    };

    const pauseText = () => {
        window.speechSynthesis.pause();
    };

    const stopText = () => {
        speechSynthesis.resume();
        speechSynthesis.cancel();
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () => {
        setPageNum(pageNum - 1);
    };

    const goToNextPage = () => {
        setPageNum(pageNum + 1);
    };

    const readPage = () => {
        if (!window?.speechSynthesis) return;

        if (!numPages) return;

        if (window.speechSynthesis.speaking) return;

        const pdf = document?.querySelectorAll(
            `.react-pdf__Page__textContent span`
        );

        const children = [...pdf];

        setPendingElements(children);
    };

    return (
        <div className={classes.main}>
            <Document
                file="/book.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                className={classes.document}
            >
                <Page pageNumber={pageNum} />
            </Document>
            <div>
                <button disabled={pageNum <= 1} onClick={goToPrevPage}>
                    Previous
                </button>
                <button disabled={pageNum >= numPages} onClick={goToNextPage}>
                    Next
                </button>
                <button onClick={readPage}>Read Page</button>
                <button onClick={stopText}>Stop</button>
            </div>
        </div>
    );
};

export default PdfReader;
