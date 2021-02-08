
//The code below is not the original work of the team.
//Refrence : https://medium.com/@emqtt/use-websocket-to-connect-to-mqtt-broker-9e7baf1aa773

var mqtt = require("mqtt");
const host = "ws://broker.emqx.io:8083/mqtt";
//var topic = require("../topics")

var clientId =
  "mqttjs_" +
  Math.random()
    .toString(16)
    .substr(2, 8);
const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: "WillMsg",
    payload: "Connection Closed abnormally..!",
    qos: 2,
    retain: false
  }
};

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

console.log("Connecting mqtt client");
var client = mqtt.connect(host, options);

client.on("error", err => {
  console.log("Connection error: ", err);
  client.end();
});


client.on("message", function(topic, message) {
  try{
  console.log(message)
  var stringMessage = message.toString();
  var jsonMessage = JSON.parse(stringMessage);
  eventEmitter.emit('messageArrived',topic, jsonMessage);
  }catch(error){
    console.log(error.message);
  }
});

// Publish
function publish(topic,message){
  client.publish(topic, message, {
    qos: 2,
    retain: false
  });
}

//Subscribe
function subscribe(topic){
  client.on("connect", () => {
    console.log("Client connected:" + clientId);
    // Subscribe
    client.subscribe(topic, { qos: 2 });})
}


module.exports={
  publish(topic,message){
    publish(topic,message)
  },
  subscribe(topic){
    subscribe(topic)
  },
  client:client,
  eventEmitter : eventEmitter
}

