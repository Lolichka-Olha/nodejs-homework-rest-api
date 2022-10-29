const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ email, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    date: {
      user: {
        email: result.email,
        subscription
      }
    }
  });
};

module.exports = register;
