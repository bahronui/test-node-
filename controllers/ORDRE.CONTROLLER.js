
const order= require('../models/ORDER.MODEL');
exports.getAll = (req , res)=>{

    order.find({
    
    })
    .then(resultat=>{
        res.send(resultat)
    }

    )

}


exports.create = (req, res)=>{
    const p = new order(req.body)
    p.save()
    .then(resultat=>{
       res.send(resultat) 
    })
}

exports.update = (req, res)=>{
    var id = req.params.id;
    order.updateOne({_id : id} , req.body)
    .then((result)=>{
        res.send(result)
    })
    
}

exports.delete = (req,res)=>{

    var id = req.params.id;
    order.remove({_id : id})
    .then((result)=>{
        res.send(result)
    })
    
   
}
exports.getById = (req , res)=>{

    var id = req.params.id;
    order.findOne({_id : id})
    .then((result)=>{
        res.send(result);
    })
}
exports.getByUser = (req , res)=>{

    var id = req.params.id;
    order.find({user: id})
    .then((result)=>{
        res.send(result);
    })
}