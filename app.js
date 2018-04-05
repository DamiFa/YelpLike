var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    Campground      = require('./models/campground.js'),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seed"),
    app             = express();

// seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

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

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
    res.render('landing');
});

// =====================
// = CAMPGROUNDS ROUTE =
// =====================

// INDEX
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

// CREATE
app.post("/campgrounds", function(req, res){
    // get data from forms and add to campgrounds array
    if(req.body.name){
        var name = req.body.name;
        var image = req.body.imageUrl || "http://www.tourniagara.com/wp-content/uploads/2014/10/default-img.gif";
        var description = req.body.description;
        var newCampground = {name: name, image: image, description: description};
        
        Campground.create(newCampground, function(err, newCreation){
            if(err) console.log(err);
            else console.log("New Campground Added:", newCreation);
        });
    }

    res.redirect("campgrounds/index");
});

// NEW
app.get("/campgrounds/new", function(res, res){
    res.render("campgrounds/new");
});

// SHOW
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate('comments').exec(function(err, campground){
        if(err) console.log(err);
        else{
            res.render("campgrounds/show",{campground:campground});
        }
    });
});

// =====================
// =  COMMENTS ROUTE   =
// =====================

// NEW
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) console.log(err);
        else res.render("comments/new", {campground:campground});
    });
});

// CREATE
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) console.log(err);
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err) console.log(err);
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// =====================
// =    AUTH ROUTES    =
// =====================
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    var  newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post(
    "/login", 
    passport.authenticate(
        "local", {
            successRedirect:"/campgrounds",
            failureRedirect:"/login"
        }
    ), 
    function(req, res){

});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

// START SERVER
app.listen(3000, function(){
    console.log("YelpCamp READY !!");
});