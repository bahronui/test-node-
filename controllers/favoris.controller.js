const FavorisyModel = require("../models/favoris.model")//pour faire l'appel d'un entite pour exploiter ses attributs
module.exports = {
    create: function (req, res) {

        console.log("body ", req.body)
        const Gallery = new FavorisyModel(req.body)
        Gallery.save(function (err, item) {
            res.json(item)
        })

    },
    read: function (req, res) {
        FavorisyModel.find({}, function (err, items) {
            res.json(items)

        })

    },
    delete: function (req, res) {
        FavorisyModel.findByIdAndDelete({ _id: req.params.id }, function (err, item) {
            res.json({
                msg: "favoris deleted with success"
            })

        })
    },

    update: function (req, res) {
        FavorisyModel.findByIdAndDelete({ _id: req.params.id }, req.body, function (err, item) {


            res.json(item)

        })
    }

}