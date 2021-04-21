
const type= require('../models/typeInst.model');
exports.getAll = (req , res)=>{

    type.find({
    
    })
    .then(resultat=>{
        res.send(resultat)
    }

    )

}


exports.create = (req, res)=>{
    const p = new type(req.body)
    p.save()
    .then(resultat=>{
       res.send(resultat) 
    })
}

exports.update = (req, res)=>{
    var id = req.params.id;
    type.updateOne({_id : id} , req.body)
    .then((result)=>{
        res.send(result)
    })
    
}

exports.delete = (req,res)=>{

    var id = req.params.id;
    type.remove({_id : id})
    .then((result)=>{
        res.send(result)
    })
    
   
}
exports.getById = (req , res)=>{

    var id = req.params.id;
    type.findOne({_id : id})
    .then((result)=>{
        res.send(result);
    })
}
