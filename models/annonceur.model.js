
var mongoose= require("mongoose");
const user=require("./user.model")
//l'héritage nous permet d'eviter le gspillage de la memoire 
const Annonceur = user.discriminator('Annonceur',new mongoose.Schema({  //importer tous les données de annonceur
   
    nometb: {
        type: String,
        require: true,
        trim: true ,
      
    },
    mail: {
        type: String,
        require: true,
        trim: true ,
    },
    instagram: {
        type: String,
        require: true,
        trim: true ,
        default:""
    },
    facebook: {
        type: String,
        require: true,
        trim: true ,
        default:""
       
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
module.exports=Annonceur;