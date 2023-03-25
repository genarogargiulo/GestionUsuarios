import { Type } from '@sinclair/typebox';


export const idDTOSchema = Type.Object({
    _id: Type.String({
        format: 'uuid',
        errorMessage: {
            Type: 'El tipo de dato es incorrecto',
            format: 'El formato no es valido, debe ser uuid4',
        },
    })})
export const nameDTOSchema = Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
        minLength: 'Minimo de longitud 2 caracteres',
        maxLength: 'Maximo de longitud 20 caracteres',
    },
})

export const surnameDTOSchema = Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
        minLength: 'Minimo de longitud 4 caracteres',
        maxLength: 'Maximo de longitud 50 caracteres',
    },
})

export const emailDTOSchema = Type.String({
    format: 'email',
    errorMessage: {
        Type: 'El tipo de dato es incorrecto',
        format: 'Debe cumplir con el formato de email',
    },
})

export const passwordDTOSchema = Type.String({
    format: 'password',
    minLength: 10,
    maxLength: 25,

    errorMessage: {
        Type: 'El tipo de dato es incorrecto',
        format: 'Debe contar con una mayuscula, una minuscula y un numero',
        minLength: 'Minimo de longitud 10 caracteres',
        maxLength: 'Maximo de longitud 25 caracteres',
    },
})