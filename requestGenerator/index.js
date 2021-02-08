const publisher = require('./publisher');

publisher.start(); //starts the publisher.js module

setInterval(function() {
    for (var i = 0; i < 100; i++) {
        requestGenerator();
    }
}, 10000);



function requestGenerator() {
    var issuance = new Date();
    var dd = String(issuance.getDate()).padStart(2, '0');
    var mm = String(issuance.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = issuance.getFullYear();
    hours = Math.floor(Math.random() * (16 - 10 + 1) + 10);
    if (Math.floor(Math.random() * 2) === 0)
        minutes = '00'
    else {
        minutes = '30'
    }
    var strTime = hours + ':' + minutes;
    issuance = issuance.getTime();
    const min = Math.ceil(1);
    const max = Math.floor(3);
    var random = Math.floor(Math.random() * (max - min + 1) + min);

    today = yyyy + '-' + mm + '-' + dd + ' ' + strTime;
    requestObject = {
        "userid": Math.floor(Math.random() * 89999 + 10000),
        "requestid": Math.floor(Math.random() * 100),
        "dentistid": random,
        "issuance": issuance,
        "time": today
    }
    requestObject = JSON.stringify(requestObject);
    publisher.publish(requestObject);
}