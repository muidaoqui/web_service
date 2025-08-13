import mongoose from "mongoose";

const emailShema = new mongoose.Schema({

})

const EmailModel = mongoose.model('email', emailShema);
export default EmailModel;