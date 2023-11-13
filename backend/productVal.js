import { check } from "express-validator";

export const productValidation= [check('id').isNumeric().withMessage('must be a number'),]
export const creatProductValidation =[
    check('title')
    .trim()
    .notEmpty()
    .withMessage('title is required')
    .isLength({min: 2 , max:20})
    .withMessage('title should be 2~20'),
    check('price')
    .trim()
    .notEmpty()
    .withMessage('price is required')
    .isLength({min: 2 })
    .withMessage('should be positive')
]
export const updateValidation =[
    check('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('title is required')
    .isLength({min: 2 , max:20})
    .withMessage('title should be 2~20'),
    check('price')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('price is required')
    .isLength({min: 2 })
    .withMessage('should be positive')
]