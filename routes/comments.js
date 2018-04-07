var express = require("express");
//il faut ajouter mergeParams: true pour pouvoir déclarer que toutes ces routes utilise un param
var router = express.Router({mergeParams: true}); 
var Comment = require("../models/comment");
var Campground = require("../models/campground");


// NEW
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) console.log(err);
        else res.render("comments/new", {campground:campground});
    });
});

// CREATE
router.post("/", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) console.log(err);
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err) console.log(err);
                else{
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDIT
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) console.log(err);
        else res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    });
});

// UPDATE
router.put("/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) console.log(err);
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }

    });
});

// DESTROY
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) console.log(err);
        else res.redirect("/campgrounds/" + req.params.id);
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) res.redirect("back");
            else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else res.redirect("back");
            }
        });
    }
    else res.redirect("/login");
}

module.exports = router;