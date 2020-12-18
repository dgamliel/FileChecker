var express = require('express');
var fs      = require('fs');
const files = require('./files.json');
var router  = express.Router();

const str2hex = (byteArr) => {
    return Array.from(byteArr, (byte) => {
        return ('0' + (byte & 0xFF).toString(16).slice(-2));
    }).join('');
}

// console.log(JSON.stringify(files, null, 2));


router.post('/', (req, res, next) => {

    let embeddedFiles = [];

    if (req.files){

        for (const fileType of files){
            let foundInd = req.files.upload.data.indexOf(fileType.grep, 0, "hex");
            let hexStr = '0x' + foundInd.toString(16);

            if ( foundInd > 0){
                let hiddenFile = {
                    file: fileType.file,
                    index: hexStr,
                    severity: fileType.severity,
                    issues: fileType.issues 
                }

                embeddedFiles.push(hiddenFile);
            }

        }

        console.log(req.files.upload.data);


        res.status(200);
        res.send(embeddedFiles);
    }

    else{
        res.status(401);
        res.send('Error: Unable to access file');
    }
});

module.exports = router;