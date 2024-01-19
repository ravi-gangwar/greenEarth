import mongoose from "mongoose";
const {Schema} = mongoose;

const userLocSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required"]
    },
    name: {
        type: String,
        required: [true, "name is required"]
    },
    location: [
        {
            coordinates: {
                latitude: {
                    type: Number,
                    required: true
                },
                longitude: {
                    type: Number,  
                    required: true
                }
            },
            timestamps: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});


const userLocModel = mongoose.model('userLocation', userLocSchema);
export default userLocModel;