const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Uploadschema = new Schema({
	title:{
		type:String,
		required:true
	},
	
	idchannel:{
		type:String,
		required:true,
	},
	video:{
		type:String,
		required:true,
	},
	poster:{
		type:String,
		required:true
	}

},{
	timestamps:true,
})


const Upload = mongoose.model('Upload',Uploadschema);

module.exports = Upload;