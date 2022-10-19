const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"]
    },
    email: {
      type: String
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"]
    },
    favorite: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
});

const schemas = {
  addSchema,
  updateFavoriteSchema
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas
};
