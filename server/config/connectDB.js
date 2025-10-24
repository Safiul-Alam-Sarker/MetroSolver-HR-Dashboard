import mongoose from "mongoose"

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => { console.log("mongodb server is connected") })
        await mongoose.connect(process.env.MONGODB_URL + "metrosolver")

    } catch (error) {
        console.log("mongoose connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDB