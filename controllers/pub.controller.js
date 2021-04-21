
const pub= require('../models/pub.model');
exports.getAll = (req , res)=>{

    pub.find({})
    .then(resultat=>{
        res.send(resultat)
    }

    )

}

exports.create = (req, res)=>{
    const p = new pub(req.body)
    p.save()
    .then(resultat=>{
       res.send(resultat) 
    })
}

exports.update = (req, res)=>{
    
    var id = req.params.id;
    pub.updateOne({_id : id} , req.body)
    .then((result)=>{
        res.send(result)
    })
   
}

exports.delete = (req,res)=>{
    var id = req.params.id;
    pub.remove({_id : id})
    .then((result)=>{
        res.send(result)
    })
}