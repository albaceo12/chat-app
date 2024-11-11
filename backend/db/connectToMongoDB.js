import mongoose from "mongoose";

const connectTomongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected to mongodb successfully");
  } catch (error) {
    console.log("Error connecting to Mongodb", error.message);
  }
};
export default connectTomongodb;
