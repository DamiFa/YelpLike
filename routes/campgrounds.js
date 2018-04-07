var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// Pour mieux organiser le code on peut déplacer nos routes dans d'autres fichiers 
// Il faut require dans chaque fichier de routes les dépendances requise, ici on a besoin de express et du model Campground
// On associe les routes à un objet express : Router()
// On exporte ensuite la variable contenant le Router
// On peut aussi limiter la répétition en indiquant là où on require nos routes (dans app.js) que ces routes là sont appelées avec /campgrouds devant
    // campgroundRoutes = require(./routes/campgrounds)
    // app.use("/campgrounds",campgroundRoutes);

// INDEX
router.get("/", function(req, res){
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
router.post("/", isLoggedIn, function(req, res){
    // get data from forms and add to campgrounds array
    if(req.body.name){
        var name = req.body.name;
        var image = req.body.imageUrl || "http://www.tourniagara.com/wp-content/uploads/2014/10/default-img.gif";
        var description = req.body.description;
        var author = {
            id: req.user._id,
            username: req.user.username
        };

        var newCampground = {
            name: name, 
            image: image, 
            description: description, 
            author: author
        };
        
        Campground.create(newCampground, function(err, newCreation){
            if(err) console.log(err);
            else console.log("New Campground Added:", newCreation);
        });
    }

    res.redirect("/campgrounds");
});

// NEW
router.get("/new", isLoggedIn, function(res, res){
    res.render("campgrounds/new");
});

// SHOW
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate('comments').exec(function(err, campground){
        if(err) console.log(err);
        else{
            res.render("campgrounds/show",{campground:campground});
        }
    });
});

// EDIT
router.get("/:id/edit", checkOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE
router.put("/:id", checkOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err) console.log(err);
        else res.redirect("/campgrounds/" + updatedCampground._id);
    });
});

// DESTROY
router.delete("/:id", checkOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) redirect("/campgrounds");
        else redirect("/campgrounds");
    });
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

function checkOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err) res.redirect("back");
            else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else res.redirect("back");
            }
        });
    }
    else res.redirect("/login");
}

module.exports = router;