const mongoose = require('mongoose');

//definition du schema

const Annoncechema = mongoose.Schema({
    //_id:String, 
   // _id:String , 
    titre: String ,
    description: String,
    annuaire : String,
    prix : Number,
    GPS :String , 
    coupondisp: Number,
    dat_exp : Date,
    
    images : [String],
    devise :String, 
    point : Number , 
    nbjour:Number , 
    region : String, 
    pays : String , 
    reduction: Number ,
    address:String , 
    type_Inst:String , 
    id_annonceur:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    valide:{
        type:Boolean,
        default:false
    }

}, {
    timestamps: true
})

//exportation  du schema
module.exports = mongoose.model('Annonce' , Annoncechema)