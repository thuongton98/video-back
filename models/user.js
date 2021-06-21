const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userschema = new Schema({
    avatar:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    birth:{
        type:String,
        required:true,
    },
    pass:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:true,
    },
    active:{
        type:String,
        required:true,
    },
    social:{
        type:String,
        required:true,
    },
    forget:{
        type:String,
        required:true,
    },
    newpass:{
        type:String,
        required:true,
    },
    newemail:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
})


const User = mongoose.model('User',Userschema);

module.exports = User;