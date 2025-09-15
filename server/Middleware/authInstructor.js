import { config } from "dotenv";
import jwt from "jsonwebtoken"

export const Instructor = async (req,res,next) => {
    const header = req.headers.authorization || '';
    // const header = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4NmIyMjI3LTQ3ODItNDE4MS05YWM5LTA3MjlmMTlhZTFjYSIsInVzZXJuYW1lIjoiU2l2YWthcmFuIiwiZW1haWwiOiJwaXJhbnVzaXZhNjA5QGdtYWlsLmNvbSIsImlhdCI6MTc1Nzk0NDI2NSwiZXhwIjoxNzU3OTQ3ODY1fQ.eTaSMHI1vE-oH-lGC20qYScJP8KKl1__RpAMQL_Hyuk"
    const token = header.split(' ')[1];
    config();

    if(!token){
        return res.status(401).json({error: 'Invalid token'});
    }

    // const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    const payload = jwt.decode(token);
    req.instructorId = payload.id;
    next();

}