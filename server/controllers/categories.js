import { db } from "../config/connection.js"

export const getCategories = () => {
    return new Promise(async (resolve,reject) => {
        try{
            const result = await db.query("SELECT category_id as id, category_image as image, category_name as name FROM categories ORDER BY RAND();")
            resolve(result[0])
        }catch(err){
            reject(err)
        }
    })
}

//Admin
//To fetch all categories
export const getAllCategoriesAdmin = () => {
    return new Promise(async (resolve,reject) => {
        try{
            const result = await db.query("SELECT category_id AS id, category_name AS name, category_image AS image FROM categories;");
            resolve(result[0]);
        }catch(err){
            reject(err)
        }
    })
}

//To add a catgeory
export const addCategory = (category_name,category_image) => {
    return new Promise(async (resolve,reject) => {
        try{
            const result = await db.query(`INSERT INTO categories (category_name,category_image) VALUES ("${category_name}","${category_image}");`);
            const insertedCategory = {
                category_id:result[0].insertId,
                category_name:category_name,
                category_image:category_image
            }
            resolve(insertedCategory)
        }catch(err){
            reject(err)
        }
    })
}

//To delete a category
export const deleteCategory = (category_id) => {
    return new Promise(async (resolve,reject) => {
        try{
            const [[category]] = await db.query(`SELECT * FROM categories WHERE category_id = ${category_id};`);
            const result1 = await db.query(`DELETE FROM product_category WHERE category_id = ${category_id};`);
            const result2 = await db.query(`DELETE FROM products WHERE product_id NOT IN (SELECT product_id FROM product_category GROUP BY product_id);`)
            const result3 = await db.query(`DELETE FROM product_company WHERE product_id NOT IN (SELECT product_id FROM product_category GROUP BY product_id);`)
            const result4 = await db.query(`DELETE FROM categories WHERE category_id = ${category_id};`)
            resolve(category)
        }catch(err){
            reject(err)
        }
    })
}