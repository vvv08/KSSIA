import express from 'express';
import { getSearchResults } from '../controllers/search.js';

const router = express.Router();

router.get('/',(req,res) => {

    const term = req.query.searchTerm;
    const district = req.query.district;

    getSearchResults(term,district).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json("internal server error")
    })
})

export default router