import express from 'express';
import { addCategory, deleteCategory, getAllCategoriesAdmin, getCategories } from '../controllers/categories.js';
import { verifyToken } from '../config/verify.js';
import upload from '../config/upload.js'

const router = express.Router();

router.get('/',(req,res) => {
    getCategories().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
});

//Rouets for admin
//To fetch all categories
router.get('/admin/categories',[verifyToken],(req,res) => {
    getAllCategoriesAdmin().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a category
router.post('/admin/addCategory',[verifyToken,upload.single("category_image")],(req,res) => {
    const category_name = req.body.category_name;
    const category_image = req.file.location
    console.log(category_image,category_name)
     addCategory(category_name,category_image).then((result) => {
         res.status(200).json(result)
     }).catch((err) => {
         res.status(500).json("Internal server error")
     })
})

//To delete a category
router.post('/admin/deleteCategory',[verifyToken],(req,res) => {
    const category_id = req.body.category_id;
    deleteCategory(category_id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

export default router;