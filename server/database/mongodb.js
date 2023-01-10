import mongoose from "mongoose";


mongoose.set('strictQuery', true);

async function connect() {
    await mongoose.connect("mongodb+srv://sophie:sophie123@spending-tracker.welg0vl.mongodb.net/?retryWrites=true&w=majority");
    console.log('MongoDB connection is successful');
};

export default connect;
