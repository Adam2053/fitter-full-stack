import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true
    },
    profile: {
        name: {
            type: String,
        },
        age: {
            type: Number, 
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },
        weight: {
            type: Number,
        },
        height: {
            type: Number,
        },
        weightGoal: {
            type: Number
        },
        profilePic: {
            type: String
        },
        bio : {
            type : String
        },
        bmi : {
            type: Number,
            maxlength: 4
        }
    }
})

const User = mongoose.model('User', userSchema);

export default User;