import UserModel from "#Schemas/user.schema.js";
import { compare } from "bcrypt";
import { SignJWT } from "jose"; // libreria que nos permite encriptar datos

const userLoginController = async (req, res) => {
    //  obtenemos los datos del body del mensaje
    const { email, password } = req.body;

    // validamos si ya existe un usuario con ese email
    const existingUserByEmail = await UserModel.findOne({email}).exec();

    if (!existingUserByEmail) return res.status(401).send('Credencial incorrecta');

    const checkPassword = await compare(password, existingUserByEmail.password);

    if (!checkPassword) return res.status(401).send('Credencial incorrecta');

    const jwtConstructor = new SignJWT({
        id: existingUserByEmail._id
    });

    const encoder = new TextEncoder();
    const jwt = await jwtConstructor.setProtectedHeader({
        alg: 'HS256',
        typ: 'JWT'
    }).setIssuedAt().setExpirationTime('7d').sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send( {jwt} );
};


export default userLoginController;