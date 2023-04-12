import { Button, ButtonBase } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

import { getBooks } from "../../services/book.services";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import classes from "./DashboardPage.module.css";
import { BASE_URL, STATIC_URL } from "../../utils/url.utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const utterance = new SpeechSynthesisUtterance();
utterance.rate = 0.8;

const DashboardPage = () => {
    const [books, setBooks] = useState([]);
    const [numPages, setNumPages] = useState(null);
    const [currPage, setCurrPage] = useState(1);
    const [playBook, setPlayBook] = useState(null);
    const [isPlaying, setIsPlaying] = useState(null);

    const getBooksData = useCallback(async () => {
        const { data, error } = await getBooks();

        if (!!error) return;

        setBooks(
            data.data.books.reduce(
                (reducer, book) => ({
                    ...reducer,
                    [book.genre]: [...(reducer[book.genre] || []), book],
                }),
                {}
            )
        );
    }, []);

    const nextPage = useCallback(() => {
        stopNarration();
        setCurrPage((prev) => prev + 1);
    }, []);

    const prevPage = useCallback(() => {
        stopNarration();
        setCurrPage((prev) => (prev > 1 ? prev - 1 : 0));
    }, []);

    const stopNarration = useCallback(() => {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();
    }, []);

    useEffect(() => {
        utterance.addEventListener("start", () => setIsPlaying(true));
        utterance.addEventListener("resume", () => setIsPlaying(true));
        utterance.addEventListener("pause", () => setIsPlaying(false));
        utterance.addEventListener("end", () => setIsPlaying(false));
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (!playBook) return window.speechSynthesis.cancel();

            const elements = document.querySelectorAll(".textLayer");

            const children = [...elements];

            console.log({ children });

            const text = children.map((it) => it.innerText).join("");

            console.log({ text });

            utterance.text = text.length > 0 ? text : "Empty Page";

            window.speechSynthesis.speak(utterance);
        }, 100);
    }, [playBook, currPage]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        getBooksData();
    }, [getBooksData]);

    return (
        <div className={classes.main}>
            {playBook && (
                <Document
                    file="/book.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    className={classes.document}
                >
                    <Page pageNumber={currPage} />
                </Document>
            )}
            {Object.keys(books).map((genre) => (
                <div key={genre} className={classes.genre_section}>
                    <h1 className={classes.genre_title}>{genre}</h1>
                    <div className={classes.books_container}>
                        {books[genre].map((book) => (
                            <div className={classes.book_card}>
                                <span
                                    className={classes.book_thumbnail_container}
                                >
                                    <img
                                        className={classes.book_thumbnail}
                                        src={
                                            book.thumbnail.indexOf("http") === 0
                                                ? book.thumbnail
                                                : `${STATIC_URL}/${book.thumbnail}`
                                        }
                                        alt={book.title}
                                    />
                                </span>
                                <div className={classes.book_actions}>
                                    <div className={classes.book_actions_row}>
                                        <Button
                                            onClick={() =>
                                                window.open(book.url)
                                            }
                                            variant="text"
                                        >
                                            Read
                                        </Button>
                                        <Button
                                            variant="text"
                                            onClick={() => setPlayBook(book)}
                                        >
                                            Listen
                                        </Button>
                                    </div>
                                    <div className={classes.book_actions_row}>
                                        <Button
                                            startvariant="contained"
                                            onClick={() => window.open("/pdf")}
                                        >
                                            Read & Listen
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {playBook && (
                <div className={classes.player_container}>
                    <h4 className={classes.playbook_title}>{playBook.title}</h4>
                    <div className={classes.player_actions}>
                        {isPlaying ? (
                            <Button
                                onClick={() => window.speechSynthesis.pause()}
                            >
                                Pause
                            </Button>
                        ) : (
                            <Button
                                onClick={() => window.speechSynthesis.resume()}
                            >
                                Play
                            </Button>
                        )}
                        <Button onClick={prevPage}>Prev Page</Button>
                        <h3>{currPage}</h3>
                        <Button onClick={nextPage}>Next Page</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
