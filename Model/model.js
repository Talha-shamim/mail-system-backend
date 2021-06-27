import mongoose from "mongoose";

const MailSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    
    sentMails : [
        {
            to : String,
            sub : String,
            msg : String,
            cc : String,
            emoji : String,
            fontSize : String,
            fontStyle : String,
            fontType : String,
            color : String,
            fontWeight : String,
            important_ : Boolean,
            time : { type : Date, default: Date.now } 
        }
    ],

    scheduledMails : [
        {
            to : String,
            sub : String,
            msg : String,
            cc : String,
            emoji : String,
            fontSize : String,
            fontStyle : String,
            fontType : String,
            color : String,
            fontWeight : String,
            important_ : Boolean,
            time_ : String,
            time : { type : Date, default: Date.now }
        },
    ],
});

const Mail = mongoose.model("Mail", MailSchema);

export default Mail;
