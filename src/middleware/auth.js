import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";
import { AppError } from "../utls/AppError.js";

export const roles = {
    Admin: 'Admin',
    User: 'User'
}

export const auth = (accessRoles = []) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization?.startsWith(process.env.BEARERKEY)) {
            return next(new AppError(`Invalid authorization`, 401 ));
            
        }
        const token = authorization.split(process.env.BEARERKEY)[1];
        try {
            const decoded = jwt.verify(token, process.env.LOGINSECRET);
            if (!decoded) {
                return next(new AppError(`Invalid authorization`, 401 ));
                
            }
            const user = await userModel.findById(decoded.id).select("userName role changePasswordTime");
            if (!user) {
                return next(new AppError(`Not registered user`, 400 ));
                
            }
            if (parseInt(user.changePasswordTime?.getTime() / 1000) > decoded.iat) {
                return next(new AppError(`Expired token, please login`, 400 ));
            }
            if (!accessRoles.includes(user.role)) {
                return next(new AppError(`Not authorized user`,401))
              
            }
            req.user = user;
            next();
        } catch (error) {
            
            return next(new AppError( "Invalid token or token has expired", 400 ));
        }
    }
}




// import jwt from "jsonwebtoken";
// import userModel from "../../DB/model/user.model.js";


// export const roles = {
//     Admin:'Admin',User:'User'
// }

// export const auth = (accessRoles =[])=>{
//     return async (req,res,next)=>{
        
//         const {authorization} = req.headers;
//         if(!authorization?.startsWith(process.env.BEARERKEY)){
//             return res.status(400).json({message:"Invalid authorization"});
//         }
//         const token = authorization.split(process.env.BEARERKEY)[1];
//         const decoded = jwt.verify(token,process.env.LOGINSECRET);
//         if(!decoded){
//             return res.status(400).json({message:"Invalid authorization"});
//         }
//         const user = await userModel.findById(decoded.id).select("userName role changePasswordTime");
//         if(!user){
//             return res.status(404).json({message:"not registerd user"});
//         }

//         if(parseInt(user.changePasswordTime?.getTime()/ 1000) > decoded.iat){
//             return next(new Error(`expired token , plz login`,{cause:400}));
//         }

       

     
//         if(!accessRoles.includes(user.role)){
//             return res.status(403).json({message:"not auth user"});
//            }
           
       
//        req.user = user;
//         next();
//     }
// }