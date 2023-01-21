const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require('../config/db.js');

const storage  = new GridFsStorage({
    url: dbConfig.url + dbConfig.database,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file)=>{
        const match = ["image/png", "image/jpeg"];

        if(match.indexOf(file.mimeType) === -1){
          const filename = `${Date.now()}-mernupload-${file.originalname}`;
          return filename;
        }

        return {
            bucketName: dbConfig.imgBucket,
            filename: `${Date.now()}-mernuplaod-${file.originalname}`
        }
    } 
})

const uplaodFiles = multer({storage: storage}).single('file');
var uploadFilesMiddleware = util.promisify(uplaodFiles);

module.exports = uploadFilesMiddleware;