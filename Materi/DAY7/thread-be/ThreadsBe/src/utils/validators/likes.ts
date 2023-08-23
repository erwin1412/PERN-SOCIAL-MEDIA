import Joi = require("joi");


export  const createdLikeSchema = Joi.object().keys({
    isLike: Joi.required(),
  });
