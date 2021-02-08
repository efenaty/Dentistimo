var broker = require('./broker/broker');
const topics = require('./broker/topics');


//for testing purposes 
broker.subscribe(topics.topics.testTopic);


broker.client.on("message",function(topic, message){
    if(topic == topics.topics.testTopic) { 
    var stringMessage = message.toString();
    var jsonMessage = JSON.parse(stringMessage);
    console.log("The topic is : " + topic);
    console.log("The message is : "+ jsonMessage.msg);
} else {
    console.log("Then what's the topic?");
}
})

