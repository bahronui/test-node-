module.exports = (app)=> {
 
    const annonce = require('./controllers/annonce.controller')
    app.get('/annonces' , annonce.getAll );
    app.post('/annonce' , annonce.create );
    app.put('/annonce/:id' , annonce.update );
    app.delete('/annonce/:id' , annonce.delete );
    app.get('/annonce/:id' , annonce.getById );
    app.get('/annonce/:id', annonce.getByIdannonceur)

    // controleur de annuaire 
    const an = require('./controllers/annuaire.controller')
    app.get('/annuaires' , an.getAll );
    app.post('/annuaire' , an.create );
    app.put('/annuaire/:id' , an.update );
    app.delete('/annuaire/:id' , an.delete_annuaire);

    //contoleur de user 
const UserController = require('./controllers/user.controller')

app.put("/user/:id",UserController.update_user)
app.delete("/user/:id",UserController.delete_user)
app.post("/user",UserController.register)
app.get("/allusers",UserController.getAll_user)
app.get("/user/:id",UserController.getById)

//app.post("/loginn",UserController.authenticate)
app.post("/login",UserController.login)
app.post("/logout",UserController.logout)
app.post("/refreshToken",UserController.refreshToken)
app.put("/forgotpassword",UserController.forgotpassword)
app.post("/resetpassword",UserController.resetpassword)
// controleur de favoris
const favoris = require('./controllers/favoris.controller')
app.get('/favoris' , favoris.read );
app.post('/favori' , favoris.create );
app.put('/favori/:id' ,favoris.update );
app.delete('favori/:id' ,favoris.delete);
// controleur de coupon
const coupon = require('./controllers/coupon.controller')
app.get('/coupons' , coupon.getAll );
app.post('/coupon' , coupon.create );
app.put('/coupon/:id' ,coupon.update );
app.delete('/coupon/:id' , coupon.delete);
app.get('/coupon/:id' , coupon.getById);
app.get('/couponuser/:id' , coupon.getByid_user);
app.get('/couponannonceur/:id' , coupon.getByid_annonceur);//-
app.get('/couponannonce/:id' , coupon.getByidannonce);
//constroleur  réduction   --
const reduction = require('./controllers/reduction.controller')
app.put("/reduction/:id",reduction.update)
app.delete("/reduction/:id",reduction.delete)
app.post("/reduction",reduction.create)
app.get("/allreduction",reduction.getAll)
app.get("/getbyuserid/:id",reduction.getbyIduser)
app.get('/reduction/:id',reduction.getById)
 // controleur de Type inst  --
  const typeinst = require('./controllers/typeInst.controller')
  app.get('/types_inst' , typeinst.getAll );
  app.post('/type_inst' , typeinst.create );
  app.put('/type/:id' ,typeinst.update );
  app.delete('/type/:id' , typeinst.delete );
// controleur annonceur
const annonceur = require('./controllers/annonceur.controller')

app.post("/annonceur",annonceur.create)
app.put("/annonceur/:id",annonceur.update)


// controleur admin
const admin= require('./controllers/admin.controller')

app.post("/admin",admin.create)

// controleur de publicite 
const pub = require('./controllers/pub.controller')
app.get('/pub' , pub.getAll );
app.post('/pub' , pub.create );
app.put('/pub/:id' ,pub.update);
app.delete('pub/:id' , pub.delete);
// controlleur order 
const order = require('./controllers/ORDRE.CONTROLLER')
app.get('/orders' , order.getAll);
app.post('/order' , order.create);
app.put('/order/:id' ,order.update);
app.delete('order/:id' , order.delete);
app.get('/orders/:id' , order.getByUser);


}