import express from 'express'
var router = express.Router();

import { MDBlob } from "./MDBlob.js"

router.get("/headers", (req,res)=>{
    // MDBlob.distinct('headers').then(res.json.bind(res))
    MDBlob.find().select('headers').then((m) => {
        // console.log(m)
        var hSet = [...new Set(m.map(k => k.headers.join("#")))].map(l => l.split("#").reverse()).sort()
        console.log(hSet)
        return hSet
    }

    ).then(res.json.bind(res))
})

router.purge("/", (req,res)=>{
    MDBlob.deleteMany({}, ()=>{res.json("OK")})
})

export default router