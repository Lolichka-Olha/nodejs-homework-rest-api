const express = require("express");
const Joi = require("joi");
const router = express.Router();
const createError = require("http-errors");

const contactsOperations = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().required()
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    console.log(result);
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw createError(404, "Contact not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing field");
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
