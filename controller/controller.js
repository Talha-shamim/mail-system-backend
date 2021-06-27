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
                res.status(200).json({message : users[0].name})
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

const newUserMsg = (name) => {
    const welcomeMsg = `<h2>Hi ${name}</h2>
                  <p>Thank you for registering with us<p>
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
            const msg = newUserMsg(req.body.name);
            console.log(msg)
            sendEmail(req.body.email, 'Welcome To mailer', msg, 'false');
            console.log(signedUpUser)
        }
    }
    catch(error){
        res.status(501).json({message : 'signup failed'})
    }
}


const styleMsg = (msg, fontSize, fontStyle, fontWeight, color) => {
    const styledMsg = `<p style="font-size:${fontSize}px; font-weight:${fontWeight}px; color:${color}; font-family:${fontStyle}; " >${msg}<p>
    `
    return styledMsg;
}

export const sendMail = async (req,res) => {
    try{
        const mails = req.body.email.split(" ");
        for(let i=0;i<mails.length;i++){
            const modifiedMsg = styleMsg(req.body.msg,req.body.fontSize,req.body.fontStyle,req.body.fontWeight,req.body.color);
            try{
                var addToDb = sendEmail(mails[i], req.body.subject, modifiedMsg,req.body.emoji);
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
                        msg : req.body.msg,
                        emoji : req.body.emoji,
                        fontSize : req.body.fontSize,
                        fontStyle : req.body.fontStyle,
                        fontWeight : req.body.fontWeight,
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
        const mails = req.body.email.split(" ");
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
                        emoji : req.body.emoji,
                        fontSize : req.body.fontSize,
                        fontStyle : req.body.fontStyle,
                        fontWeight : req.body.fontWeight,
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

