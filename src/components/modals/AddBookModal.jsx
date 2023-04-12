import React, { useState } from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import classes from "./AddBookModal.module.css";
import { addBook, uploadFile } from "../../services/book.services";

const GENRES = [
    "Fiction",
    "Non-fiction",
    "Romance",
    "Mystery",
    "Thriller",
    "Horror",
    "Science Fiction",
    "Fantasy",
    "Historical Fiction",
];

const AddBookModal = ({ handleClose }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [pdf, setPdf] = useState("");
    const [genre, setGenre] = useState("Fiction");

    const handleCreate = async () => {
        const thumbnailUrl = await handleUpload(thumbnail);
        const pdfUrl = await handleUpload(pdf);

        const { error } = await addBook({
            title,
            author,
            genre,
            thumbnail: thumbnailUrl,
            url: pdfUrl,
        });

        if (!!error) return;

        handleClose();
    };

    const handleUpload = async (file) => {
        const formdata = new FormData();

        formdata.append("file", file);

        const { data } = await uploadFile(formdata);

        return data.data.url;
    };

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle style={{ width: 500 }}>Add Book</DialogTitle>
            <DialogContent>
                <div className={classes.file_input}>
                    <label for="thumbnail">Thumbnail</label>
                    <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        accept="image/png, image/jpeg"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                </div>
                <div className={classes.file_input}>
                    <label for="thumbnail">Book PDF</label>
                    <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        accept=".pdf"
                        onChange={(e) => setPdf(e.target.files[0])}
                    />
                </div>

                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="author"
                    label="Author"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={author}
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                />
                <>
                    <InputLabel>Genre</InputLabel>
                    <Select
                        fullWidth
                        id="genre"
                        dense
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        {GENRES.map((genre) => (
                            <MenuItem value={genre}>{genre}</MenuItem>
                        ))}
                    </Select>
                </>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookModal;
