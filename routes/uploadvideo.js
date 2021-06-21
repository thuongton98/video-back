const router = require('express').Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const video = multer({dest:'video/'});

router.post('/add',video.single('add'),(req,res)=>{

	const processedFile = req.file || {}
	
	let orgName;
	
		orgName=req.file.mimetype.split('/')[1]
	
	
	
	const fullpathInServ = processedFile.path;
	const newFullPath = `${fullpathInServ}.${orgName}`;
	fs.renameSync(fullpathInServ,newFullPath);
	res.send({
		status: true,
		message: 'file uploaded',
		fileNameInServer:newFullPath
	})
})

router.get('/:name', (req, res) => {
    const fileName = req.params.name;

    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        })
    }
    res.sendFile(path.resolve(`./video/${fileName}`));
})


module.exports = router;