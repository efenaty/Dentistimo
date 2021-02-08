/* eslint-disable */
<template>
  <div>
    <div class="container-fluid" id="section1">
      <div id="overlayImg"></div>
      <div class="row">
        <div class="col-12">
          <h1 id="title">Dentistimo</h1>
          <p id="description">
            You need to see a dentist? <br />
            We find the right one for you!
          </p>
          <a href="#titleBookSection">
            <button id="bookNowBtn" class="btn btn-primary">Book Now</button>
          </a>
        </div>
      </div>
      <div id="arrowDown">></div>
    </div>
    <div class="container-fluid" id="section2">
      <div class="row">
        <div class="col-12">
          <h3 id="titleCompanySection">Our Services</h3>
        </div>
      </div>
    </div>
    <div class="container-fluid" id="section3">
      <div class="row titleRow">
        <div class="col-12">
          <h3 id="titleBookSection">Book Now</h3>
        </div>
      </div>
      <div class="row mapRow">
        <div class="col-lg-6 dentistInfo">
          <p class="dentistName"></p>
          <p class="dentistAddress"></p>
          <p class="dentistOwner"></p>
          <p class="dentistAvailable"></p>
          <p class="dentistHours"></p>
        </div>
        <div class="col-lg-6">
          <div id="map">
            <div id="searchDetails" v-html="details"></div>
          </div>
        </div>
      </div>
      <div class="row formRow">
        <div class="col-md-6 col-sm-12 colForm">
          <form id="dataForm">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="date">Date</label>
                <input
                  type="date"
                  name="setTodaysDate"
                  class="form-control"
                  v-model="dateValue"
                  id="date"
                  placeholder="Date"
                />
              </div>
              <div>
                <p>Date: {{ dateValue }}</p>
                 <button id="availablitybtn" class="btn btn-primary submitFormBtn" type="button" @click="getAllClinics()">Show the Clinics Availability</button>
              </div>
            </div>
            <div class="form-group"></div>
            <button
              type="button"
              class="btn btn-primary submitFormBtn"
              data-toggle="modal"
              data-target="#clinicFormModal"
              @click="publishDate"
            >
              See Available Time Slots
            </button>
          </form>
        </div>
        <div class="col-md-6 col-sm-12">
          <form id="timeForm">
            <div class="row buttonRow">
              <div
                id="timebtn"
                class="col-3"
                v-for="appointment in appointments.timeSlots"
                v-bind:key="appointment.timeSlots"
              >
                <button
                  type="button"
                  class="btn btn-primary timeBtn availableBtn"
                  @click="bookAppointment(appointment)"
                >
                  {{ appointment }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <footer>
      <div class="container">
        <div class="row text-center">
          <div class="col-12">
            <a href="#section1"
              >Copyright 2020: <span>www.dentistimo.com</span>
            </a>
            <div>
              Icons made by
              <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
import mapboxgl from "mapbox-gl";
import mqtt from "mqtt";
import userId from "../App.vue";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import GeoJSON from "geojson";
import fetch from "node-fetch"
import bootbox from "bootbox"
// import '.../public/style.css'

var clinicId ; 

export default {
  name: "MapboxMap",
  data() {
    // Set initial data, this.createMap() configures event listeners that update data based on user interaction
    return {
     center: [11.965216102046611, 57.70635929297478], // Gothenburg
     zoom: 11,
     url: "https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json",
     settings: {
     method: "Get"
     },
      dateValue: "",
      details: "",
      appointments: [],
      clinics: [],
      clinicName: "",
      confirmationMessage: '',
      dentists2: {},
      connection: {
        host: "broker.emqx.io",
        port: 8083,
        endpoint: "/mqtt",
        clean: true, // Reserved session
        connectTimeout: 30 * 1000, // Time out
        reconnectPeriod: 4000, // Reconnection interval
        // Certification Information
        clientId: "mqttjs_3be2c321",
        username: "emqx_test",
        password: "emqx_test"
      },
      subscription: {
        topic: "topic/mqttx",
        qos: 2
      },
      receiveNews: "",
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 }
      ],
      client: {
        connected: false
      },
      subscribeSuccess: false,
      dentistInfo: "",
      numberAppointments: 0
    };
  },
  mounted() {
    // create the map after the component is mounted
    //this.getDentistRepo();
    this.createConnection();
    this.createMap2();
    this.restrictPastDate();
  },

 watch: {
    // dentists2: function() {
    //   this.createMap()
    // },
    confirmationMessage: function(){
      this.printConfirmationMessage()
    }
  },
  methods: {
   /* getDentistRepo() {
    var dentists = []
    //fetch the json from dentist registry
    fetch(this.url, this.settings)
    .then(res => res.json())
    .then((json) => {
    //loop through the json and store the objects in the dentists array
    json.dentists.forEach(function(dentist){
    dentists.push(dentist)
});
   //store the array in the clinics array 
   this.clinics = dentists

   //convert to json to geojson
   this.dentists2 = GeoJSON.parse(this.appointments, {
        Point: ["coordinate.latitude", "coordinate.longitude"],
        include: ["name", "id", "owner", "dentists", "address", "openinghours"]
      });
    });
    },*/
    /*getDentistRegistryInGeoJson() {
      this.dentists = GeoJSON.parse(this.clinics, {
        Point: ["coordinate.latitude", "coordinate.longitude"],
        include: ["name", "id"]
      });
    },*/
    getAllClinics() {
      var weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      var d = new Date(this.dateValue);
      var n = d.getDay()
      //generate a random request id
      var requestid = Math.floor(Math.random() * 256)
      var jsonMessgae = { date: this.dateValue , day : weekday[n] , requestid : requestid};
      //convert the json message to a string and publish to the timeslot generator 
      var stringMessage = JSON.stringify(jsonMessgae);
      console.log(stringMessage)
      this.doPublish("Availableclinics", stringMessage);

      this.doSubscribe(`send all the AP/${requestid}`);
      this.client.on("message", (topic, message) => {
        if (topic == `send all the AP/${requestid}`) {
          var string = message.toString();
          var json = JSON.parse(string);
          console.log(json);
          this.dentists2 = GeoJSON.parse(json, {
          Point: ["coordinate.latitude", "coordinate.longitude"],
          include: ["name", "id", "owner", "dentists", "address", "openinghours", "numberOFSlots"]
        });
          console.log(this.dentists2)
          this.createMap();
        }
      });
      
    },
    restrictPastDate() {
     var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("setTodaysDate")[0].setAttribute('min', today);
    },
    printConfirmationMessage() {
       bootbox.alert({
           size: "medium",
           centerVertical: true,
           title: "Your booking is successful!",
           message: this.confirmationMessage});
    },
    createMap() {
      var map = new mapboxgl.Map({
        accessToken:
        "pk.eyJ1IjoiZ3Vzam9oZG8iLCJhIjoiY2toa3Nqbmh5MWpyOTJxbzk2ZjFuMGM2diJ9.7VhD18geRSiwNBS4LSFJdA",
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        minzoom: 5,
        center: this.center, // use initial data as default
        zoom: this.zoom,
        hash: false // sets url's hash to #zoom/lat/lng
      })
      var geojson = this.dentists2
      var clinicname = "";
      geojson.features.forEach(function (marker) {
      var el = document.createElement('div');
      el.classList.add("marker");
      el.className = 'marker';

     if (marker.properties.numberOFSlots > 0) {
         el.style.backgroundImage =
      'url(https://www.flaticon.com/svg/static/icons/svg/684/684850.svg)' 
    //  el.innerHTML = '<span><b>' + ('Available') + '</b></span>'
      
     } else {
         el.style.backgroundImage =
      'url(https://www.flaticon.com/svg/static/icons/svg/684/684908.svg)'
     // el.innerHTML = '<span><b>' + ('Unavailable') + '</b></span>' 
     }

     
      el.style.width = 25 + 'px';
      el.style.height = 25 + 'px';
 
      

      el.addEventListener('click', function (e) {
      clinicId = marker.properties.id;
      console.log(marker.properties);
      // Vue.swal(`${marker.properties.name} was successfully`);
      

              let dentistAddress = marker.properties.address;
              let dentistName = marker.properties.name;
              let dentistOwner = marker.properties.owner;
              let dentistCounter = marker.properties.dentists;
              let dentistOpeningHours = []
              clinicname = marker.properties.name + " at " + marker.properties.address;

              for(let hour in marker.properties.openinghours) {
                dentistOpeningHours.push(marker.properties.openinghours[hour]);
              }
              console.log(dentistOpeningHours);

                   let dentistInfo = {
                name: dentistName,
                address: dentistAddress,
                dentists: dentistCounter,
                owner: dentistOwner,
                dentistOpeningHours: [...dentistOpeningHours]
              }
              document.querySelector(".dentistName").innerHTML = `
                <p><b>Clinic:</b> ${dentistInfo.name}</p>
              `

              document.querySelector(".dentistAddress").innerHTML = `
                <p><b>Address:</b> ${dentistInfo.address}</p>
              `

              document.querySelector(".dentistOwner").innerHTML = `
                <p><b>Clinic owner:</b> ${dentistInfo.owner}</p>
              `

              // document.querySelector(".dentistAvailable").innerHTML = `
              //   <p><b>Number of Dentists:</b> ${dentistInfo.dentists}</p>
              // `

              document.querySelector(".dentistHours").innerHTML = `
                <ul style="list-style-type: none; padding-left: 0;">
                  <li><b>Monday:</b> ${dentistOpeningHours[0]}</li>
                  <li><b>Tuesday:</b> ${dentistOpeningHours[1]}</li>
                  <li><b>Wednesday:</b> ${dentistOpeningHours[2]}</li>
                  <li><b>Thursday:</b> ${dentistOpeningHours[3]}</li>
                  <li><b>Friday:</b> ${dentistOpeningHours[4]}</li>
                </ul>
              `
              alert("You chose the clinic! Now pick a date :D");
      
     });
     // add marker to map
     new mapboxgl.Marker(el)
     .setLngLat(marker.geometry.coordinates)
     .addTo(map);
    });
    this.clinicName = clinicname;

    //  showInfo();

},
createMap2(){
        var map = new mapboxgl.Map({
        accessToken:
        "pk.eyJ1IjoiZ3Vzam9oZG8iLCJhIjoiY2toa3Nqbmh5MWpyOTJxbzk2ZjFuMGM2diJ9.7VhD18geRSiwNBS4LSFJdA",
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        minzoom: 5,
        center: this.center, // use initial data as default
        zoom: this.zoom,
        hash: false // sets url's hash to #zoom/lat/lng
      })
}
// showInfo() {
//         var geojson = this.dentists2

//         geojson.features.forEach(function (marker) {
//               var el = document.querySelectorAll('.marker');

//             el.addEventListener('mouseover', (e) => {
//               let dentistAddress = marker.properties.address;
//               let dentistName = marker.properties.name;
//               let dentistOwner = marker.properties.dentistOwner;
//               let dentistOpeningHours

//               for(let hour in marker.properties.openinghours) {
//                 dentistOpeningHours = [marker.properties.openinghours[hour]];
//                 // alert(dentistOpeningHours);
//               }

//               let dentistInfo = {
//                 name: dentistName,
//                 address: dentistAddress,
//                 owner: dentistOwner,
//                 dentistOpeningHours: [...dentistOpeningHours]
//               }

//               document.querySelector(".dentistInfo").innerHTML = `
//                 <p>${dentistInfo.name}</p>
//               `
//             });
 
//      // add marker to map
//      new mapboxgl.Marker(el)
//      .setLngLat(marker.geometry.coordinates)
//      .addTo(map);
//     });
// },
  // instantiate map.  this method runs once after the vue component is mounted to the 
  ,bookAppointment(appointment) {
    // this.createConnection();
    console.log(this.appointments)
    var message = {}
      //Save the cookie session in the appointment.js
      var id = userId.methods
        .CreateCookieId("sessionId", Math.floor(Math.random() * 256), 2)
      message.userid = id;
      var issuance = new Date();
      issuance = issuance.getTime();
      //Set the requestId to appointment.requestid
      message.dentistid = this.appointments.id;
      message.issuance = issuance ;
      message.time = this.appointments.date +" "+  appointment ;
      message.requestid = this.appointments.requestid;
      
      var confirmationMessage
      var stringMessage = JSON.stringify(message);
      this.doPublish("booked appointment", stringMessage);
      console.log(this.appointments.requestid);
      this.doSubscribe(`confirmation/${this.appointments.requestid}`);
      this.client.on("message", (topic, message1) => {
        if (topic == `confirmation/${this.appointments.requestid}`) {
          var string = message1.toString();
          var json = JSON.parse(string);
          confirmationMessage = json.confirmation + "<br>" + this.clinicName;
           console.log(json.confirmation)
        }
        this.confirmationMessage = confirmationMessage
      });

    },
      publishDate(appointments) {
      this.createConnection();
      var weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      var d = new Date(this.dateValue);
      var n = d.getDay()
      console.log(clinicId)
      //generate a random request id
      var requestid = Math.floor(Math.random() * 256)
      var jsonMessgae = { date: this.dateValue , dentistid  : clinicId, day : weekday[n] , requestid : requestid};
      //convert the json message to a string and publish to the timeslot generator 
      var stringMessage = JSON.stringify(jsonMessgae);
      console.log(stringMessage)
      this.doPublish("TimeSlot", stringMessage);

      this.doSubscribe(`send all the AP/${requestid}`);
      this.client.on("message", (topic, message) => {
        if (topic == `send all the AP/${requestid}`) {
          var string = message.toString();
          var json = JSON.parse(string);
          this.appointments = json;
        }
      });
    },
    createConnection() {
      // The connection codes are not the team's original work the reference is in the Readme file.
      const { host, port, endpoint, ...options } = this.connection;
      const connectUrl = `ws://${host}:${port}${endpoint}`;
      try {
        this.client = mqtt.connect(connectUrl, options);
      } catch (error) {
        console.log("mqtt.connect error", error);
      }
      this.client.on("connect", () => {
        console.log("Connection succeeded!");
      });
      this.client.on("error", error => {
        console.log("Connection failed", error);
      });
    },
    getClinics() {
      this.doSubscribe("all clinics");
      this.client.on("message", (topic, message) => {
        if (topic == "all clinics") {
          var string = message.toString();
          var json = JSON.parse(string);
          this.clinics = json;
          console.log(json);
        }
      });
    },
    doSubscribe(topic) {
      this.client.subscribe(topic, 2, error => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
      });
    },
    doPublish(topic, payload) {
      this.client.publish(topic, payload, error => {
        if (error) {
          console.log("Publish error", error);
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
