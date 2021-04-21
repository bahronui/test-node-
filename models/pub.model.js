const mongoose = require('mongoose');

//definition du schema

const PubSchema= mongoose.Schema({
 
     
    description : String, 
    image : String,
})

//exportation  du schema
module.exports = mongoose.model('publicite' , PubSchema)