const mongoose = require('mongoose');

//definition du schema

const annuaireSchema= mongoose.Schema({
 
  
    description : String,
    dateCrt:Date , 
    image : String,
})

//exportation  du schema
module.exports = mongoose.model('annuaire' , annuaireSchema)