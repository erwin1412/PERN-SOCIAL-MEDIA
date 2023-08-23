import Joi = require("joi");


export  const registerSchema = Joi.object().keys({
    fullname: Joi.string().required(),
    username: Joi.string().required().min(4).max(100),
    email: Joi.string().email().required(),
    // password: Joi.string().required().min(8).max(100).regex(/^[0-9+]{7}-[0-9+]{1}$/), buat minimum
    password: Joi.string().required(),
    picture: Joi.string(),
  });


export  const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });



  export  const updatedUserSchema = Joi.object().keys({
    fullname: Joi.string(),
    username: Joi.string().min(4).max(100),
    email: Joi.string().email(),
    // password: Joi.string().min(8).max(100).regex(/^[0-9+]{7}-[0-9+]{1}$/), buat minimum
    password: Joi.string(),
    picture: Joi.string(),
  });

