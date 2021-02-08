# **Booking Controller**
## **Role of the component**
The aim of this component is to receive and process the user’s booking request that will be sent from the _User Request Validator_ component. The _Booking Controller_ component will create an appointment according to the information that is the user booking request. It will save the appointment in the database, send a confirmation message to the user who does the booking. 

## **How it connects with the other components and its role in the software architecture**
The _Booking Controller_ component plays a role in the **Publish/(Un)Subscribe** architectural style which we are using in our distributed systems. This component will act as both a **Publisher** and a **Subscriber**. In order for this component to fulfill its role of creating and saving an appointment, the _Booking Controller_ will act as a **Subscriber** to receive the user request which will hold the information of the booking. This user request will be originally published by the _User Booking GUI_, but the _User Request Validator_ is the component that will receive it first to validate it, and then publish it to the _Booking Controller_ if the validation is successful. Once the _Booking Controller_ is done creating and saving an appointment using the information in the user request message, it will act as a **Publisher** and send a confirmation message of the booking to the _User Booking GUI_ component.
## **How to get started** 

1. Clone the repository\
`git clone git@git.chalmers.se:courses/dit355/2020/group-8/booking-controller.git`
2. Traverse to the main repository from the terminal/command prompt/bash shell
3. Install all the dependencies using   
   `npm install`
4. Run the component using   
`node main.js`
## **Technologies**
* [MongoDB](https://www.mongodb.com/cloud/atlas) -- Database to check appointments availability   
* [Mqtt.js](https://www.npmjs.com/package/mqtt) -- Client library for broker  
* [EMQ](https://medium.com/@emqtt/use-websocket-to-connect-to-mqtt-broker-9e7baf1aa773) -- gitBroker for the MQTT protocol   
* [MQTT Websocket Toolkit](http://tools.emqx.io/) -- Toolkit for testing  

## **References**
[1] [Use websockets to connect to the MQTT broker,Written by EMQX](https://medium.com/@emqtt/use-websocket-to-connect-to-mqtt-broker-9e7baf1aa773), accessed November 2020.

