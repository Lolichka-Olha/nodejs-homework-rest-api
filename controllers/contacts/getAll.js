const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...filter } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, ...filter }, "", {
    skip,
    limit
  }).populate("owner", "email subscription");
  console.log(result);
  res.json({
    status: "success",
    code: 200,
    data: {
      result
    }
  });
};

module.exports = getAll;
