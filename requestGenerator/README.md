# Request Generator

## **Role of the component**
The request generator is a component made to stress-test all the four components of the distributed system.  
It generates appointment requests following the [schema](https://git.chalmers.se/courses/dit355/2020/group-8/UserRequestValidator/-/blob/master/models/userRequest.json) for **user requests**. Once the component is running, it will start to publish 100 randomly generated appointment requests within a time-interval of 10 seconds to the MQTT broker.
## **How it connects with the other components and its role in the software architecture**
As the component's purpose is only for *testing* the system, it is not part of the four main system components.  
It is therefore not included in the software architecture documentation nor depicted in the diagrams, as it does not have a role or effect on the architectural design.
## **How to get started**
* Clone the repository using  
`git clone git@git.chalmers.se:courses/dit355/2020/group-8/request-generator.git`
* Traverse to the main repository from the terminal/command prompt/bash shell and run  
`npm install`
* To run the request generator, use  
`node index`
## **Technologies**
* [Mqtt.js](https://github.com/mqttjs/MQTT.js) -- Client library for broker
* [EMQ](https://www.emqx.io/) -- Broker for the MQTT protocol
* [MQTT Websocket Toolkit](http://tools.emqx.io/) -- Toolkit for testing