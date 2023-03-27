import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import { nameDTOSchema, surnameDTOSchema } from '#Dto/dto-types.js';

const UpdateDataDTOSchema = Type.Object({
    name:nameDTOSchema,
    surname:surnameDTOSchema,
},{
    additionalProperties:false,
    errorMessage:
    {
        additionalProperties:'El formato del body no es correcto',
    }
});

// TODO:    separar la llamaa de AJV que se repite en varios lugares
const ajv = new Ajv({ allErrors: true }).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(UpdateDataDTOSchema);

const userUpdateDataDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    //  console.log(validateSchema.errors);

    if (!isDTOValid)
        return res
            .status(400)
            //  .send(ajv.errorsText(validateSchema.errors, { separator: '\n' }));
            .send(
                { errors: validateSchema.errors.map((error) => error.message)});

    next();
};

export default userUpdateDataDTO;
