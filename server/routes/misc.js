import express from 'express';
import { getDistricts } from '../controllers/misc.js';
import { verifyToken } from '../config/verify.js';

const router = express.Router();

router.get('/',(req,res) => {
    getDistricts().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

//Route when API called from admin panel
router.get('/admin',[verifyToken],(req,res) => {
    getDistricts().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

export default router;