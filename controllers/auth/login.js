const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw RequestError(401, "Email not verify");
  }

  const payload = {
    id: user._id
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription
      }
    }
  });
};

module.exports = login;
