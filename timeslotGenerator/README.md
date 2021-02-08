# **Timeslot Generator**

## **Role of the component**
The role of this component is to fetch the [Dentist Registry](https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json) through HTTP request and generate time slots according to the opening and closing hours of the clinics mentioned in the registry. The time slots are created at 30 minutes time intervals as each appointment is 30 minutes long. It receives the date and the respective day that the user sends through the User Booking GUI and finds time slots generated for that particular day. While looking for available time slots, it also looks for the time slots that are not available in the MongoDB and filters them from the timeslots.

## **How it connects with the other components and its role in the software architecture**
The Timeslot Generator component plays a role in both the **Publish/(Un)Subscribe** and **Client & Server** architectural styles which are used in our distributed system. It is responsible for creating time-slots for the dentist appointments based on the dentists’ opening hours. In order to do so, this component acts as a **Client** to fetch the opening hours data from the dentist registry **Server**. 
The component will act as a **Subscriber** to receive the date and day which will be published by the _User Booking GUI_, and will create time-slots accordingly and act as a **Publisher** to send them to the _User Booking GUI_ component so that they are displayed for the users. 

## **How to get started**

1. Clone the repository\
`git@git.chalmers.se:courses/dit355/2020/group-8/timeslot-generator.git`
2. Traverse to the main repository from the terminal/command prompt/bash shell
3. Install all the dependencies using   
   `npm install`
4. Run the component using   
`node main.js`


## **Technologies**

* [Moment.js](https://momentjs.com/) -- Javascript library for handling dates    
* [MongoDB](https://www.mongodb.com/cloud/atlas) -- Database to check appointments availability   
* [Mqtt.js](https://www.npmjs.com/package/mqtt) -- Client library for broker  
* [EMQ](https://www.emqx.io/) -- Broker for the MQTT protocol   
* [MQTT Websocket Toolkit](http://tools.emqx.io/) -- Toolkit for testing   
* [node-fetch](https://www.npmjs.com/package/node-fetch) -- Fetch data from external web servers

## **References**
[1] [Use websockets to connect to the MQTT broker](https://medium.com/@emqtt/use-websocket-to-connect-to-mqtt-broker-9e7baf1aa773), accessed November 2020.\
[2] [Generate an array of time-slots with a 15min clif](https://stackoverflow.com/questions/48105280/moment-javascript-generate-an-array-of-time-slots-with-a-15min-clif), accessed November 2020.

