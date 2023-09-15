import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

export const upload = (fieldName: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/"); //folder penyimpnan
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    },
  });

  const uploadFile = multer({ storage: storage });

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(fieldName)(req, res, function (err) {
      if (err) {
        return res.status(400).json({ error: err });
      }
      if (!req.file) {
      return next(); // Skip the upload and move to the next middleware
      }
      //res.locals.filename => filename ny bebas mw apa aja
      res.locals.filename = req.file.filename;
      next();
    });
  };
};
