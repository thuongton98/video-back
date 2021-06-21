const router = require('express').Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({dest:'images/'});

router.post('/add',upload.single('add'),(req,res)=>{
	const processedFile = req.file || {}
	let orgName = processedFile.originalname || '';
	orgName = orgName.trim().replace(/ /g, "-")
	const fullpathInServ = processedFile.path;
	const newFullPath = `${fullpathInServ}-${orgName}`;
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
    res.sendFile(path.resolve(`./images/${fileName}`));
})


module.exports = router;