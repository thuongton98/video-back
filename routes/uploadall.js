const router = require('express').Router();

let Allupload = require('../models/uploadvideo.js');

router.route('/').get((req,res)=>{
	Allupload.find()
		.then(upload=>res.json(upload))
		.catch(err=>res.status(400).json('error: ' +err));
})
//add
router.route('/add').post((req,res)=>{
	const title = req.body.title;
	
	const idchannel = req.body.idchannel;
	const video = req.body.video;
	const poster = req.body.poster;

	const newAllupload = new Allupload({
		title,
		
		idchannel,
		video,
		poster
	})
	newAllupload.save()
		.then(()=>res.json('created'))
		.catch(err=>res.status(400).json('error: ' +err));

})
//show id
router.route('/:id').get((req,res)=>{
	Allupload.findById(req.params.id)
		.then(all=>res.json(all))
		.catch(err=>res.status(400).json('error: ' +err));
})
//delete
router.route('/:id').delete((req,res)=>{
	Allupload.findByIdAndDelete(req.params.id)
		.then(()=>res.json('delete'))
		.catch(err=>res.status(400).json('error: '+err))
})


module.exports = router;