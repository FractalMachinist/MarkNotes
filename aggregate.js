import express from 'express'
var router = express.Router();

import { MDBlob, MaxKey } from "./MDBlob.js"

function ConstructAggregateQueryObj(headers){
    if(!Array.isArray(headers)){headers = [headers]}
    return {"headers": {$gte: headers, $lte: [...headers, MaxKey()]}, "MDText": {$ne: ""}} // This is bad and should maybe be easy?
    // return Object.fromEntries(headers.map((header, index) => [`headers.${index}`, header]))
}


router.get("/", async(req, res) => {
    console.log("Aggregate Get w/ query headers:", req.query.headers)
    MDBlob.find(ConstructAggregateQueryObj(req.query.headers)).sort({date: -1}).then(res.json.bind(res))
})

router.delete("/", (req,res)=>{
    MDBlob.deleteMany(ConstructAggregateQueryObj(req.query.headers), ()=>{res.json("OK")})
})


export default router