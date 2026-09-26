// in this we use Mongo_uri to connect database

import mongoose from "mongoose";

export async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI us required");
    }

    const conn = await mongoose.connect(mongoUri);
    console.log("MONGO_DB Connected", conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection error", error.message);
    process.exit(1);
    // 1 means failure , 0 means success
  }
}
