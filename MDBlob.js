import mongoose from 'mongoose'
export const MaxKey = mongoose.mongo.MaxKey

// mongoose.set('debug', true)
const MongoDBUrl = `mongodb://localhost:27017/db`

const MongoDBAuth = {
    auth:{
        username:process.env.MONGO_INITDB_ROOT_USERNAME, 
        password:process.env.MONGO_INITDB_ROOT_PASSWORD
    },
    authSource:"admin"
}

const mongoose_con = mongoose.connect(MongoDBUrl, MongoDBAuth)

function ValidateHeaderArray(headers){
    return headers.every((header)=>{
        return (typeof header === 'string') || (header instanceof MaxKey)
    })
}

const MDBlobSchema = new mongoose.Schema({
    headers:{type: [{}], validate: [ValidateHeaderArray, "Submitted Headers *MUST* be strings; queried headers *MUST* be strings or locally-inserted MaxKey"]},
    date:{type: Date},
    MDText:String,
    children:[mongoose.ObjectId]
})

MDBlobSchema.index({headers: 1, date: -1})


export const MDBlob = mongoose.model("MDBlob", MDBlobSchema);

