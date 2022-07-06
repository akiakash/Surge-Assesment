// const mongoose = require("mongoose");
// const User = require("../models/User");

// mongoose
//   .connect("mongodb://localhost:27017/test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MONGO CONNECTION OPEN !!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const seedProducts = [
//   {
//     id: 123,
//     firstname: "akash",
//     lastname: "aki",
//     email: "callmereviewer12@gmail.com",
//     dateofbirth: 12 / 22 / 1999,
//     mobile: 768751665,
//     Status: "true",
//     password: "@Akiakash1",
//     accounttype: "student",
//     emailToken: crypto.randomBytes(64).toString("hex"),
//     isVerified: false,
//   },
// ];

// const seedDB = async () => {
//   await User.deleteMany({});
//   await User.insertMany(seedProducts);
// };

// seedDB().then(() => {
//   mongoose.connection.close();
// });
