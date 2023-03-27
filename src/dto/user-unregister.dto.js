import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats'
import { emailDTOSchema } from '#Dto/dto-types.js';

const UserUnregisterDTOSchema = Type.Object({
    email:emailDTOSchema,
});

const ajv = new Ajv({ allErrors: true }).addKeyword('kind').addKeyword('modifier');
ajv.addFormat('password',/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

addFormats(ajv, ['email']);
addErrors(ajv);

const validateSchema = ajv.compile(UserUnregisterDTOSchema);

const userUnregisterDTO = (req, res, next) => {
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

export default userUnregisterDTO;
