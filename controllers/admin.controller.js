const SellerModel =require("../models/admin.model")
exports.create= (req , res)=>{
    const p = new SellerModel(req.body)
    p.save()
    .then(resultat=>{
       res.send(resultat) 
    })
    

        
     

}