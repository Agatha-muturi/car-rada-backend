const express=require('express');
const multer =require('multer');
const{addUpdate, getUpdates, deleteUpdate}= require('../controllers/updatecontroller');
const path= require('path');

const router=express.Router();
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safe = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, safe);
  },
});

const fileFilter = (_req, file, cb) => {
  if (/image\/(png|jpe?g|gif|webp)/.test(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files are allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Routes
router.post("/", upload.single("photo"), addUpdate); // form-data
router.get("/", getUpdates);
router.delete("/:id", deleteUpdate); // optional

module.exports = router;