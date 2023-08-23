import Joi = require("joi");


export  const createdReplySchema = Joi.object().keys({
    comment: Joi.string().required(),
  });
