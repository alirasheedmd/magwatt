import express from "express"
import multer from "multer"
import path from "path"
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/")
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/ //these are the extentions we want to allow users to upload
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) //this will check extention format of the file from the types we allowed. it will return true or flase
  const mimetype = filetypes.test(file.mimetype) // this will check if the file user uploaded is in the mime type we allowed. it will return true or false

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb("Images only")
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

//Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
