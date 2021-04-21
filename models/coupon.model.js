const mongoose = require('mongoose');

const CouponSchema = mongoose.Schema({
    date_expire: {
        type: Date,
      //  require: true,
        trim: true
    },
    valider:{
        type:Boolean ,
        default:false,
    }, 
   /* datecreation: {
        type: String,
      //  require: true,
        trim: true
    },*/

    taux:
    {
        type: Number,
       // require: true,
        trim: true
    },
    id_annonceur: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'

    },
    idannonce: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Annonce'

    },
    user_id:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
    ,
    reductions: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Reduction',
            red: Number
        }
    ],
    prix: Number

}, {
    timestamps: true
});

module.exports = mongoose.model('coupon', CouponSchema);