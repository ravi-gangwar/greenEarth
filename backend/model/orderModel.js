import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'user name is Required'],
        minLength: [3, "name min length 5 char"],
        maxLength: [15, "name must be less than 15 char"],
        trim: true
    },
    email : {
        type : String,
        require: [true, "user email must be required"],
        lowercase: true
    },
    userId : {
        type : String,
        require: [true, "user id must be required"],
    },
    orderTrees : [],
    shippingAddress: {
        type: Object,
        require: [true, "shipping address must be required"]
    },
    orderAmount : {
        type: Number,
        require: [true, "order amount must be required"]
    },
    isDelivered : {
        type: Boolean,
        require: [true, "isDeliverd must be required"],
        default: false
    },
    isCancelled : { 
        type: Boolean,
        default: false,
    },
    transectionId : {
        type: String,
        require: [true, "transectionId must be required"]
    }
    
}, 
    {
        timestamps: true
    }
)

const orderModel  = mongoose.model('order', orderSchema)

export default orderModel;