import Joi from 'joi';
 
export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().min(6).required()
});
 