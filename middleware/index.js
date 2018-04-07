// All the middleware goes here
// On met tous nos middleware dans un objet qu'on export à la fin
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var flash = require("connect-flash");


var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, foundCampground){
            if(err){
                req.flas("error", "Campground not found");
                res.redirect("back");
            } 
            else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash('error', "You do not have permission !")
                    res.redirect("back");
                }
            }
        });
    }
    else {
        res.redirect("/login");
        req.flash("error", "You need to be logged in to do that !!");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                req.flas("error", "Comment not found");
                res.redirect("back");
            }
            else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash('error', "You do not have permission !")
                    res.redirect("back");
                } 
            }
        });
    }
    else {
        req.flash("error", "You need to be logged in to do that !!")
        res.redirect("/login");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that :(");
    res.redirect("/login");
};

module.exports = middlewareObj;