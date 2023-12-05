import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    customername: {
        type: String,
        required: true,
        maxlength: 60,
    },
    address: {
        type: Number,
        required: true,
        maxlength: 200,
    },
    totalprice: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        default: 0,    
    },
    paymentmethod: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);