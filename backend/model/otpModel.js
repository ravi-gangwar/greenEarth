import mongoose from "mongoose";

const {Schema} = mongoose;

const otpSchema = new Schema({
    email : {
        type : String,
        require: [true, "user email must be required"],
        unique: [true, "email already registered"],
        lowercase: true
    },
    code: {
        type: String,
        require: [true, 'user name is Required'],
    },
    expireIn : {
        type : Number,
        require: [true, 'user Password is Required'],
    },
},{
    timestamps: true
});



const otpModel = mongoose.model('otp', otpSchema);
export default otpModel;