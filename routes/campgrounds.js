var express=require("express");
var router=express.Router();
Campground=require("../models/campgrounds"),


//INDEX ROUTING// show details about all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds) { 
        if (err){
            console.log("EROR!");
        } else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
        }
    });
  });
  

//CREATE ROUTING create new campground 
router.post("/",function(req,res,){
   var name=req.body.name;
   var image=req.body.image;
   var price=req.body.price;
   var description=req.body.description;
   var author={
    id:req.user._id,
    username:req.user.username
   }
   console.log(author);
   var newCamp={name:name,image:image,description:description,price:price,author:author};
   Campground.create(newCamp,function(err,newCampgrounds){
       if (err){
           console.log(err);
       }else{
        res.redirect('/campgrounds');

       }
         });
      });  
   
//NEW-ROUTNING -show only the form of make new campground
router.get("/new",isLoggedIn,function(req,res){ 
    res.render("campgrounds/new"); 
 });
   
 

//SHOW-ROUTING :show more info about one campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampgrounds) {
        if (err){
            console.log("eror faild niv naory")
        }else{
         
            res.render("campgrounds/show",{campgrounds:foundCampgrounds});
        }
    
    }); 
 });


 //EDIT-ROUTING // edit specific campground by user 
router.get("/:id/edit",checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
    res.render("campgrounds/edit",{campground:foundCampground});
   });
});

 //UPDATE -ROUTING// update specific campgrounds
router.put("/:id",checkCampgroundOwnership,function(req,res){
Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundCampground){
     if (err){
         res.redirect("/campgrounds");
     }
     res.redirect("/campgrounds/" +foundCampground._id);
  });
});



//DESTORY-ROUTING/delete specific campground  ///MAKE: only thos who make the campground can delete them
router.delete("/:id",checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
     if (err){
         res.redirect("/campgrounds")
     } 
       res.redirect("/campgrounds");
    });

});

//check if the user is logged in 
 function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first"); 
    res.render("login");
}
 


//check if the user owner of the spcific campground
function checkCampgroundOwnership(req,res,next){
    if (req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if (err){
                console.log("EROR!! NIV NAORY");
                redirect("/campgrounds");
            }
            if (foundCampground.author.id.equals(req.user._id)){
                  next();
            }else{
            
                res.redirect("/campgrounds")
            }
          });
    
       }else{
           res.render("login"); 
       }
}

module.exports =router;