import UserModel from "#Schemas/user.schema.js";

const userProfileController = async (req, res) => {
    
    const { id } = req;

    console.log(id);
    // validamos si ya existe un usuario con ese ID
    const existingUserByID = await UserModel.findById({id}).exec();

    console.log(existingUserByID);

    if (!existingUserByID) return res.status(401).send('Credencial incorrecta');
    
    const { _id, name, surname, email } = existingUserByID;

    return res.send({ _id, name, surname, email });
};


export default userProfileController;