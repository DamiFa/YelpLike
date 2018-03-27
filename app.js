var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Saint Beauzille", image:"https://i.imgur.com/6sobH52.jpg"},
    {name: "Belle Ile", image:"https://i.imgur.com/8sGUpso.jpg"},
    {name: "Flots Bleus", image:"https://i.imgur.com/T0ha8mA.jpg"},
    {name: "Saint Beauzille", image:"https://i.imgur.com/6sobH52.jpg"},
    {name: "Belle Ile", image:"https://i.imgur.com/8sGUpso.jpg"},
    {name: "Flots Bleus", image:"https://i.imgur.com/T0ha8mA.jpg"},
    {name: "Saint Beauzille", image:"https://i.imgur.com/6sobH52.jpg"},
    {name: "Belle Ile", image:"https://i.imgur.com/8sGUpso.jpg"},
    {name: "Flots Bleus", image:"https://i.imgur.com/T0ha8mA.jpg"}
]

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render('landing');
});

app.post("/campgrounds", function(req, res){
    // get data from forms and add to campgrounds array
    if(req.body.name){
        var name = req.body.name;
        var image = req.body.imageUrl || "http://www.tourniagara.com/wp-content/uploads/2014/10/default-img.gif";
        var newCampground = {name: name, image: image};
        campgrounds.push(newCampground);
    }

    // reroute back to get campgrounds
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(res, res){
    res.render("new");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, function(){
    console.log("YelpCamp READY !!");
});