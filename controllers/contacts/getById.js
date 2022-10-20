const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw RequestError(404, "Contact not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result
    }
  });
};

module.exports = getById;
