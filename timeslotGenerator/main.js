var currentHash; // init variable for hash used to check if the json has been changed
var database = require('./Database/database');
var broker = require('./broker/broker')
var appointmentGenerator = require('./appointmentGenerator/appointments');
const Appointment = require('./model/appointment');

database.connect;
broker.subscribe("TimeSlot");
broker.subscribe("Availableclinics");

broker.eventEmitter.on("messageArrived",function(topic, jsonMessage){
    if(topic == "TimeSlot"){
        //Search the booked timeslots from the databse in the date and clinic that the user sends and save it in "app"
        Appointment.find({dentistid : jsonMessage.dentistid , date : jsonMessage.date},function(err,app){
            // Fetch the json file and save it in the "a" var
            let promiseResult = appointmentGenerator.allappointments.then(a => {
                
                //Find the clinic data that the user sends with the id and save it in obj
                let obj = a.filter(function(e){
                    e.date = jsonMessage.date;
                    return e.day == jsonMessage.day && e.id == jsonMessage.dentistid
                })
                try {
                    var timeSlots=[]
                    timeSlots = obj[0].timeSlots
                    console.log(app);
                    
                    //Delete the booked timeslots
                    for (let i=0 ; i<timeSlots.length ; i++){
                        var counter = 0
                        var time = ""
                        var appj = 0;
                        
                        for(let j=0 ; j<app.length ; j++){
                            if(obj[0].timeSlots[i] === app[j].time) {
                                counter = counter + 1;
                                console.log(counter);
                                time = app[j].time
                                if (counter >= obj[0].dentistsNumber){
                                    var index = obj[0].timeSlots.indexOf(time);
                                    if(index > -1){
                                        obj[0].timeSlots.splice(i,1)
                                    }
                                }
                            }
                        } 
                    };

                    //fika time: 10:00 - 10:30
                    //lunch time: 12:00 - 13:00
                    //removing break times from the timeslots
                    var breakSlots = ['10:00', '12:00', '12:30'];
                    for(let i=0; i < breakSlots.length; i++) {
                        var slot = breakSlots[i];
                        var index = obj[0].timeSlots.indexOf(slot);
                        if(index > -1) {
                            obj[0].timeSlots.splice(index, 1)
                        }
                    }
                    obj[0].requestid = jsonMessage.requestid;
                    //console.log(obj[0].timeSlots)
                    broker.publish(`send all the AP/${jsonMessage.requestid}` ,JSON.stringify(obj[0]));
                    console.log(obj[0]);
                }catch(error){
                    console.log(error.message);
                }
            })
        })
    }



    
    else if (topic == "Availableclinics"){
        Appointment.find({date : jsonMessage.date},function(err,app){
            
            
            let promiseResult = appointmentGenerator.allappointments.then(a => {
                let obj = a.filter(function(e){
                    return e.day == jsonMessage.day
                });

                //console.log(obj);

                for(let k = 0 ; k<obj.length; k++){
                    var timeSlots=[];
                    timeSlots = obj[k].timeSlots;
                    for (let i=0 ; i<timeSlots.length ; i++){
                        var counter = 0;
                        var time = "";
                        var appj = 0;
                        for(let j=0 ; j<app.length ; j++){
                            if(obj[k].timeSlots[i] === app[j].time){
                                counter = counter + 1;
                                //    } else {
                                //        counter = counter + 0
                                //    }
                                // }   
                                //console.log(counter);
                                time = app[j].time;
                                if (counter >= obj[k].dentistsNumber){
                                    var index = obj[k].timeSlots.indexOf(time);
                                    if(index > -1){
                                        obj[k].timeSlots.splice(i,1)
                                    }
                                }
                            }
                        } 
                    };
                    //fika time: 10:00 - 10:30
                    //lunch time: 12:00 - 13:00
                    //removing break times from the timeslots
                    var breakSlots = ['10:00', '12:00', '12:30'];
                    for(let i=0; i < breakSlots.length; i++) {
                        var slot = breakSlots[i]; 
                        var index = obj[k].timeSlots.indexOf(slot);
                        if(index > -1) {
                            obj[k].timeSlots.splice(index, 1)
                        }
                    }
                    obj[k].requestid = jsonMessage.requestid;
                    obj[k].numberOFSlots = obj[k].timeSlots.length;
                }
                broker.publish(`send all the AP/${jsonMessage.requestid}` ,JSON.stringify(obj));
                console.log(obj);
            })
        })
    }
})
 
