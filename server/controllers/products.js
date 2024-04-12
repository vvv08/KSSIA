import { db } from "../config/connection.js";

//To fetch the products coming under selected category
export const getProductsFromCategories = (category_id) => {
    return new Promise(async (resolve,reject) => {
        try{
            const result = await db.query(`select product_id as id, product_name as name, product_image as image from products where product_id in (select product_id from product_category where category_id = ${category_id});`);
            resolve(result[0])
        }catch(err){
            reject(err)
        }
    })
}

//Admin
//To fetch all products
export const getAllProductsAdmin = () => {
    return new Promise(async (resolve,reject) => {
        try{
            const result = await db.query("select p.product_id as id, p.product_name as name, p.product_image as image ,JSON_ARRAYAGG(c.category_name) as category_name from products p,product_category pc,categories c where p.product_id=pc.product_id and pc.category_id=c.category_id group by pc.product_id;");
            resolve(result[0])
        }catch(err){
            reject(err)
        }
    })
}

//To add a new product
export const addProduct = (product) => {
    return new Promise(async (resolve,reject) => {
        try{
            const product_name = product.product_name;
            const product_image = product.product_image;
            const categories = product.categories;
            const result = await db.query(`INSERT INTO products (product_name,product_image) VALUES ("${product_name}", "${product_image}");`);
            const insertedId = result[0].insertId;
              categories.map(async (category) => {
                  await db.query(`INSERT INTO product_category (category_id,product_id) VALUES (${category},${insertedId});`)
              })
            const insertedProduct = {
                product_id:result[0].insertId,
                product_name,
                product_image,
                categories
            }
            resolve(insertedProduct)
        }catch(err){
            console.log(err)
            reject(err)
        }
    })
}

//To delete a product
export const deleteProduct = (product_id) => {
    return new Promise(async (resolve,reject) => {
        try{
            const [[product]] = await db.query(`SELECT * FROM products WHERE product_id = ${product_id};`)
            const result = await db.query(`DELETE FROM product_category WHERE product_id = ${product_id};`);
            const result2 = await db.query(`DELETE from product_company WHERE product_id = ${product_id};`)
            const result3 = await db.query(`DELETE FROM products WHERE product_id = ${product_id};`)
            resolve(product)
        }catch(err){
            reject(err)
        }
    })
}