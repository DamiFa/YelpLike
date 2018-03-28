var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/* Campground.create(
    {
        name: "Flots Bleus", 
        image:"https://i.imgur.com/T0ha8mA.jpg",
        description: "Bon camping pour les beaufs, un monop pas loin avec du ricard pour le p'ti dej'"
    }, 
    function(err, cg){
        err ? console.log(err) : console.log("Campground Created", cg);
    }
); */

app.get("/", function(req, res){
    res.render('landing');
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    // get data from forms and add to campgrounds array
    if(req.body.name){
        var name = req.body.name;
        var image = req.body.imageUrl || "http://www.tourniagara.com/wp-content/uploads/2014/10/default-img.gif";
        var description = req.body.description;
        var newCampground = {name: name, image: image, description: description};
        
        Campground.create(newCampground, function(err, newCreation){
            if(err){
                console.log(err);
            }
            else{
                console.log("New Campground Added:", newCreation);
            }
        });
    }

    // reroute back to get campgrounds
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(res, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{campground:campground});
        }
    })

});

app.listen(3000, function(){
    console.log("YelpCamp READY !!");
});