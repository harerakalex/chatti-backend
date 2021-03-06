import Joi from 'joi';

export const registerUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(5).max(20).required(),
  displayName: Joi.string().min(2).max(15).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(20),
  lastName: Joi.string().min(2).max(20),
  bio: Joi.string().min(5).max(300),
  displayName: Joi.string().min(2).max(15),
});

export const messageSchema = Joi.object({
  message: Joi.string().trim().not('').required(),
  receiverId: Joi.number().positive().required(),
});
