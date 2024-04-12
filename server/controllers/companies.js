import { db } from "../config/connection.js";

//Fetching all companies for Companies tab
export const getAllCompanies = (district) => {
  return new Promise(async (resolve, reject) => {
    let q = "";
    if (district === "") {
      q = `SELECT company_id as id, company_name as name, company_image as image, company_about, address, company_url FROM companies ORDER BY RAND();`;
    } else {
      q = `SELECT company_id as id, company_name as name, company_image as image, company_about, address, company_url FROM companies WHERE district = "${district}" ORDER BY RAND();`;
    }
    try {
      const result = await db.query(q);
      resolve(result[0]);
    } catch (err) {
      reject(err);
    }
  });
};

//Fetching details of a single company including its products
export const getAboutCompany = (company_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result1 = await db.query(
        `SELECT * FROM companies WHERE company_id = ${company_id};`
      );
      const result2 = await db.query(
        `SELECT contact FROM contact WHERE company_id = ${company_id}`
      );
      const result3 = await db.query(
        `SELECT p.* FROM products as p INNER JOIN (SELECT product_id FROM product_company WHERE company_id = ${company_id}) as r ON r.product_id = p.product_id;`
      );
      resolve([].concat(result1[0], [result3[0]], result2[0]));
    } catch (err) {
      reject(err);
    }
  });
};

//Fetching companies for each product
export const getCompaniesByProduct = (product_id, district) => {
  return new Promise(async (resolve, reject) => {
    let q = "";
    if (district === "") {
      q = `SELECT c.*,p.product_id FROM product_company as p INNER JOIN companies as c ON p.company_id = c.company_id WHERE p.product_id = ${product_id};`;
    } else {
      q = `SELECT c.*,p.product_id FROM product_company as p INNER JOIN companies as c ON p.company_id = c.company_id WHERE p.product_id = ${product_id} AND c.district like "${district}";`;
    }
    try {
      const result = await db.query(q);
      resolve(result[0]);
    } catch (err) {
      reject(err);
    }
  });
};

//Admin funtionalities
//To fetch all companies
export const getAllCompaniesAdmin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.query(
        "SELECT company_id as id, company_name as name, company_image as image, company_about, address, company_url FROM companies;"
      );
      resolve(result[0]);
    } catch (err) {
      reject(err);
    }
  });
};

//To add a company
export const addCompany = ({
  company_name,
  company_image,
  company_about,
  company_address,
  company_website,
  district,
  contacts,
  keywords,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nkeyword = company_name.split(" ")[0];

      const result = await db.query(
        `INSERT INTO companies (company_name, company_image,company_about, address, company_url,district) VALUES ("${company_name}","${company_image}","${company_about}","${company_address}","${company_website}","${district}")`
      );

      let insertedCompany = {
        company_id: result[0].insertId,
        company_name,
        company_image,
        company_about,
        company_address,
        company_website,
        company_keywords: [],
        company_contacts: [],
        district,
      };

      contacts.map(async (contact) => {
        const result = await db.query(
          `INSERT INTO contact (contact,company_id) VALUES ("${contact}",${insertedCompany.company_id});`
        );
        //Not getting pushed
        insertedCompany.company_contacts.push(contact);
      });

      keywords.push(nkeyword);

      keywords.map(async (keyword) => {
        const result = await db.query(
          `INSERT INTO keywords (keyword, company_id) VALUES ("${keyword}",${insertedCompany.company_id});`
        );
        //Not getting pushed
        insertedCompany.company_keywords.push(keyword);
      });

      resolve(insertedCompany);
    } catch (err) {
      reject(err);
    }
  });
};

//To delete a company
export const deleteCompany = (comp_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[comp]] = await db.query(
        `SELECT * FROM companies WHERE company_id = ${comp_id};`
      );
      const result1 = await db.query(
        `DELETE FROM keywords WHERE company_id = ${comp_id};`
      );
      const result2 = await db.query(
        `DELETE FROM contact WHERE company_id = ${comp_id};`
      );
      const result4 = await db.query(
        `DELETE FROM product_company WHERE company_id = ${comp_id};`
      );
      const result3 = await db.query(
        `DELETE FROM companies WHERE company_id = ${comp_id};`
      );
      resolve({ status: "success", deleted_company: comp });
    } catch (err) {
      reject({ status: "error", error: err });
    }
  });
};

//To fetch company details including contact and keywords for editing
export const getCompanyDetailsEdit = (comp_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result1 = await db.query(
        `SELECT * FROM companies WHERE company_id = ${comp_id};`
      );
      const result2 = await db.query(
        `SELECT contact FROM contact WHERE company_id = ${comp_id};`
      );
      const result3 = await db.query(
        `SELECT keyword FROM keywords WHERE company_id = ${comp_id};`
      );
      const contacts = result2[0].map((obj) => obj.contact);
      const keywords = result3[0].map((obj) => obj.keyword);
      resolve([].concat(result1[0], [contacts], [keywords]));
    } catch (err) {
      reject(err);
    }
  });
};

//To edit the company
export const editCompany = ({
  company_id,
  company_name,
  company_about,
  company_image,
  company_website,
  address,
  district,
  contacts,
  keywords,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [[currVal]] = await db.query(
        "SELECT * FROM companies WHERE company_id= ?",
        [company_id]
      );
      if (!company_image) {
        company_image = currVal.company_image;
      }
      const result1 = await db.query(
        `UPDATE companies SET company_name = "${company_name}", company_about = "${company_about}", address = "${address}", company_image = "${company_image}", company_url = "${company_website}", district = "${district}" WHERE company_id = ${company_id};`
      );

      let insertedCompany = {
        company_id: company_id,
        company_name,
        company_image,
        company_about,
        address,
        company_website,
        company_keywords: [],
        company_contacts: [],
        district,
      };

      const result2 = db.query(
        `DELETE FROM contact WHERE company_id = ${company_id}`
      );
      contacts.map(async (contact) => {
        const result = await db.query(
          `INSERT INTO contact (contact,company_id) VALUES ("${contact}",${insertedCompany.company_id});`
        );
        //Not getting pushed
        insertedCompany.company_contacts.push(contact);
      });

      const result3 = db.query(
        `DELETE FROM keywords WHERE company_id = ${company_id}`
      );
      keywords.map(async (keyword) => {
        const result = await db.query(
          `INSERT INTO keywords (keyword, company_id) VALUES ("${keyword}",${insertedCompany.company_id});`
        );
        //Not getting pushed
        insertedCompany.company_keywords.push(keyword);
      });
      resolve(insertedCompany);
      resolve({
        company_id,
        company_name,
        company_image,
        address,
        company_website,
        contacts,
        company_about,
        keywords,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Fetch unlinked products to add/Link to company
export const getAllProductsLink = (comp_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.query(`select * from (select p.*,JSON_ARRAYAGG(c.category_name) as category_name from products p,product_category pc,categories c where p.product_id=pc.product_id and pc.category_id=c.category_id group by pc.product_id) r where r.product_id not in (select product_id from product_company where company_id = ${comp_id} group by product_id);`);
      resolve(result[0])
    } catch (err) {
      reject(err);
    }
  });
};

//To unlink a product
export const unLinkProduct = (comp_id,product_id) => {
  return new Promise(async (resolve, reject) => {
    try{
      const result = await db.query(`DELETE FROM product_company WHERE company_id = ${comp_id} AND product_id = ${product_id};`);
      resolve(result)
    }catch(err){
      reject(err)
    }
  })
}

//To link a product
export const linkProduct = (comp_id,product_id) => {
  return new Promise(async (resolve,reject) =>{
    try{
      const result = await db.query(`INSERT INTO product_company (company_id,product_id) VALUES (${comp_id},${product_id});`)
      resolve(result)
    }catch(err){
      reject(err)
    }
  })
}