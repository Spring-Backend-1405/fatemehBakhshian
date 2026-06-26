import validator from 'express-validator';

// export const loginValidation = [
//   validator
//     .body("email")
//     .isString()
//     .withMessage("email is required")
//     .isEmail()
//     .withMessage("incorrect email format!"),
//   validator
//     .body("password")
//     .isString()
//     .withMessage("password is required")
//     .isLength({ min: 4, max: 10 })
//     .withMessage("password must be 4-10 chars"),
// ];

export const sendVerifyCodeValidation = [
  validator
    .body('email')
    .isString()
    .isEmail()
    .withMessage("incorrect email format!")
];

export const registerValidation = [
  validator
    .body('full_name')
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage('name is required and must be 4-10 chars'),

  validator.body('email').isString().isEmail().withMessage('incorrect email format!'),

  validator
    .body('phone_number')
    .isString()
    .isLength({max: 11, min: 11 })
    .isMobilePhone('ir-IR')
    .withMessage('phone number is required and must be 11 chars'),
  validator
    .body('password')
    .isString()
    .isLength({ min: 4, max: 10 })
    .withMessage('password must be 4-10 chars'),
];

export const checkValidation = (request, response, next) => {
  const err = validator.validationResult(request);
  if (!err.isEmpty()) {
    return response.status(422).send(err);
  }
  next();
};
