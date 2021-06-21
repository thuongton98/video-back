const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Channelschema = new Schema({
	idchannel:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true,
	},
	key:{
		type:String,
		required:true,
	}
},{
	timestamps:true,
})


const Channel = mongoose.model('Channel',Channelschema);

module.exports = Channel;