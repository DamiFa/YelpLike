var mongoose = require("mongoose"),
    Campgrounds = require("./models/campground"),
    Comment = require("./models/comment");

var data = [{
        name:"Divonne-les-Bains",
        image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description:"Vestibulum non eros non neque tempor vulputate. Nullam commodo iaculis nunc at pretium. In volutpat."
    },
    {
        name:"Flots Bleus",
        image:"https://images.pexels.com/photos/735837/pexels-photo-735837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description:"Fusce tincidunt tristique accumsan. Cras luctus nisl ut risus faucibus, ac venenatis lectus posuere."
    },
    {
        name:"Belle île",
        image:"https://images.pexels.com/photos/216678/pexels-photo-216678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description:"Nullam vehicula, massa non dapibus fringilla, orci sapien volutpat ex, eget volutpat purus volutpat."
    },
    {
        name:"Aix les Bains",
        image:"https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description:"Aenean id nisi quam. Proin sagittis ante quis augue condimentum, at ullamcorper velit viverra fusce."
    }
]

function seedDB(){
    // Remove all Campgrounds
    Campgrounds.remove({}, function(err){
        if(err) console.log(err);
        else{
            console.log('Campgrounds Deleted');
            // Add Campgrounds
            Comment.remove({}, function(err){
                if(err) console.log(err);
                else{
                    console.log("Comments Deleted");
                    data.forEach(function(seed){
                        Campgrounds.create(seed, function(err, campCreated){
                            if(err) console.log(err);
                            else {
                                console.log("ADDED: " + campCreated);
                                Comment.create({
                                    text:"This place is great, but I wish there was internet",
                                    author: "Homer"
                                }, function(err, commentCreated){
                                    if(err) console.log(err);
                                    else{
                                        campCreated.comments.push(commentCreated);
                                        campCreated.save();
                                        console.log("Comment Created");
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });


    // Add Comments

}

module.exports = seedDB;