var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require('./models/campground.js'),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seed"),
    app             = express();

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

// seedDB();

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://dami:password@ds241489.mlab.com:41489/yelp_camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATINO
app.use(require("express-session")({
    secret:"Trop une rebelle!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Donne à la requete de toutes les routes les donénes req.user
// Passe à la réponse (donc la page suivante) la requête (infos de la page précédente)
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes); 
//Quand on use des routes avec un path prédéfini dans lequel il y a un param il faut ajouter {mergeParams: true} dans le router de la route (ici comments)

// START SERVER
app.listen(process.env.PORT || 3000, process.env.IP ,function(){
    console.log("YelpCamp READY !!");
});