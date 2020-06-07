var express=require("express");
var router=express.Router({mergeParams:true});
Campground=require("../models/campgrounds");
Comment =require("../models/comment"),


// NEW ROUTING// form for make new comment
router.get("/new",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampgorunds){
    if (err){
        console.log(err);
    }  else{
        res.render("comments/new",{campground:foundCampgorunds});
        }   
        });
    
    });
    
// CREAT ROUTING // make the new comment and upadate the database
    router.post("/",isLoggedIn,function(req,res){
        
         Campground.findById(req.params.id,function(err,campground){
          if (err){
           console.log(err);
          }else{    
         Comment.create(req.body.comment,function(err,comment){
             if (err){
              console.log(err);
             }else{
                comment.author.id=req.user._id;
                comment.author.username=req.user.username;
                comment.save();
                campground.comments.push(comment)
                campground.save();
                res.redirect('/campgrounds/'+ campground._id);
             }
                  });
                }
             });
          });


//EDIT ROUTE//edit specific comment
router.get("/:comment_id/edit",checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
          res.redirect("back")
        }
        console.log("Hello niv",req.params.id);///campground not  working allready
        res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
    });
});


//UPDATE ROUTE/ update specific  comment 
router.put("/:comment_id/",checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
      if (err){
          redirect(err);
      }
      res.redirect("/campgrounds/"+req.params.id)
    });
});


//DELETE ROUTRE/delete spcific comment
router.delete("/:comment_id/",checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if (err){
            res.redirect("back")
        } 
          res.redirect("/campgrounds/"  +   req.params.id);
       });
});


//middleware
function isLoggedIn(req,res,next){
       if (req.isAuthenticated()){
           return next();
       }
       req.flash("succes","Please login first");
       res.render("login");
   }


   function checkCommentOwnership(req,res,next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if (err){
                console.log("EROR!! NIV NAORY");
                redirect("/campgrounds");
            }
            if (foundComment.author.id.equals(req.user._id)){
                  next();
            }else{
            
                res.redirect("/campgrounds")
            }
          });
    
       }else{
           res.render("login"); 
       }
}




          module.exports=router;