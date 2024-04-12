import express from 'express';
import { addProduct, deleteProduct, getAllProductsAdmin, getProductsFromCategories } from '../controllers/products.js';
import { verifyToken } from '../config/verify.js';
import upload from '../config/upload.js'

const router = express.Router();

router.get('/',(req,res) => {
    
    const category_id = req.query.categoryId;

    getProductsFromCategories(category_id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

//Admin routes
//To fetch all products
router.get('/admin/products',[verifyToken], (req,res) => {
    getAllProductsAdmin().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a new product
router.post('/admin/addProduct',[verifyToken,upload.single("product_image")],(req,res) => {
    const product = {
        product_name:req.body.product_name,
        categories:JSON.parse(req.body.categories),
        product_image:req.file.location
    }
      addProduct(product).then((result) => {
          res.status(200).json(result)
      }).catch((err) => {
          res.status(500).json("Internal server error")
      })
})

//To delete a product
router.post('/admin/deleteProduct',[verifyToken], (req,res) => {
    const product_id = req.body.product_id
     deleteProduct(product_id).then((result) => {
         res.status(200).json(result)
     }).catch((err) => {
         res.status(500).json("Internal server error")
     })
})

export default router;