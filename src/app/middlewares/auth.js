import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth'

function autoMiddleware(request, response, next){
    const authToken = request.headers.authorization;
    if(!authToken){
        return response.status(401).json({ error: 'token not provided'})
    }
    const token = authToken.split(' ').at(1);

    try{
        jwt.verify(token, authConfig.secret, (err, decoded) =>{
            if(err){
                throw new Error()
            }

            request.userId = decoded.id;
            request.userName = decoded.name;
            return next();
        });
    }catch(err){
        return response.status(401).json({ error: 'token é invalido'})
    }

}



export default autoMiddleware;