import userLoginDTO from '#Dto/user-login.dto.js';
import userRegisterDTO from '#Dto/user-register.dto.js';
import UserUnregisterDTO from '#Dto/user-unregister.dto.js';
import userUpdateDataDTO from '#Dto/user-update-data.dto.js';
import userUpdateEmailDTO from '#Dto/user-update-email.dto.js';
import userUpdatePasswordDTO from '#Dto/user-update-password.dto.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/register', userRegisterDTO);
userRouter.post('/login', userLoginDTO);
userRouter.get('/profile');
userRouter.patch('/update-data', userUpdateDataDTO);
userRouter.patch('/update-email', userUpdateEmailDTO);
userRouter.patch('/update-password', userUpdatePasswordDTO);
userRouter.delete('/unregister', UserUnregisterDTO);


export default userRouter;