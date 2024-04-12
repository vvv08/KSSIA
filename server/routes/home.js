import express from 'express';
import { getCounts } from '../controllers/home.js';

const router = express.Router();

router.get('/',(req,res) => {
    getCounts().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("Internal server error")
    })
})

export default router;