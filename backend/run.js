import { validationResult } from "express-validator";

export const runValidation =(req, res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let errorList= errors.array().map((erorr)=> erorr.msg)
        return res.status(422).send({
            message: errorList[0],
        })
    }
    next()
}