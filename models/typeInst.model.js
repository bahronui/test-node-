const mongoose = require('mongoose');

//definition du schema

const TypeInstSchema = mongoose.Schema({

    //_id:String, 
    description: String,

}, {
    timestamps: true
})

//exportation  du schema
module.exports = mongoose.model('TypeInst', TypeInstSchema)