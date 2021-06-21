const router = require('express').Router();
// lay du lieu
let Channel = require('../models/channel.js');
//truen ra 
router.route('/').get((req, res)=>{
    Channel.find()
        .then(channel => res.json(channel))
        .catch(err => res.status(400).json('Error: ' +err));
});
//add
router.route('/add').post((req,res)=>{
    const name = req.body.name;
    const key = req.body.key;
    const idchannel = req.body.idchannel

    const newChannel = new Channel({
        name,
        key,
        idchannel
    })
    newChannel.save()
        .then(()=>res.json('create channel'))
        .catch(err=>res.status(400).json('error: ' +err));
})
//show id
router.route('/:id').get((req,res)=>{
    Channel.findById(req.params.id)
        .then(channel=>res.json(channel))
        .catch(err => res.status(400).json('Error: '+err));
})
//delete
router.route('/:id').delete((req,res)=>{
    Channel.findByIdAndDelete(req.params.id)
        .then(() =>res.json('channel deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;