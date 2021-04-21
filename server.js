//importation
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const multipart = require('connect-multiparty');
const multipartMiddleware = 
multipart({uploadDir : './uploads'})
const passport = require('passport')

const session = require('express-session')

const User = require('./models/user.model copy')

const facebookStrategy = require('passport-facebook').Strategy

require('dotenv').config()
const cookieSession = require('cookie-session')
require('./passport-setup');
//initialisation
const app = express();
app.use(bodyparser.json())
app.use(cors());

app.use(express.static('./'))
mongoose.connect('mongodb://127.0.0.1:27017/csplusannonce'
    , { useNewUrlParser: true })
    .then(() => {
        console.log('mongo connected')
    }).catch((err) => {
        console.log(err);
    })

//traitement
/*
app.get('/', (req, res) => {
    res.send("ok")
})*/

app.post('/upload' , multipartMiddleware , (req , res)=>{
    var files = req.files.uploads;
    res.send(files[0])
})

require('./routes')(app);

//execution
app.listen(5000, (err, success) => {
    if (err) {
        console.log(err) //catch
    } else {
        console.log("server listen on port http://localhost:5000") //then
    }
})


// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

app.set("view engine","ejs")

app.use(session(
    
    { 
        resave:true , 
    saveUninitialized:true, 
    
     secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
    app.use(passport.session()); 

passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
   // pull in our app id and secret from our auth.js file
   clientID        : "759021334974321",
   clientSecret    : "7d3b95aaf1777e29a530444054216c01",
   callbackURL     : "http://localhost:5000/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

        // find the user in the database based on their facebook id
        User.findOne({ 'uid' : profile.id }, function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);

            // if the user is found, then log them in
            if (user) {
                console.log("user found")
                console.log(user)
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                var newUser            = new User();

                // set all of the facebook information in our user model
                newUser.uid    = profile.id; // set the users facebook id                   
                newUser.token = token; // we will save the token that facebook provides to the user                    
                newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                newUser.gender = profile.gender
                newUser.pic = profile.photos[0].value
                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                        throw err;

                    // if successful, return the new user
                    return done(null, newUser);
                });
            }

        });

    })

}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.get('/profile', isLoggedIn, function(req, res) {
    console.log(req.user)
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
});



app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
app.get('/',(req,res) => {
    res.render("index")
})

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) =>{
    res.render("profileg",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);
