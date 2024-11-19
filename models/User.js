import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: [true, "Name must be provided"],
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [ true, "Email must be provided" ],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ],
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    contact: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    authId: {
        type: String,
        unique: true,
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);