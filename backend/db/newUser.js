const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String
});

module.exports = mongoose.model('Users', userSchema);

// function registerNewUser(name, email, phone, password) {
//   return User.findOne({ email })
//     .then(user => {
//       if (user) {
//         return Promise.reject('User already exists');
//       }

//       const newUser = new User({ name, email, phone, password });

//       return newUser.save();
//     });
// }

// module.exports = { registerNewUser };
