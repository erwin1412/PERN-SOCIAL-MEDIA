import Joi = require("joi");


export  const createdThreadSchema = Joi.object().keys({
    content: Joi.string().required(),
    image: Joi.string().required(),
  });


  export  const updatedThreadSchema = Joi.object().keys({
    content: Joi.string(),
    image: Joi.string(),
  });

