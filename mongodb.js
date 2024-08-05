const mongoose = require('mongoose');

// // Connection URL
// const dbURL = 'mongodb://localhost:27017/LoginSignup';

mongoose.connect('mongodb+srv://mauryaswayam3:WlXJnktjuQv4rUaT@cluster0.o3qjbwe.mongodb.net/LoginSignup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,  // For MongoDB < 5.x
  useFindAndModify: false // For MongoDB < 5.x
})


.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});


const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const collections = mongoose.model('collections', loginSchema);

module.exports = collections;
