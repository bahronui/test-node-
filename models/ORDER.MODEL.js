const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  /*  name: {
        type: String,
        require: true,
        trim: true
    },*/
    prix: {
        type: String,
        require: true,
        trim: true
    },
    Qte: {
        type: Number , 
        default:0 
    },

    description:
    {
        type: String,
        require: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'

    },
    Annonces: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'annonce' }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);