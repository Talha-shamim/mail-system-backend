import express from "express";
import { SignupUser, loginUser, sendMail, getAllMails, getScheduledMails, scheduleMail, flipImp } from '../controller/controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', SignupUser);
router.post('/sendMail', sendMail);
router.post('/scheduleMail', scheduleMail);
router.post('/getAllMails', getAllMails);
router.post('/imp', flipImp);
router.post('/getScheduledMails', getScheduledMails)

export default router;