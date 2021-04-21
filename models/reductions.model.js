const mongoose = require('mongoose');

const ReductionSchema = mongoose.Schema({
    //datecreation :Date , 
    util:Boolean , 
    taux :Number ,
    //_id:String , 
    idannonce: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Annonce'

    },
   // user_id: String
   user_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
    
   

}, {
    timestamps: true
});

module.exports = mongoose.model('Reduction', ReductionSchema);