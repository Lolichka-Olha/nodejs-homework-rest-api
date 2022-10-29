const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    throw RequestError(400, "missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result
    }
  });
};

module.exports = updateStatusContact;
