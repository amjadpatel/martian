# Martian Rationing System

You are part of the Ares III mission to Mars exploring “Acidalia Planitia” plain on Mars in the year 2035. Due to unfortunate circumstances involving a dust storm, you got stranded on Mars alone with no communication to your team or Earth’s command center. Your surface habitat ("Hab") on Mars contains a limited inventory of food supplies. Each of these supplies is in the form of a packet containing either Food or Water. The food items have details of the content, expiry date and calories they provide. The water packet contains only the details of the quantity in liters and doesn’t expire.

You can find more info here - https://docs.google.com/document/d/12iUPtQJdN5tspzy2jSz8bqUytWMhcua3Cz38kGXq_Mo/edit?usp=sharing

## Installation
```bash
# Should have MongoDb,NODE 
# In folder "backend" you can find backend of the project as well.
# Install NPM packages using command line for both front-end and backend directory for node-module.

```

* Front-end is running with url localhost:3000
* Back-end is running with url localhost:3002 

## Usage
In this repo in root we are having front end of the application , which is built over react , and a Sub-folder named "backend" , "backend" is backend of the application which is built on the node. To execute front end of the system run command

```bash 
npm start
```
On browser open localhost:3000 you will see the output. As the very first page communicates with backend and get some records from the database , you also need to run backend on another terminal , change directory to "backend" and execute command :-

```bash 
npm start 
```
it will start backend on localhost:3002

## Test Case
To execute test cases , reach to folder "backend" in terminal , and write following command

```bash 
npm test
 ```
It will show test case status
