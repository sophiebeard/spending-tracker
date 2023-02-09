import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: ['Please enter first name'] },
    lastName: { type: String, required: ['Please enter last name'] },
    email: { type: String, required: ['Please enter email address'] },
    password: { type: String, required: ['Please enter your password'] },
},
    { timestamps: true }
);

export default new mongoose.model("User", userSchema);