var mqtt = require("mqtt");
const host = "ws://broker.emqx.io:8083/mqtt";

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
    qos: 0,
    retain: true
  }
};


var client = mqtt.connect(host, options);

var publisher = {

    start: function() {

        //Called when client is connected
        client.on('connect', function() {
            console.log('Status: Publisher is connected to broker')
        });

        //Called when client is disconnected
        client.on('disconnect', function() {
            console.log('Status: Publisher has been disconnected')
            client.reconnect();
        })

        //Called when client is reconnecting
        client.on('reconnect', function() {
            console.log('Status: Publisher is reconnecting')
        })

        //Called when client is offline
        client.on('offline', function() {
            console.log('Status: Publisher is offline')
            client.reconnect();
        })

    },

    publish: function publishing(message) {
        var topic = "booked appointment";
        console.log(message)
        client.publish(topic, message);
    }
}


module.exports = publisher