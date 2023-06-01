var multer = require('multer');
const fs = require('fs')
//multer.diskStorage() creates a storage space for storing files.
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}
var storage = multer.diskStorage({
destination:function(req, file,cb){
if(file.mimetype === 'image/jpeg'||file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
cb(null, './uploads');
}else{
cb({message: 'this file is neither a video or image file'}, false)
}
},
filename: function(req, file, cb){
cb(null, file.originalname);
}
})
var upload = multer({storage:storage});
module.exports = upload;