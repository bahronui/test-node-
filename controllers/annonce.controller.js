
const Annonce = require('../models/annonce.model');
exports.getAll = (req , res)=>{

    Annonce.find({
    
    })
    .then(resultat=>{
        res.send(resultat)
    }

    )

}


exports.create = (req, res)=>{
    const p = new Annonce(req.body)
    p.save()
    .then(resultat=>{
       res.send(resultat) 
    })
}

exports.update = (req, res)=>{
    var id = req.params.id;
    Annonce.updateOne({_id : id} , req.body)
    .then((result)=>{
        res.send(result)
    })
    
}

exports.delete = (req,res)=>{

    var id = req.params.id;
    Annonce.remove({_id : id})
    .then((result)=>{
        res.send(result)
    })
    
   
}
exports.getById = (req , res)=>{

    var id = req.params.id;
    Annonce.findOne({_id : id})
    .then((result)=>{
        res.send(result);
    })
}
exports.getByIdannonceur = (req , res)=>{

    var id = req.params.id;
    Annonce.find({id_annonceur: id})
    .then((result)=>{
        res.send(result);
    })
}