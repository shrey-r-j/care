import express from "express";
import multer from "multer";
import { uploadFile } from "../controller/upload.controller.js";

const router = express.Router();

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ✅ save inside uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post("/upload", upload.single("file"), uploadFile);

export default router;
