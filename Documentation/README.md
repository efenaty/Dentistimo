# ***Dentistimo project* - DIT355 Mini Project: Distributed Systems**
## Purpose
### The task

The aim of this project is to create four independent components, which together demonstrates a distributed system.  
The scope of the system is a service where clients can book dentist appointments through a web application.  
The project should be built using agile practices, allowing requirements to change over time, with the team being able to adapt their way of working. 

The four components, or systems, are split up into individual repositories. Those include:

1. [Graphical User Interface](https://git.chalmers.se/courses/dit355/2020/group-8/GUI) (including a *Map* GUI and *Booking* GUI)   
   This is the component which allows the user to interact with the system. _(feel free to edit/add more)_   

2. [User Request Validator](https://git.chalmers.se/courses/dit355/2020/group-8/UserRequestValidator) (including a syntax and semantic filter)   
   The aim of this component is to validate the data that the user sends through the Booking GUI to the Booking Controller and also validate the schemas. The schemas that will be validated here are the User schema, Clinic schema and Appointment schema.
It will also filter the booking requests that the users send. For example, if a user sends a booking request with empty/null values through the Booking GUI, it will not process to the Booking Controller. Another example would be if two user sends a booking request for the same time slot, it will process the request according to some priority (will be decided later) and then send it to the Booking Controller. _(feel free to edit/add more)_   
3. [Booking Controller](https://git.chalmers.se/courses/dit355/2020/group-8/booking-controller)   
   The aim of this component is to book the appointments and save them in the MongoDB. _(feel free to add more/edit)_   


4. [Timeslot Generator](https://git.chalmers.se/courses/dit355/2020/group-8/timeslot-generator)   
   This component fetches the dentists registry and generate time-slots for the clinics. _(feel free to add more/edit)_   

### The Team

- Shahrzad Sheikholeslami 
- Douglas Johansson
- Mary Olsson Radda
- Ariana Mededovic
- Samar Saeed
- Effat Enti

### Resources
- [_Trello board_](https://trello.com/b/K9fOSQZ5)
- [_Source code for GUI repository_](https://git.chalmers.se/courses/dit355/2020/group-8/GUI)
- [_Source code for Booking Controller repository_](https://git.chalmers.se/courses/dit355/2020/group-8/booking-controller)
- [_Dentists Registry_](https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json)

## Software Requirement Specification (SRS)
### Requirements

**1.** The system shall provide a graphical user interface with a map of affiliated dentists for the patient.

  * 1.1 The system shall distinguish between the available and unavailable dentists on the map. 

**2.** The system shall display all the available clinics for the chosen day. 

  * 2.1 The system shall allow the clients to pick a time slot for their appointment. 

**3.** The system shall allow patients to book an appointment for an available dentist.

  * 3.1 The system shall confirm or reject the patient’s desired time.

  * 3.2 The system shall allow one active reservation per patient.

  * 3.3 The system shall allow patients to cancel a reservation if it is not less than 24 hours before the booked time.

**4.** The system shall create appointments of 30 minutes for every half and full hour of the opening hours. 

**5.** The system shall allow dentists a total of 1,5 hour break time per day, split into 60 minutes lunch break and 30 minutes fika break.

**6.** The system shall send a response with the time of the appointment to the patient.

**7.** The system shall be aware of changes made to the dentist registry, and update the GUI accordingly. 

**8.** The system shall allow appointments of new clinics to be booked.

**9.** The system shall allow a clinic to have multiple dentists.

**10.** The system shall allow a request generator to publish requests through the MQTT broker.


## Software Architecture Document (SAD)

### Technologies

* Vuejs -- For web client frontend

* Nodejs -- For web client backend

* Mqtt.js -- Client library for broker

* EMQ  -- Broker for the MQTT protocol 

* Mapbox -- Integrated map compatible with Vue



### Architectural Diagram

![Architectural Digram](./images/Architectural_diagram.png)




### Functional Decomposition Diagram
A green box indicates a **component.**\
A yellow box indicates a **subcomponent.**\
A blue box indicates a **functionality.**\
A white box indicates a **task.**

![FD Diagram](./images/FD_diagram_update.png)

## Program Management Report (PMR)

### **Practices**

* The team started with a kick-off meeting which included discussions and decisions regarding our initial schedule, communications tools, and our vision of the project.
* The team takes the workload, feasibility, and time constraint into account when defining the requirements and scope of the project to avoid unnecessary and unfeasible features.
* In order to communicate effectively, each team member checks the group messages on a daily basis, and we seek each other’s help and consultation whenever needed. 
* The team scheduled two meetings per week (Wednesday & Sunday) where issues will be discussed, and problems that require collaborative solutions will be dealt with. However, the team also agreed on having a flexible schedule that may change according to circumstances and the team’s progress.
* Each member reports their progress and informs the team about any changes they want to make in order to keep the team updated and on the same page.
* The team breaks down the work and distributes tasks between the team members.
* The team is using both Discord and Trello to keep track of meetings, resources and links, announcements that need to be addressed, tasks that need to be done, and etc.

### **Weekly Reports**

**Weeks 45**

* The team had a kick-off meeting where we discussed how we will be managing our project work and planned our initial schedule that takes our other course into consideration.
* The team discussed the task description and decided to start documenting the requirements of the system.
* All members agreed on spending some time on researching the MQTT protocol and familiarize ourselves with it. 

**Week 46**

* The team followed the schedule, and every member was present during both meetings.
* The team started working on the first version of the requirements, and prepared questions that we wanted to ask our TA during the first checkpoint meeting.
* The team read the task description again and continued discussing and working on the requirements. We made modifications and removed requirements that we thought were currently irrelevant.
* The team discussed the technologies that we want to use in our project and together we decided on the programming language we will be using. 
* The team divided the work that needs to be done for the project documentation and the first version of the submission and set a deadline.

**Week 47**

* The team moved the Wednesday meeting to Thursday due to the following reasons:
    * We did not have our checkpoint meeting with the TA because of the sustainability week.
    * Every member needed some time to research into architectural styles so that we can discuss effectively and make decisions.
   * To have time to complete our assigned tasks. 
* The team has made final decisions on the software architectural styles that will be used.
* The team decided that the Scrum master role will be taken by each member every new week and we assigned the remaining weeks to the members accordingly.
* The team has finally determined the 4 components that will be used in the project and received feedback from the teachers during the checkpoint meeting. 
* The documentation and Trello board have been updated according to the new decisions that have been made by the team.
* The team discussed what should be worked on in the upcoming sprint and distributed the tasks that can be done at this stage. Each task is assigned to two members. 

**Week 48** 

* The team had the weekly checkpoint meeting on Wednesday and got feedback from the product owner about valid points to adapt into future presentations. 
* The requirements in the SRS were updated according to the new assignment update. 
* The team had extensive discussions about how data should be stored throughout the distributed systems, and came to consensus.
  * We will still use MongoDB, although only for storing what is absolutely necessary (e.g. generated time slots for the clinics opening hours, and booked appointments).
* The team brainstormed ideas for the GUI and a proposal has been set.
* Planning for the half-term demonstration has started, and the team decided what features should be prioritised.
* All of the team members were more active in the Trello board, developing a good way of working with adding and assigning members to cards.
 * By doing so, the allocation of work has been more clear and the workflow is more structured.


**Week 49**

* The team decided to have a physical meeting and connect the components together.
* The team had the weekly checkpoint meeting where the team explained the final architectural diagram and got feedback from the product owner.
* The team decided to prioritize implementation of some features to be able to record the demonstration.
* The team shot a demonstration of the half-term demonstration and each of the members explained their contribution during the recording. 




