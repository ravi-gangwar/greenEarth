import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required"]
    },
    name: {
        type: String,
        required: [true, "User name is Required"],
    },
    messages: [
        {
            message: {
                type: String,
                required: [true, "user message required"],
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const ContactModel = mongoose.model('Contact', contactSchema);

export default ContactModel;
