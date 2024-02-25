import * as joi from "joi";

const signUpValidator = joi.object({
  name: joi
    .string()
    .regex(/^[A-Za-z ]+$/)
    .message("Name can only contain alphabets"),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Z!@#$%^&*><~(){}[]).+$/)
    .min(8)
    .messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": `Password should have a minimum length of {#limit}`,
      "any.required": `Password is a required field`,
      "string.pattern.base":
        "Password must contain at least on uppercase letter of symbol",
    }),
  confirm: joi.ref("password"),
});

export default signUpValidator;
