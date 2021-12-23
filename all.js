import express from 'express'
var router = express.Router();

import { MDBlob } from "./MDBlob.js"

router.purge("/", (req,res)=>{
    MDBlob.deleteMany({}, ()=>{res.json("OK")})
})

export default router