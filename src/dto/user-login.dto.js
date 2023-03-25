import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { emailDTOSchema, passwordDTOSchema } from '#Lib/dto-types.js';

const LoginDTOSchema = Type.Object({
    email: emailDTOSchema,
    password: passwordDTOSchema
},{
    additionalProperties:false,
    errorMessage:
    {
        additionalProperties:'El formato del body no es correcto',
    }
});

const ajv = new Ajv({ allErrors: true }).addKeyword('kind').addKeyword('modifier');
ajv.addFormat('password',/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

addFormats(ajv, ['email']);
addErrors(ajv);

const validateSchema = ajv.compile(LoginDTOSchema);

const userLoginDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    //  console.log(validateSchema.errors);

    if (!isDTOValid)
        return res
            .status(400)
            //  .send(ajv.errorsText(validateSchema.errors, { separator: '\n' }));
            .send(
                { errors: validateSchema.errors.map((error) => error.message) });

    next();
};

export default userLoginDTO;
