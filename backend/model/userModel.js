import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    avatar: {
        type : String
    },
    email : {
        type : String,
        require: [true, "user email must be required"],
        unique: [true, "email already registered"],
        lowercase: true
    },
    name: {
        type: String,
        require: [true, 'user name is Required'],
        minLength: [3, "name min length 5 char"],
        maxLength: [15, "name must be less than 15 char"],
        trim: true
    },
    DateOfBirth: {
        type: String
    },
    password : {
        type : String,
        require: [true, 'user Password is Required'],
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isWorker : {
        type : Boolean,
        default: false,
    },
    isMember: {
        type: Boolean,
        default: false,
    },
    isMembership: {
        type: String,
        default: "none",
    },
    address: {
        type: Object,
    },
    phone: {
        type: Number
    }
},{
    timestamps: true
});



const userModel = mongoose.model('user', userSchema);
export default userModel;