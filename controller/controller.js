import { json } from 'body-parser';
import Mail from '../Model/model.js';
import sendEmail from './mail.js'

export const loginUser = async (req,res) => {
    try{
        const users = await Mail.find({email : req.body.email})
        if(users.length == 0){
            console.log('login failed')
            res.status(401).json({message : 'login failed'})
        }
        else{
            if(users[0].password === req.body.password || req.body.password === 'google-sign-in'){
                console.log('login successful')
                res.status(200).json({message : users[0].name , email : users[0].email})
            }
            else{
                console.log('login failed')
                res.status(401).json({message : 'login failed'})
            }
        }
    }
    catch(error){
        res.status(501).json({message : 'login failed'})
    }
}

const newUserMsg = (name,pass) => {
    const welcomeMsg = `<h2>Hi ${name}</h2>
                  <p>Thank you for registering with us<p>
                  <p>Your password : ${pass}</p>
                  <img src="https://cdn.dribbble.com/users/7831180/screenshots/15641971/media/4fda4547e5a26974564b08bbd8753b4f.jpg?compress=1&resize=400x300"/>            
    `
    return welcomeMsg;
}

export const SignupUser = async (req,res) => {
    try{
        const users = await Mail.find({email : req.body.email})
        if(users.length > 0){
            res.status(401).json({message : 'email already exist'})
            console.log('already exist')
        }
        else{
            const signedUpUser = await new Mail(req.body).save();
            const msg = newUserMsg(req.body.name,req.body.password);
            console.log(msg)
            sendEmail(req.body.email, 'Welcome To mailer', msg, 'false');
            console.log(signedUpUser)
            res.json(signedUpUser)
        }
    }
    catch(error){
        res.status(501).json({message : 'signup failed'})
    }
}


const styleMsg = (msg, fontSize, fontStyle, fontWeight, color,fontType) => {
    const styledMsg = `<p style="font-size:${fontSize}px; font-weight:${fontWeight}px; color:${color}; font-family:${fontStyle}; font-style : ${fontType}; " >${msg}<p>
    `
    return styledMsg;
}

export const sendMail = async (req,res) => {
    console.log(req.body)
    try{
        let mails = req.body.to.split(" ");
        for(let i=0;i<mails.length;i++){
            const modifiedMsg = styleMsg(req.body.msg,req.body.fontSize,req.body.fontStyle,req.body.fontWeight,req.body.color,req.body.fontType);
            try{
                var addToDb = sendEmail(mails[i], req.body.subject, modifiedMsg,req.body.emoji);
            }
            catch(error){
                console.log(error.message);
            }
        }   

        let ccs = req.body.cc.split(" ");
        for(let i=0;i<ccs.length;i++){
            const modifiedMsg = styleMsg(req.body.msg,req.body.fontSize,req.body.fontStyle,req.body.fontWeight,req.body.color,req.body.fontType);
            try{
                var addToDb = sendEmail(ccs[i], req.body.subject, modifiedMsg,req.body.emoji);
            }
            catch(error){
                console.log(error.message);
            }
        }

        if(true){
            const result = await Mail.findOneAndUpdate({email : req.body.senderEmail},{
                $push : {
                    sentMails : {
                        to : req.body.email,
                        sub : req.body.subject,
                        cc : req.body.cc,
                        msg : req.body.msg,
                        emoji : req.body.emoji,
                        fontSize : req.body.fontSize,
                        fontStyle : req.body.fontStyle,
                        fontWeight : req.body.fontWeight,
                        fontWeight : req.body.fontType,
                        color : req.body.color,
                    }
                }
            })
            console.log('added to mails')
            res.status(200).json({message : 'mailed'})
        }
        else{
            console.log('nhi hoga')
            res.status(500).json({message : 'failed'})
        }
    }
    catch(error){
        res.status(501).json({message : 'mail failed'})
    }
}


export const getAllMails = async (req,res) => {
    try{
        const users = await Mail.find({email : req.body.email})
        res.status(200).json(users[0].sentMails)
    }
    catch(error){
        console.log(error);
    }
    
}

export const getScheduledMails = async (req,res) => {
    try{
        const users = await Mail.find({email : req.body.email})
        res.status(200).json(users[0].scheduledMails)
    }
    catch(error){
        console.log(error);
    }
}


export const scheduleMail = async (req,res) => {
    console.log(req.body)
    try{
        let mails = req.body.to.split(" ");
        for(let i=0;i<mails.length;i++){
            const modifiedMsg = styleMsg(req.body.msg,req.body.fontSize,req.body.fontStyle,req.body.fontWeight,req.body.color);
            try{
                // var addToDb = sendEmail(mails[i], req.body.subject, modifiedMsg,req.body.emoji);
            }
            catch(error){
                console.log(error.message);
            }
        }

        if(true){
            const result = await Mail.findOneAndUpdate({email : req.body.senderEmail},{
                $push : {
                    scheduledMails : {
                        to : req.body.email,
                        sub : req.body.subject,
                        msg : req.body.msg,
                        cc : req.body.cc,
                        emoji : req.body.emoji,
                        fontSize : req.body.fontSize,
                        fontStyle : req.body.fontStyle,
                        fontWeight : req.body.fontWeight,
                        fontWeight : req.body.fontType,
                        color : req.body.color,
                        important_ : false,
                        time_ : req.body.time_,
                    }
                }
            })
            console.log('added to scheduled mails')
            res.status(200).json({message : 'mailed'})
        }
        else{
            console.log('nhi hoga')
            res.status(500).json({message : 'failed'})
        }
    }
    catch(error){
        res.status(501).json({message : 'mail failed'})
    }
}

export const flipImp = async(req,res) => {
    console.log(req.body);
    // const users = await Mail.findOneAndUpdate({email : req.body.email});
    // const id = users[0]._id;
    // for(let i=0;i<users[0].sentMails.length; i++){
    //     if(users[0].sentMails[i]._id == json(req.body._id)){
    //         var msg = users[0].sentMails[i];
    //         break;
    //     }
    // }
    // msg.important_ = !msg.important_;
    
    // const result = await Mail.findByIdAndUpdate(id, 
    //     users, function(err,data){
    //         if(err)console.log(err);
    //         else console.log(data); 
    //     }    
    // )

}