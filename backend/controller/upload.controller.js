import path from "path";

export const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // construct file URL
    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      fileId: req.file.filename, // unique file name
      filePath: fileUrl,         // relative URL (frontend can use this)
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};
