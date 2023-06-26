import mongoose from "mongoose";

const connectDB = (connectionString: string) => {
  return mongoose.set("strictQuery", false).connect(connectionString);
};

export default connectDB;
