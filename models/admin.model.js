
var mongoose= require("mongoose");
const user=require("./user.model")
//l'héritage nous permet d'eviter le gspillage de la memoire 
const Admin = user.discriminator('Admin',new mongoose.Schema({  //importer tous les données de annonceur
    admin:{ 
        type:String,
    },
    nometb: {
        type: String,
        require: true,
        trim: true
    },
    mail: {
        type: String,
        require: true,
        trim: true
    },
    instagram: {
        type: String,
        
    },
    facebook: {
        type: String,
       
    },
    WhatsApp:{
        type:String
    },
    raison: {
        type: String,
        default:""
    },
    num_jur: {
        type: String,
        default:""
    },
    
})
);
module.exports=Admin;