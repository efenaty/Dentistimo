var moment = require('moment');
moment().format();
const fetch = require('node-fetch');
const hash = require('sha256')
let url = "https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json";
let settings = {
    method: "Get"
};

async function getDentistRepo() {
    try {
        var response = await fetch(url, settings);
        dentistjson = await response.text();
        dentistjson = JSON.parse(dentistjson);
    } catch (e) {
        console.error(e)
    }
    return dentistjson;
}

var appointments = []
var allappointments = appointmentCreator();



async function appointmentCreator() {
    dentistjson = await getDentistRepo()
    for (i = 0; i < dentistjson.dentists.length; i++) {
        var openinghours = dentistjson.dentists[i].openinghours
        var dentistsNumber = dentistjson.dentists[i].dentists

        Object.keys(openinghours).forEach(function(key) {
            var day = key;
            var opening = openinghours[key].slice(0, openinghours[key].indexOf('-').toString());
            var openingHour = opening.slice(0, opening.indexOf(':').toString());
            var closing = openinghours[key].slice(openinghours[key].lastIndexOf('-') + 1).toString();
            var closingHour = closing.slice(0, closing.indexOf(':').toString());
            
            var timeSlots = generateTimeslots(openingHour, 00, closingHour, 30);
            var appointment = {
                id: dentistjson.dentists[i].id,
                name : dentistjson.dentists[i].name,
                owner : dentistjson.dentists[i].owner,
                address : dentistjson.dentists[i].address,
                city : dentistjson.dentists[i].city,
                openinghours : {
                    monday : dentistjson.dentists[i].openinghours.monday,
                    tuesday :dentistjson.dentists[i].openinghours.tuesday,
                    wednesday:dentistjson.dentists[i].openinghours.wednesday,
                    thursday :dentistjson.dentists[i].openinghours.thursday,
                    friday :dentistjson.dentists[i].openinghours.friday,
                },
                clinicName: dentistjson.dentists[i].name,
                coordinate :{
                    longitude : dentistjson.dentists[i].coordinate.longitude,
                    latitude : dentistjson.dentists[i].coordinate.latitude,
                },
                day: day,
                opening: openingHour,
                closing: closingHour,
                timeSlots: timeSlots,
                dentistsNumber : dentistsNumber,
                date: "",
            }
            appointments.push(appointment)
        })
    }
    return appointments;
}


//generate an array of times within a certain time interval
//source: https://stackoverflow.com/questions/48105280/moment-javascript-generate-an-array-of-time-slots-with-a-15min-cliff?rq=1

function generateTimeslots(startHour, minutes, endHour, halfHour) {

    var startTime = moment().utc().set({
        hour: startHour,
        minute: minutes
    });
    var endTime = moment().utc().set({
        hour: endHour,
        minute: minutes
    });

    var timeSlots = [];
    while (startTime <= endTime) {
        timeSlots.push(new moment(startTime).format('HH:mm'));
        startTime.add(halfHour, 'minutes');
    }
    return timeSlots
}

module.exports = {
    allappointments,
    getHash: async () => {
        let response = await fetch(url, settings);
        dentistHash = await response.text();
        dentistHash = hash(dentistHash);
        return dentistHash;
    }
}