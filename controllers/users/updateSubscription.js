const { RequestError } = require("../../helpers");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;

  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription
    }
  });
};

module.exports = updateSubscription;
