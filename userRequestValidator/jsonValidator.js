var broker = require('./broker/broker');
const topics = require('./broker/topics');
var Ajv = require('ajv');
var ajv = new Ajv({
    format: 'full'
});
var requestSchema = require('./models/userRequest');
var queue = require('./QueueBuffer')
var buffer = new queue(50);
const EventEmitter = require('events');
const eventEmitter2 = new EventEmitter();




//we create a customized date-time format that matches our user request date schema which is: YYYY-MM-DD HH:MM
const dateTimeRegex = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9]) (2[0-3]|[01][0-9]):([0-5][0-9])');

ajv.addFormat('date-time', {
    validate: (dateTimeString) => dateTimeRegex.test(dateTimeString)
})


broker.subscribe(topics.topics.userRequestTopic)


//subscribe to the topic "User Request" to receive the user request

broker.eventEmitter.on('message', function(topic, jsonMessage, stringMessage) {
    try {
        setImmediate(() => {
            buffer.enqueue(jsonMessage);
            console.log("Putting in queue")
        })
    }
     catch (error) {
        console.log(error)
        broker.unsubscribe(topic)
    }
    finally {
        console.log("Starting to publish the queue")
        eventEmitter2.emit('Queue')}
})

eventEmitter2.on('Queue', function() {
    while(buffer.queue.length > 0) {
        try  {
            console.log(buffer.queue.length)
         var fromQueue = buffer.dequeue();
         var stringMessage = JSON.stringify(fromQueue);
         var validated = ajv.validate(requestSchema, stringMessage);
             if (validated) {
                 stringMessage = JSON.stringify(fromQueue)
                 broker.publish("booked AP", stringMessage)

                 //broker.publish(topics.topics.bookedAppointmentTopic, stringMessage)

             }
     }   catch (error) {
         console.log(error) 
        }
    }})


broker.eventEmitter.on('unsubscribe', function (topic)  {
    try  {
     if(buffer.queue.length === 0){   
            console.log("I am now resubscribing")
         broker.resubscribe(topic)
  } else {
    broker.eventEmitter.emit('Queue') }
  }  catch (error) {
         console.log(error)
    }
})




