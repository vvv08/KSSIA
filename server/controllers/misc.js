import { db } from "../config/connection.js"

export const getDistricts = () => {
    return new Promise (async (resolve,reject) => {
        try{
            const result = await db.query("SELECT * FROM districts;");
            resolve(result[0])
        }catch(err){
            reject(err)
        }
    })
}