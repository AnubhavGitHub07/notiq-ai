// add notes routes 

import express from "express";
import { createNote, getNotes, updateNote, deleteNote, uploadAttachment, deleteAttachment } from "../controllers/noteController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const noteRoutes = express.Router();

noteRoutes.use(protect); // all routes protected

noteRoutes.route("/")
    .post(createNote)
    .get(getNotes);

noteRoutes.route("/:id")
    .put(updateNote)
    .delete(deleteNote);

noteRoutes.post("/:id/upload", upload.single("file"), uploadAttachment);
noteRoutes.delete("/:id/attachments", deleteAttachment);


export default noteRoutes;