const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");


const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user with the given username already exists
    const existingUser = await User.findOne({ username});
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    // You may generate a JWT token here and send it in the response for user authentication

    res.status(201).json({
      user: {
        username: savedUser.username,
        
      },
      message: "user registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user with the given username exists
      const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // Replace 'your-secret-key' with a strong secret key
    res.status(200).send({
      message: "sign in successfully",
      username: user.username,
      _id: user._id,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
    register,
    login,
};
