import mongoose from "mongoose";

export default {
  connect: async () => {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect("mongodb://localhost:27017/leaderBoard");
      console.log("connected to database");
    } catch (error) {
      console.log("error connecting to database", error);
    }
  },
};