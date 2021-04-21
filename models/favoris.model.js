const mongoose = require('mongoose');

const FavorisSchema = mongoose.Schema({
   
    idannonce: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Annonce'

    },
    user_id:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
    ,
   

}, {
    timestamps: true
});

module.exports = mongoose.model('Favori', FavorisSchema);