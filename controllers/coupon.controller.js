
const coupon= require('../models/coupon.model');
exports.getAll = (req , res)=>{

    coupon.find({
    
    })
    .then(resultat=>{
        res.send(resultat)
    }

    )

}


exports.create = (req, res)=>{
    const p = new coupon(req.body)
    p.save()
    .then(resultat=>{
       res.send(resultat) 
    })
}

exports.update = (req, res)=>{
    var id = req.params.id;
    coupon.updateOne({_id : id} , req.body)
    .then((result)=>{
        res.send(result)
    })
    
}

exports.delete = (req,res)=>{

    var id = req.params.id;
    coupon.remove({_id : id})
    .then((result)=>{
        res.send(result)
    })
    
   
}
exports.getById = (req, res) => {

    var id = req.params.id;
    coupon.findOne({_id: id })
        .then((result) => {
            res.send(result);
        })
}
exports.getByid_user = (req , res)=>{

   var id = req.params.id;
    coupon.find({user_id: id})
    .then((result)=>{
        res.send(result);
    })
}
exports.getByid_annonceur = (req , res)=>{

    var id = req.params.id;
    coupon.find({id_annonceur: id})
    .then((result)=>{
        res.send(result);
    })
}
exports.getByidannonce = (req , res)=>{

    var id = req.params.id;
    coupon.find({idannonce: id})
    .then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}