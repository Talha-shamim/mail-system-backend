import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'wethree0003@gmail.com',
        pass : '----',
    }
})

const sendEmail = (to,sub,msg,emoji) => {
    
    if(emoji !== 'false'){
        var mailOptions = {
            from : 'wethree0003@gmail.com',
            to :  to,
            subject : sub,
            html: msg,
            attachments : [{
                filename : emoji,
                path : './controller/'+emoji,
            }]
        }
    }
    else{
        var mailOptions = {
            from : 'wethree0003@gmail.com',
            to :  to,
            subject : sub,
            html: msg
        }
    }
    
    let mailsended = false;
    transporter.sendMail(mailOptions, function (error,info){
        if(error){
            console.log(error);
        }
        else{
            mailsended = true;
            console.log(mailOptions)
            console.log('mail sent : ' + info.response);
        }
    })

    return mailsended;
}

export default sendEmail;
