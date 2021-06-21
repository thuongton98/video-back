const router = require('express').Router();
const nodemailer = require("nodemailer");
// lay du lieu
let User = require('../models/user');
//truen ra 
router.route('/').get((req, res)=>{
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' +err));
});
//add
router.route('/add').post((req,res)=>{
    const avatar = 'https://thuongtube.tk/api/video/uploadimg/default.jpg';
     const username = req.body.username;
    const lname = req.body.lname;
    const fname = req.body.fname;
    const phone = req.body.phone;
    const birth = req.body.birth;
    const pass = req.body.pass;
   
    const token = req.body.token;
    const forget = 'no'
    const social = 'no'
    const email = req.body.email;
    const newpass = 'no';
    const newemail = 'no';

   User.find()
        .then((e)=>{
           if(e.length<1){
    const role = 'admin'
    const active = 'yes'
    
    const newUser = new User({
        avatar,
        username,
        email,
        lname,
        fname,
        phone,
        birth,
        pass,
        role,
        token,
        active,
        social,
        forget,
        newpass,
        newemail
    })
    newUser.save()
        .then(()=>res.json('create user'))
        .catch(err=>res.status(400).json('error: ' +err));
           }else{
    const role = 'user'
    const active = 'no'

    const newUser = new User({
        avatar,
        username,
        email,
        lname,
        fname,
        phone,
        birth,
        pass,
        role,
        token,
        active,
        social,
        forget,
        newpass,
        newemail
    })
    newUser.save()
        .then(ok=>{
      var transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: 'thuongton98@gmail.com',
            pass: '30031998thuong'
        },
       
    });
       
        //link active lam lai
        const link='https://thuongtube.tk/active/'+ok.token
       
 var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
              from: 'Thuong',
              to: ok.email,
              subject: 'This is Thuong!!!!',
              
              html: `<b>Click here! </b><br> This is your active link <br> <a href=${link}>Click</a>`,
          
          }
          transporter.sendMail(mainOptions, function(err, info){
              if (err) {
                  console.log(err);
                 
              } else {
                  console.log('Message sent: ' +  info.response);
                 
              }
          });
       
      
       //settime doi sau khoan thoi gian
       setTimeout(()=>{
        var crypto = require("crypto");
        ok.token = crypto.randomBytes(200).toString('hex');
  
       ok.save();
       },3600000);
    }
    
    )
   
           }

        })
})
//show id
router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
        .then(user=>res.json(user))
        .catch(err => res.status(400).json('Error: '+err));
})
//delete
router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(() =>res.json('channel deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
})
//active
router.route('/active/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(user=>{
            user.active = req.body.active
            user.token = req.body.token
            user.save()
        })
        .catch(err => res.status(400).json('Error: '+err));
})
//send link forget
router.route('/forget/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(user=>{
            user.forget = req.body.forget
          
            user.save()
            .then(ok=>{
      var transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: 'thuongton98@gmail.com',
            pass: '30031998thuong'
        },
       
    });
       
        //link active lam lai
        const link='https://thuongtube.tk/changepass/'+ok.token
       
 var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
              from: 'Thuong',
              to: ok.email,
              subject: 'This is Thuong!!!!',
              
              html: `<b>Click here! </b><br> This is your active link <br> <a href=${link}>Click</a>`,
          
          }
          transporter.sendMail(mainOptions, function(err, info){
              if (err) {
                  console.log(err);
                 
              } else {
                  console.log('Message sent: ' +  info.response);
                 
              }
          });
       
      
       //settime doi sau khoan thoi gian
       setTimeout(()=>{
        var crypto = require("crypto");
        ok.token = crypto.randomBytes(200).toString('hex');
  
       ok.save();
       },3600000);
    }
    
    )
        })
        .catch(err => res.status(400).json('Error: '+err));
})

//active change pass
router.route('/change/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(user=>{
            user.pass = req.body.pass
            user.token = req.body.token
            user.forget = 'no'
            user.newpass='no'
            user.save()

        })
        .catch(err => res.status(400).json('Error: '+err));
})

//send active
router.route('/sendactive/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(ok=>{
      var transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: 'thuongton98@gmail.com',
            pass: '30031998thuong'
        },
       
    });
       
        //link active lam lai
        const link='https://thuongtube.tk/active/'+ok.token
       
 var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
              from: 'Thuong',
              to: ok.email,
              subject: 'This is Thuong!!!!',
              
              html: `<b>Click here! </b><br> This is your active link <br> <a href=${link}>Click</a>`,
          
          }
          transporter.sendMail(mainOptions, function(err, info){
              if (err) {
                  console.log(err);
                 
              } else {
                  console.log('Message sent: ' +  info.response);
                 
              }
          });
       
      
       //settime doi sau khoan thoi gian
       setTimeout(()=>{
        var crypto = require("crypto");
        ok.token = crypto.randomBytes(200).toString('hex');
  
       ok.save();
       },3600000);
    }
    
    )
        .catch(err => res.status(400).json('Error: '+err));
})

//update user 
router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(user=>{
            user.username = req.body.username
            user.fname = req.body.fname
            user.lname = req.body.lname
            user.phone = req.body.phone
            user.birth = req.body.birth
            user.save()
        })
        .catch(err => res.status(400).json('Error: '+err));
})

//update email - send mail 
router.route('/updateemail/:id').post((req,res)=>{
    User.findById(req.params.id)
       .then(ok=>{
            ok.newemail = req.body.newemail
            ok.save();
      var transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: 'thuongton98@gmail.com',
            pass: '30031998thuong'
        },
       
    });
       
        //link active lam lai
        const link='https://thuongtube.tk/changeemail/'+ok.token
       
 var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
              from: 'Thuong',
              to: req.body.newemail,
              subject: 'This is Thuong!!!!',
              
              html: `<b>Click here! </b><br> This is your active link <br> <a href=${link}>Click</a>`,
          
          }
          transporter.sendMail(mainOptions, function(err, info){
              if (err) {
                  console.log(err);
                 
              } else {
                  console.log('Message sent: ' +  info.response);
                 
              }
          });
       
      
       //settime doi sau khoan thoi gian
       setTimeout(()=>{
        var crypto = require("crypto");
        ok.token = crypto.randomBytes(200).toString('hex');
  
       ok.save();
       },3600000);
    }
    
    )
        .catch(err => res.status(400).json('Error: '+err));
})
//check email change
router.route('/confirmemail/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(user=>{
            user.email = req.body.email
            user.token = req.body.token
            user.newemail = req.body.newemail
          
            user.save()
        })
        .catch(err => res.status(400).json('Error: '+err));
})
//update pass send mail 
router.route('/checkupdatepass/:id').post((req,res)=>{
    User.findById(req.params.id)
       .then(ok=>{
            ok.newpass = req.body.newpass
            ok.save();
      var transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: 'thuongton98@gmail.com',
            pass: '30031998thuong'
        },
       
    });
       
        //link active lam lai
        const link='https://thuongtube.tk/checkupdatepass/'+ok.token
       
 var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
              from: 'Thuong',
              to: ok.email,
              subject: 'This is Thuong!!!!',
              
              html: `<b>Click here! </b><br> This is your active link <br> <a href=${link}>Click</a>`,
          
          }
          transporter.sendMail(mainOptions, function(err, info){
              if (err) {
                  console.log(err);
                 
              } else {
                  console.log('Message sent: ' +  info.response);
                 
              }
          });
       
      
       //settime doi sau khoan thoi gian
       setTimeout(()=>{
        var crypto = require("crypto");
        ok.token = crypto.randomBytes(200).toString('hex');
  
       ok.save();
       },3600000);
    }
    
    )
        .catch(err => res.status(400).json('Error: '+err));
})
//check update change
router.route('/confirmpass/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(user=>{
            user.pass = req.body.pass
            user.token = req.body.token
            user.newpass = req.body.newpass
          
            user.save()
        })
        .catch(err => res.status(400).json('Error: '+err));
})

//update avatar
router.route('/avatar/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(user=>{
            user.avatar = req.body.avatar
          
          
            user.save()
        })
        .catch(err => res.status(400).json('Error: '+err));
})


//update user - admin
router.route('/updateuser/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(user=>{
           
            user.username=req.body.username
            user.email=req.body.email
            user.fname=req.body.fname
            user.lname=req.body.lname
            user.phone=req.body.phone
            user.pass=req.body.pass
            user.birth=req.body.birth
            user.active=req.body.active
          
            user.save()
        })
        .catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;