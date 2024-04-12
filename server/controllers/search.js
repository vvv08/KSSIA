import { db } from "../config/connection.js";

export const getSearchResults = (term,district) => {
    return new Promise (async (resolve,reject) => {
        let q1 = ""
        if(district === ""){
            q1 = `select r.company_id, c.company_name, c.company_image, c.address, c.company_about, c.company_url, c.district from (select company_id from keywords where keyword like "%${term}%" group by company_id) as r inner join companies as c on r.company_id = c.company_id;`
        }else{
            q1 = `select r.company_id, c.company_name, c.company_image, c.address, c.company_about, c.company_url, c.district from (select company_id from keywords where keyword like "%${term}%" group by company_id) as r inner join companies as c on r.company_id = c.company_id where c.district = "${district}";`
        }
        try{
            const result1 = await db.query(q1);
            const result2 = await db.query(`select r.product_id as id,p.product_name as name, p.product_image as image from products as p inner join (select product_id from product_category where category_id in (select category_id from product_category where product_id in (select product_id from product_company where company_id in (select company_id from keywords where keyword like "%${term}%" group by company_id) group by product_id) group by category_id) group by product_id) as r on r.product_id = p.product_id;`);
            const result3 = await db.query(`select product_id as id, product_name as name, product_image as image from products where product_name like "%${term}%";`);
            resolve([].concat([result1[0]],[result2[0]],[result3[0]]));
        }catch(err){
            reject(err)
        }
    })
}