import mongoose from "mongoose";

const {Schema} = mongoose;

const treeListSchema = new Schema({
    name: {
        type: String,
        required: [true, 'tree name is Required'],
        minLength: [3, "name min length 5 char"],
        maxLength: [30, "name must be less than 15 char"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "tree price must be required"],
    },
    category: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: [true, "tree imageURL must be required"],
    },
    discription: {
        type: String,
        maxLength: [2000, "name must be less than 1000 char"],
    }
}, {
    timestamps: true
});




const treeModel = mongoose.model('treelist', treeListSchema);
export default treeModel;