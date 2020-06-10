var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get('/',function(req,res){
    res.render("landing");
 });

//AUTH ROUTES//
//SHOW ROUTING //show register form 
router.get("/register",function(req,res){
    res.render("register",{page:'register'});
   });
   
  //hendle sign up logic
router.post("/register",function(req,res){
     var newUser=new User({username:req.body.username});
     if (req.body.adminCode=="nivniv29"){
       newUser.isAdmin="true"
     }
     User.register(newUser,req.body.password,function(err,user){
      if(err){
          return res.render("register");
      }else{
          passport.authenticate("local")(req,res,function(){
              res.redirect("/campgrounds");
          });
        }
      }
     );
   });
   
    
  //SHOW LOGIN FORM
router.get("/login",function(req,res){
     res.render("login",{page:'login'});
   });
   
   //handle login logic 
   router.post("/login", passport.authenticate("local",
   {
     successRedirect:"/campgrounds",
     failureRedirect: "/login"
     }) ,function(req,res){
   });
   
   
   //logout route
router.get("/logout",function(req,res){
      req.logout();
      req.flash("seccess","Log Out seccesfuly"),
      res.redirect("/campgrounds")
   });



   //middleware 
   function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    res.render("/login");
}
   
   module.exports=router;