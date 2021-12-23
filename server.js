import express from 'express'
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

app.use(express.json())
app.use(express.urlencoded())

import route_all from "./all.js"
import route_record from "./record.js"
import route_aggregate from "./aggregate.js"




function main(){
    app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

    // create a GET route
    app.get('/express_backend', (req, res) => { //Line 9
        res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT V4' }); //Line 10
    }); //Line 11

    app.use("/all", route_all)
    app.use("/record", route_record)
    app.use("/aggregate", route_aggregate)











}

main();





