import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected"));
    mongoose.connection.on('error', (err) => console.error("Database connection error:", err));

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
    } catch (error) {
        console.error("Database connection failed on startup:", error.message);
    }
};

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.