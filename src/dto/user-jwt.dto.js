import {jwtVerify} from 'jose';

const userJWTDTO = async (req, res, next) =>
{
    const {authorization} = req.headers;

    if (!authorization) return res.status(401).send('1 Usuario no autorizado');
    
    console.log(authorization);

    const jwt = authorization.split(' ')[1];
    if (!jwt) return res.status(401).send('2 Usuario no autorizado');

    console.log(jwt);
    
    try {

        const encoder = new TextEncoder()
        const { payload } = await jwtVerify(jwt, encoder.encode(process.env.JWT_PRIVATE_KEY))

        console.log(payload);

        req.id = payload.id;

        next();

    } catch (error) {
        res.status(401).send('3 Usuario no autorizado')
    }
    
}

export default userJWTDTO;