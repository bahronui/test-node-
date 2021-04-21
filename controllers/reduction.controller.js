
const reduction= require('../models/reductions.model');
exports.getAll = (req , res)=>{

    reduction.find({})
    .then(resultat=>{
        res.send(resultat)
    }

    )

}

exports.create = (req, res)=>{
    const p = new reduction(req.body)
    p.save()
    .then(resultat=>{
       res.send(resultat) 
    })
}

exports.update = (req, res)=>{
    
    var id = req.params.id;
    reduction.updateOne({_id : id} , req.body)
    .then((result)=>{
        res.send(result)
    })
   
}

exports.delete = (req,res)=>{
    var id = req.params.id;
    reduction.remove({_id : id})
    .then((result)=>{
        res.send(result)
    })
}
exports.getbyIduser = (req , res)=>{

    var id = req.params.id;
    reduction.find( {user_id : id})
    .then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}

exports.getById = (req, res) => {

    var id = req.params.id;
    reduction.findOne({ _id: id })
        .then((result) => {
            res.send(result);
        })
}
