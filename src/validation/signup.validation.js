const httpStatus = require("http-status");
const Joi = require("joi");

const signupValidationSchema = Joi.object({
  fullName: Joi.string().min(2).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

const validateSignup = (req, res, next) => {
  const { error } = signupValidationSchema.validate(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validateSignup;
