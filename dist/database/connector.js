import mongoose from "mongoose";
const connectDB = (connectionString) => {
    return mongoose.set("strictQuery", false).connect(connectionString);
};
export default connectDB;
//# sourceMappingURL=connector.js.map