import * as joi from "joi";

const loginValidator = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .message("Please enter a valid email address"),
  password: joi.string().min(8).required().messages({
    "string.base": `Password should be a type of 'text'`,
    "string.empty": `Password cannot be an empty field`,
    "string.min": `Password should have a minimum length of {#limit}`,
    "any.required": `Password is a required field`,
  }),
});

export default loginValidator;
