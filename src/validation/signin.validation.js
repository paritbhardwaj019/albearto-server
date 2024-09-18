const httpStatus = require("http-status");
const Joi = require("joi");

const signinValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

const validateSignin = (req, res, next) => {
  const { error } = signinValidationSchema.validate(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validateSignin;
