const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "UserForm",
    });
    console.log(`MongoDB connected to Database:-> huffyu${connection.host}xtrmju`);
  } catch (error) {
    console.log(error.message);
    console.log(`some error occur ${error}`);
    process.exit(1);
  }
};
