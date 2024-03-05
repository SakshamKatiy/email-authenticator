const express = require('express');
const app = express();
const otpGenerator = require("otp-generator");
const nodeMailer = require("nodemailer");
const trekCaptcha = require("trek-captcha");
const fs = require('fs');
const path = require("path");

port = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// _________Genrate Otp ______--
getOtp = ()=>{
    return otpGenerator.generate(6, {specialChars: false})
}
// console.log(getOtp());
otp = getOtp()

// generate Captcha
async function capt(){
const{token,buffer}=await trekCaptcha()
fs.createWriteStream('./public/capture.gif').on('finish',()=>console.log(token),generatecaptcha = token).end(buffer)
}
const cap = capt();






app.get('/verify',(req,res)=>{
    res.render('verify')
})

app.post('/verify',function(req,res){
    if (req.body.otp == otp){
        res.send('logged-in');
    }
    else{
        res.send('incorrect otp')
    }
});


app.get('/',(req,res)=>{
    res.render('index');
});


app.post('/index',function(req,res){
    if(req.body.cap==generatecaptcha){
        const email = req.body.mail;
console.log(otp)

        const mailOption ={
            from:'yadav.ahul510@gmail.com',
            to:req.body.email,
            subject:'OTP verification',
            text:`Your OTP is: ${otp}`
        }
        transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                console.log(error)
            }else{
                console.log('OTP sent:',info.response);
                res.render('verify');
            }
            res.render('verify')
        });
    }
});

// _______Sending otp through mail________
const transporter = nodeMailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"yadav.ahul510@gmail.com",
        password:"gerj hfis bmaw yean",
    }
});
// transporter.sendMail()


app.listen(port,()=>{
    console.log(`listening successfully http://localhost:${port}`)
})