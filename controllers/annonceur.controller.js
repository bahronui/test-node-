const SellerModel =require("../models/annonceur.model")
exports.create= (req , res)=>{
    const p = new SellerModel(req.body)
    p.save()
    .then(resultat=>{
       res.send(resultat) 
    })
    
}
exports.update= (req , res)=>{
    var id = req.params.id;
    SellerModel.updateOne({_id : id} , req.body)
    .then((result)=>{
        res.send(result)
    })
  

}