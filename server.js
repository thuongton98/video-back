const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

//DB config
const db = require('./config/key.js').mongoURI;

//connect mongodb
mongoose
	.connect(
	db,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}
	)
	.then(()=>console.log('mongo connected'))
	.catch(err=>console.log(err));

//route
const uploadall = require('./routes/uploadall.js');
app.use('/uploadall',uploadall)

const channel = require('./routes/createchannel.js')
app.use('/channel',channel)

const uploadimg = require('./routes/uploadimg.js')
app.use('/uploadimg',uploadimg)

const uploadvideo = require('./routes/uploadvideo.js')
app.use('/uploadvideo',uploadvideo)

const user = require('./routes/createuser.js')
app.use('/user',user)


app.listen(port,()=>{
	console.log(`server is running on port: ${port}`)
})