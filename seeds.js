var mongoose=require("mongoose");
var Campgrounds= require("./models/campgrounds");
Comment= require("./models/comment");
var data=

    {
        name:"erez",
        image:"http://www.r-photoclass.com/wp-content/uploads/2011/03/20160605-stokksnes-0406.jpg",
        description:"Martin Luther King Jr. (born Michael King Jr.; January 15, 1929 – April 4, 1968) was an American Christian minister and activist who became the most visible spokesperson and leader in the Civil Rights Movement from 1955 until his assassination in 1968. King is best known for advancing civil rights through nonviolence and civil disobedience, inspired by his Christian beliefs and the nonviolent activism of Mahatma Gandhi."
    }


  async function seedDB(){
  await Campgrounds.remove({},function(err,){
      /*
      if (err){
          console.log(err);
      }
    let campground = await Campgrounds.create(data)
    let comment =await Comment.create(
        {
        text:"great phtoto",
        author:"niv naory"
        });
      
            campground.comments.push(comment);
            campground.save();
            
            console.log("create new comment");
      });

*/
    });
  }

module.exports= seedDB;
