const { User } = require("../../models");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken
  });

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    date: {
      user: {
        email: result.email,
        subscription,
        avatarURL,
        verificationToken
      }
    }
  });
};

module.exports = register;
