const { bucket } = require("../utils/uploadHelper");
const { v4: uuid } = require('uuid');

exports.uploadHotelPhoto = (req, res, next) => {
    if (req.multerError) {
      res.status(400).json(req.multerError);
      return;
    }
  
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded." });
      return;
    }
  
    const blob = bucket.file(
      "hotels/" + uuid() + req.file.originalname.replace(/ /g, "_")
    );
  
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
  
    blobStream
      .on("error", (err) => {
        console.log(err);
        next(err);
      })
      .on("finish", async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        req.hotelImgUrl = publicUrl;
        next();
      })
      .end(req.file.buffer);
  };