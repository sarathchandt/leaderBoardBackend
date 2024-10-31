import mongoose from "mongoose";

export default {
  connect: async () => {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.DB);
      console.log("connected to database");
    } catch (error) {
      console.log("error connecting to database", error);
    }
  },
};