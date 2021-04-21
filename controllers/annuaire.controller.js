
const annuaire= require('../models/annuaire.model');
exports.getAll = (req , res)=>{

    annuaire.find({})
    .then(resultat=>{
        res.send(resultat)
    }

    )

}

exports.create = (req, res)=>{
    const p = new annuaire(req.body)
    p.save()
    .then(resultat=>{
       res.send(resultat) 
    })
}

exports.update = (req, res)=>{
    
    var id = req.params.id;
    annuaire.updateOne({_id : id} , req.body)
    .then((result)=>{
        res.send(result)
    })
   
}

exports.delete_annuaire = (req,res)=>{
    var id = req.params.id;
    annuaire.remove({_id : id})
    .then((result)=>{
        res.send(result)
    })
}