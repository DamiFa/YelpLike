var mongoose = require("mongoose"),
    Campgrounds = require("./models/campground"),
    Comment = require("./models/comment");

var data = [{
        name:"Divonne-les-Bains",
        image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description:"Maecenas tristique mollis neque, in convallis felis consectetur id. Duis ligula dolor, iaculis ut consequat et, tincidunt eget mauris. Etiam pulvinar hendrerit metus eget luctus. Morbi laoreet tortor arcu, ut ullamcorper ante laoreet non. Praesent non scelerisque sem, ac egestas dui. Donec non tellus ac neque aliquet sollicitudin eu nec enim. In cursus felis vel arcu consequat, id fermentum enim sagittis. Praesent sodales, nunc sit amet laoreet egestas, lorem justo convallis leo, ac imperdiet enim orci vitae risus.<br><br>Vestibulum molestie nec libero in rutrum. Proin porttitor, arcu ac hendrerit vestibulum, augue tortor fermentum neque, in aliquet ante tortor id felis. Etiam vel arcu gravida est tincidunt lacinia sit amet sit amet erat. Duis id magna lorem. Donec maximus, risus non vestibulum rhoncus, ante nulla vehicula ipsum, vitae facilisis nunc lorem malesuada diam. Integer malesuada odio felis, eu volutpat quam vulputate sed."
    },
    {
        name:"Flots Bleus",
        image:"https://images.pexels.com/photos/735837/pexels-photo-735837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description:"Nunc pharetra leo purus, sit amet lobortis augue faucibus quis. Curabitur dictum lectus et feugiat sollicitudin. Praesent nisl arcu, egestas a lacinia sed, convallis at mauris. Proin nec eros quam. Nam vel accumsan ipsum. Ut ut velit felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce tincidunt, libero in euismod pellentesque, mi tellus sollicitudin nunc, a posuere magna leo eu libero. Cras in congue sem.<br><br>Mauris posuere lacus in mi maximus, id gravida mi rutrum. Nam viverra sit amet arcu in maximus. Quisque et nisl quis est tincidunt suscipit sit amet nec orci. Vestibulum neque lorem, aliquet eu semper eget, luctus quis mauris. Nullam arcu sapien, porta ut pellentesque a, aliquet nec odio. Ut faucibus est ac tellus egestas viverra. Integer ut turpis tellus. Vestibulum vitae massa mauris. Etiam et ligula eu nisi semper lacinia."
    },
    {
        name:"Belle île",
        image:"https://images.pexels.com/photos/216678/pexels-photo-216678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description:"Suspendisse vel lacus ut sapien volutpat sollicitudin. Aliquam sed odio at metus pulvinar condimentum. Quisque eget metus pellentesque, gravida ipsum nec, aliquet dolor. Fusce sit amet lectus elit. Fusce malesuada pharetra sem, quis tempor leo. Donec ullamcorper arcu ac condimentum pellentesque. Mauris ac nibh magna. Phasellus augue massa, bibendum ac lorem in, malesuada rutrum mi. Donec in erat neque. Phasellus nisl turpis, rutrum non sem quis, vestibulum condimentum dolor. Donec vel ipsum tincidunt, ultrices orci sit amet, scelerisque dolor. Nam accumsan justo at tortor ultrices, a tincidunt est imperdiet. Donec finibus eleifend faucibus. Proin varius accumsan nulla. Proin dignissim pellentesque euismod. Suspendisse porta, leo ac consectetur vehicula, lacus nisi rhoncus dolor, vel luctus ipsum ligula aliquam eros."
    },
    {
        name:"Aix les Bains",
        image:"https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description:"Vestibulum aliquam malesuada nunc, at faucibus massa vehicula a. In viverra tempus rhoncus. Etiam rhoncus lorem et ex condimentum imperdiet. Maecenas eget justo pulvinar, rutrum eros et, varius enim. Integer tempor, enim vel bibendum ultrices, metus urna eleifend velit, ac condimentum dui mi at felis. Pellentesque tempor vestibulum neque non porta. Proin tortor nibh, commodo in diam sed, finibus ultrices nulla. Suspendisse in ligula eros. Ut felis dolor, rhoncus eu arcu eget, tincidunt sollicitudin neque. Ut suscipit, ipsum in dignissim finibus, nibh diam vestibulum diam, in mollis dolor elit vel leo. Etiam vel suscipit erat. Nam nec mauris faucibus, tempor elit sed, convallis est. Nulla et orci aliquam, egestas augue quis, posuere eros.<br><br>Curabitur mattis, augue at varius venenatis, massa enim aliquet diam, sed sagittis dolor leo in diam. Vestibulum eu lacus est. Sed sit amet risus elit. Duis sed risus quis nisl tristique consectetur et eget purus. Quisque magna lacus, consequat non cursus sit amet, vehicula vitae sapien. Donec eget rutrum felis. In elit risus, porta sit amet elit a, porta ultrices magna."
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
                    /* data.forEach(function(seed){
                        Campgrounds.create(seed, function(err, campCreated){
                            if(err) console.log(err);
                            else {
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
                    }); */
                }
            });
        }
    });


    // Add Comments

}

module.exports = seedDB;