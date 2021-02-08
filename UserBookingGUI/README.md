# **UserBookingGUI** 

## **Role of the component**
The UserBookingGUI is one of our 4 components which communicates with the other components through the broker. The role of this component is to provide a interface through which the user can interact graphically with the Dentistimo system. When the browser opens the application, an interface containing the map and the booking buttons appears. The user can then pick a date to see the clinics that has available timeslots on that particular day. The map uses color coding based on the availability of the clinics, i.e, the unavailable clinics are shown in red. The user can then click on any clinics on the map that are available on that day and click "See the available timeslots" button to see all the available timeslots. Upon clicking the desired timeslot, the user can then book an appointment and is able to see the confirmation on a modal.



## **How it connects with the other components and its role in the software architecture**

The User Booking GUI component plays a role in the **Publish/(Un)Subscribe** architectural style which we are using in our distributed systems. This component acts as both a **Publisher** and a **Subscriber**. Whenever the user interacts with the component, it will **Publish** accordingly and is then **subscribed** to a relevant topic so it can receive messages from other components and update the interface. When the user wants to see the available clinics or the timeslots of a certain clinic and they click on the relevant buttons, the User Booking GUI will **Publish** to the [Timeslot generator](https://git.chalmers.se/courses/dit355/2020/group-8/timeslot-generator) component and then **subscribes** to the relevant topics that the [Timeslot generator](https://git.chalmers.se/courses/dit355/2020/group-8/timeslot-generator) will publish to in order to receive the messages. When the user chooses a time-slot and clicks on the button, the UserBookingGUI will **Publish** the user request to the [User Request Validator](https://git.chalmers.se/courses/dit355/2020/group-8/UserRequestValidator) component which will then publish it to the [Booking Controller](https://git.chalmers.se/courses/dit355/2020/group-8/booking-controller) component if the request is valid. The Booking Controller then sends the confirmation message to the UserBookingGUI and that is when it also acts as a **Subscriber**.


## **How to get started**
1. Clone the repository using 
`git@git.chalmers.se:courses/dit355/2020/group-8/UserBookingGUI.git` 
2. Open the commandline and go into your UserBookingGUI local repository
3. Type `cd client` in your shell/commandline/terminal and press enter to traverse to the client directory.
4. Type `npm install` in your shell/commandline/terminal and press enter to install all the package dependencies.
5. run the server using `npm run serve` and the terminal will show that the server is running at localhost port 8080.
6. Paste the link `http://localhost:8080/`in your browser and hit enter.


## **Errors and Warnings** ##
The following errors/warnings might arise while following step 5 of **How to get started** part

**Possible errors/warnings**   

i. Cannot find module `x`.   

To resolve this error, type `npm install x --save`   


ii. There might be some vue warnings, but those warnings will not affect the system.


## **Technologies used**

* [VueJS](https://vuejs.org/) -- Front-end Javascript framework
* [Mapbox](https://www.mapbox.com/) -- Map integration
* [Geojson](https://www.npmjs.com/package/geojson) -- Json to Geojson converter
* [Bootbox](http://bootboxjs.com/) -- Bootstrap modals
* [Mqtt.js](https://www.npmjs.com/package/mqtt) -- Client library for broker  
* [EMQ](https://medium.com/@emqtt/use-websocket-to-connect-to-mqtt-broker-9e7baf1aa773) -- gitBroker for the MQTT protocol   
* [MQTT Websocket Toolkit](http://tools.emqx.io/) -- Toolkit for testing  



## **References** 
[1] [Use websockets to connect to the MQTT broker](https://medium.com/@emqtt/use-websocket-to-connect-to-mqtt-broker-9e7baf1aa773), accessed November 2020.   
[2] [Adding custom icons as markers](https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/)   
[3] [Using mqtt in vue project](https://www.emqx.io/blog/how-to-use-mqtt-in-vue)