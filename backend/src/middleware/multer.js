// multer function to store the image into public folder

const multer = require("multer")
const path = require("path");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public"));
    },
    filename:(req,file,cb)=>{
    cb(null, Date.now() + "-" + file.originalname)
}
})
const upload = multer({storage})


module.exports = upload