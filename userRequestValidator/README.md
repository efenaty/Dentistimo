# **User Request Validator**


## **Role of the component**
The aim of this component is to validate the data that the user sends through the _User Booking GUI_ component. The schema that will be validated here is the **User Request Schema**. It will filter the booking requests that users send. For example, if a user sends a booking request with empty/null values or the request is not in the [correct JSON format and syntax](https://raw.githubusercontent.com/feldob/dit355_2020/master/bookingrequest.json), the process of the request will not proceed to the _Booking Controller_ component.

## **How it connects with the other components and its role in the software architecture**
The _User Request Validator_ component plays a role in both the **Publish/(Un)Subscribe** and **Pipe & Filter** architectural styles which are used in our distributed systems. This component will act as a **Filter** that will validate the data received from _User Booking GUI_ component through the broker which will act as a **Pipe**. In order for this component to do its job as a **Filter** and validate the user requests’ schema and values, it has to receive the user requests from the _User Booking GUI_ component and thus, it will act as a **Subscriber**. The _User Booking GUI_ component will publish the user requests to a certain topic that this component will be subscribed to. If the validation of the user request is positive, the component will act as a **Publisher** in order to send/forward the user request to the _Booking Controller_ component so that the booking process proceeds. If the validation of the user request is negative, it will not act as a **Publisher** and will stop the booking process from proceeding.

## **How to get started** 
* Clone the repository\
`git clone git@git.chalmers.se:courses/dit355/2020/group-8/UserRequestValidator.git`
* Traverse to the main repository from the terminal/command prompt/bash shell
* Install dependencies\
 `npm install`
* Run the code \
 `node jsonValidator.js`


## **Technologies**

* [Mqtt.js](https://github.com/mqttjs/MQTT.js) -- Client library for broker
* [EMQ](https://www.emqx.io/) -- Broker for the MQTT protocol
* [Ajv: Another JSON Schema Validator](https://ajv.js.org/) -- Library for validating schemas.
* [MQTT Websocket Toolkit](http://tools.emqx.io/) -- Toolkit for testing


## **References**
[1] [Use websockets to connect to the MQTT broker](https://medium.com/@emqtt/use-websocket-to-connect-to-mqtt-broker-9e7baf1aa773), accessed November 2020.\
[2] [Use custom date-time format for ajv schema validation](https://thabo-ambrose.medium.com/use-custom-date-time-format-for-ajv-schema-validation-38e336dbd6ed), accessed December 2020.
