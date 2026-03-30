import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://foodappuser:foodappuser@cluster0.gnr7zu4.mongodb.net/food-delivery?appName=Cluster0"
        );
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    }
};
