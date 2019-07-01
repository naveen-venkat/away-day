# Away Day - Event Organizer
A Node.js ES6 based application that reads the activities from a file and allocates the activies per team so that it can meet the pre requisites.

## Problem Statement
Deloitte Digital is rewarding their employees in recognition for their hard work for range of successful projects by organising a "Deloitte Digital Away Day". Due to high demand across the firm a number of activities were proposed and a selection of them have been approved. Given there are time constraints, you have been asked to help event organisers by writing a program to accommodate various activities for the day.

Organisers have provided with the following useful information:
1. The employees will be divided into various teams and each team will be performing various activities
2. Activities start from 9am until lunch is served at 12 noon
3. Activities resume from 1pm and must finish in time for a presentation to be delivered by external speaker on “Staff Motivation" 4. The presentation can start no earlier than 4:00 and no later than 5:00
5. All activity lengths are either in minutes (not hours) or sprint (15 minutes)
6. Due to high spirit of the team there needs to be no gap between each activity

## Solution:

### How to run:
  * Pre-requsite: You need to install node >= 10 and npm to run this application, https://nodejs.org/en/download

1. Install the node depenedencies
``` 
  npm install
```

2. Run the application by setting the harmony flag so app can run with the latest ES6 features and activities file 
```
  node --harmony app.js ./data/activities.txt
```
  or using npm script run,

```
  npm start
```

### Running the application in debug mode
Start with the debug option set to true to run the application in debug mode
```
  DEBUG=true node --harmony app.js ./data/activities.txt
```

or use npm script
```
 npm run start:debug
```

### Linting the application
To keep the code clean, the Javascript codes are linted, run the below command to see if there is any issues, right now you will see 4 issues because eslint does not support harmony featues yet
```
  npm run lint
```

### Unit testing with code coverage
Unit tests are written to make sure, other developers no what dependecies units have, run the below command
once you run the covergae command, you can see the html file for coverage under `./coverage/icov-report/index.html`
```
  npm run test:coverage
```
or just for unit test
```
  npm run test
```



### Application Design
The application uses morden ES6 fetahres, that means, it uses `Classes`, `Objects`.

Entry point to the application is 

* `app.js` : Entry point to the application, picks the file from the command line, reads the file and parses the activities
* `event-organizer.js`: Parses `Activity` List is passed to this model to prepare schedule, it uses, `Activity`, `Schedule` & `ActivitySlot` models
* `activity-slot.js`: Configuration describing the activity slots available in a day including the lunch and presentation block
* `schedule.js`: An `Schedule` model to prepare schedule per team
* `acitviy.ja`: An `Activity` model to prepare activity
* `fileUtil`: Utility module, that reads the file, line by line and returns array of rows.