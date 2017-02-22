import express from 'express'
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

let router = express.Router();

function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.username)){
        errors.username = "Este campo es requerido"
    }

    if (Validator.isEmpty(data.email)){
        errors.email = "Este campo es requerido"
    }

    if (Validator.isEmail(data.email)){
        errors.email = "Email is Invalido"
    }
    if (Validator.isEmpty(data.password)){
        errors.password = "Este campo es requerido"
    }



    if (Validator.isEmpty(data.passwordConfirmation)){
        errors.passwordConfirmation = "Este campo es requerido"
    }

    if (!Validator.equals(data.password, data.passwordConfirmation)){
        errors.passwordConfirmation = "No son iguales"
    }

    if (Validator.isEmpty(data.timezone)){
        errors.timezone = "Este campo es requerido"
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}

router.post('/', (req,res) => {
    console.log(req.body);
    setTimeout(() => {
    const { errors, isValid } = validateInput(req.body);

    if (!isValid){
        res.status(400).json(errors);
    }
    }, 5000);
});

export default router