import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/connection.js';
import 'dotenv/config';

//Login
export const login = (user) => {
    return new Promise (async (resolve,reject) => {
        try{
            const [result] = await db.query(`SELECT * FROM admin WHERE username = "${user.username}";`)
            if(result ===  null || result.length === 0 ) reject("User not found");
            let hpass = result[0].password
            let isPasswordCorrect = await bcrypt.compare(user.password,hpass)
            if(!isPasswordCorrect) reject("Incorrect Password")
            let token = jwt.sign({user:user.username},process.env.SECRETE_KEY,{expiresIn:'12h'})
            resolve(token)
        }catch(err){
            reject(err)
        }
    })
}

//Logout
