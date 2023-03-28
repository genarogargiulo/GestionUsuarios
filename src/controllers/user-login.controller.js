import UserModel from "#Schemas/user.schema.js";
import { hash } from "bcrypt"; // libreria que nos permite encriptar datos

const userRegisterController = async (req, res) => {
    //  obtenemos los datos del body del mensaje
    const { _id, name, surname, email, password } = req.body;
    // validamos si ya existe un usuario con ese ID
    const existingUserById = await UserModel.findById(_id).exec();

    if (existingUserById) return res.status(409).send('Usuario existente');

    // validamos si ya existe un usuario con ese email
    const existingUserByEmail = await UserModel.findOne({email}).exec();

    if (existingUserByEmail) return res.status(409).send('Email existente');

    // Generamos una hash para guardar la constraseña
    const hashedPassword = await hash(password, 10);
    const user = new UserModel(
        { _id, name, surname, email, password: hashedPassword }
    )

    //  guardamos el usuario en BD
    await user.save();

    res.send('Usuario registrado con exito!')
};


export default userRegisterController;