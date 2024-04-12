import express from 'express';
import { addCompany, deleteCompany, editCompany, getAboutCompany, getAllCompanies, getAllCompaniesAdmin, getAllProductsLink, getCompaniesByProduct, getCompanyDetailsEdit, linkProduct, unLinkProduct } from '../controllers/companies.js';
import { verifyToken } from '../config/verify.js';
import upload from '../config/upload.js';
const router = express.Router();

//Router to get all companies for companies tab
router.get('/',(req,res) => {

    const district = req.query.district;

    getAllCompanies(district).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

//Router for data on single company
router.get('/aboutCompany',(req,res) => {

    const company_id = req.query.companyId;

    getAboutCompany(company_id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

//Router to get data on companies based on product
router.get('/productCompanies',(req,res) => {

    const product_id = req.query.productId;
    const district = req.query.district;

    getCompaniesByProduct(product_id,district).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

//Routes for Admin
//To fetch all companies
router.get('/admin/companies',[verifyToken],(req,res) => {
    getAllCompaniesAdmin().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a company
router.post('/admin/add',[verifyToken,upload.single('company_image')],(req,res) => {
    let company_details = {
        company_name:req.body.company_name,
        district:req.body.district,
        company_about:req.body.company_about,
        company_address:req.body.company_address,
        //If we do not do this, we will not get an array
        keywords:req.body.keywords.split(','),
        contacts:req.body.contacts.split(','),
        company_website:req.body.company_website,
        company_image:req.file.location
    }
     addCompany(company_details).then((result) => {
         res.status(200).json(result)
     }).catch((err) => {
         res.status(500).json(err)
     })
})

//To delete a company
router.post('/admin/delete',[verifyToken],(req,res) => {
    const comp_id = req.body.comp_id;
       deleteCompany(comp_id).then((result) => {
           res.status(200).json(result);
       }).catch((err) => {
           res.status(500).json(err);
       })
})

//To get company details for edit
router.get('/admin/GetEditCompany',[verifyToken],(req,res) => {
    const comp_id = req.query.companyId
    getCompanyDetailsEdit(comp_id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

router.get('/admin/aboutCompany',[verifyToken],(req,res) => {

    const company_id = req.query.companyId;

    getAboutCompany(company_id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

//Edit the company
router.post('/admin/editCompany',[verifyToken , upload.single('company_image')],(req,res) => {
    let company_details = {
        company_id : req.body.company_id,
        company_name:req.body.company_name,
        district:req.body.district,
        company_about:req.body.company_about,
        address:req.body.address,
        //If we do not do this, we will not get an array
        keywords:req.body.keywords.split(','),
        contacts:req.body.contacts.split(','),
        company_website:req.body.company_website,
        company_image:req.file ? req.file.location : req.company_image
    }
    editCompany(company_details).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

//To fetch unlinked products by company
router.get('/admin/unlinked',[verifyToken],(req,res) => {
    const comp_id = req.query.companyId;
    getAllProductsLink(comp_id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

//To unlink a product from a company
router.post('/admin/unlinkProduct',[verifyToken],(req,res) => {
    const comp_id = req.body.comp_id;
    const product_id = req.body.product_id;
    unLinkProduct(comp_id,product_id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To link a product to a company
router.post('/admin/linkProduct',[verifyToken],(req,res) => {
    const comp_id = req.body.comp_id;
    const product_id = req.body.product_id;
    linkProduct(comp_id,product_id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})
export default router;