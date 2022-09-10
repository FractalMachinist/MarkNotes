import express from "express";
import path from "path";
import { nextTick } from "process";
var router = express.Router();

var pathOptions = {root: path.join("./templates")};

router.get("/:template", (req, res, next) => {
    var fileName = req.params.template + ".md"
    res.sendFile(fileName, pathOptions, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName)
        }
    })
})

export default router