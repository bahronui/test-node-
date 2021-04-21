const mongoose = require('mongoose');

//definition du schema

const UserSchema= mongoose.Schema({
 

 
    nom: {
        type: String,
        require: true,
        trim: true , 
        

    },
    prenom: {
        type: String,
      //  require: true,
      //  trim: true , 
        

    },
    phone: {
        type: Number,
       // require: true,
      //  trim: true , 
        

    },
    genre: {
        type: String,
      //  require: true,
      //  trim: true , 
        

    },

    email:
    {
        type: String,
        require: true,
        trim: true,
    
    },
    photoURL: {
        type: String,
        require: true,
        trim: true
    },
    point: {
        type: Number,
        require: true,
        trim: true , 

        default:0 
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    adress: {
        type: String,
       require: true,
       trim: true
    },

  
   orders: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'order' }
    ],
    resetLink:{
        type:String,
        default:""
    
    },
},

{
  timestamps: true
}
)

//exportation  du schema
module.exports = mongoose.model('User' , UserSchema)


