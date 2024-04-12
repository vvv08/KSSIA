import { db } from "../config/connection.js"

export const getCounts = () => {
    return new Promise(async (resolve,reject) => {
        try{
            const result1 = await db.query("SELECT COUNT(product_id) as product_count FROM products;");
            const result2 = await db.query("SELECT COUNT(company_id) as company_count FROM companies;");
            const result3 = await db.query("SELECT COUNT(category_id) as category_count FROM categories;");
            resolve([].concat(result1[0],result2[0],result3[0]))
        }catch(err){
            reject(err)
        }
    })
}