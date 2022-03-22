const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config");

module.exports = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
