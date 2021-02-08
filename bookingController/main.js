
var database = require('./database/database');
var broker = require('./broker/broker');
var Appointment = require('./model/appointment');

broker.subscribe("booked AP");
 
broker.eventEmitter.on("messageArrived",function(topic,message){
  //This code will execute if the topic is "available appointments request"
  if(topic == "booked AP"){
    try{
      var stringMessage = message.toString();
      var jsonMessage = JSON.parse(stringMessage);
      var date = jsonMessage.time.slice(0, jsonMessage.time.indexOf(' ').toString());
      var time  = jsonMessage.time.slice(jsonMessage.time.lastIndexOf(' ') + 1).toString();
      Appointment.find( {time : jsonMessage.time , date : jsonMessage.date , dentistid : jsonMessage.dentistid},function(err,app){
        if ( app.length == 0 ) {
          //Save the appointment in the database
          var appointment = new Appointment();
          appointment.userid = jsonMessage.userid;
          appointment.time = time;
          appointment.date = date;
          appointment.dentistid = jsonMessage.dentistid;
          appointment.save();
          // console.log(app);
          console.log(appointment)
          jsonMessage.confirmation = "Dear user " + jsonMessage.userid + ", " +  
          " you have booked an appointment with the following details: " + "<br>" + 
          "Date: " + date + "<br>" + "Time: "+ time;
          console.log(jsonMessage.requestid);
          broker.publish(`confirmation/${jsonMessage.requestid}`, JSON.stringify(jsonMessage))
        } 
        else {
          console.log(app);
          console.log("This appointment is not available ! ")
          jsonMessage.confirmation = false;
          broker.publish(`confirmation/${jsonMessage.requestid}` , JSON.stringify(jsonMessage))
        }
      })
    }catch(error){
      console.log(error.message);
    }
  }
  else {
    console.log("noting for now")
  }
})

