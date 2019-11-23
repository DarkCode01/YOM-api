const multer = require('multer');
const mime = require('mime-types');


const storage = multer.diskStorage({
    destination:  (req, file, cb) =>{
      cb(null, 'storage/images')
    },
    filename:  (req, file, cb)=> {
      cb(null, `${file.fieldname}-${Date.now()}.${mime.extension(file.mimetype)}`)
    }
  })
   
  const upload = multer({ storage:storage,
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  } })

  module.exports= upload;