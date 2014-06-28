CheatChat
=========
Milestone 2
=========
Video Demostration
---------
TBA

App Link
---------
We have uploaded our web app to an online server for demo purposes,

[CheatChat @ HerokuApp](http://cheatchat.herokuapp.com)

However you are most likely to be confined in a room *'Outside NUS'* (unless you are in school) as the app is meant to be used in school. Thus you might not fully explore the user interface of the app. As such we have made setup a mock app which gives u a psuedo-location within the school to play around. Do note that both apps are independent of each other.

[CheatChat (Mock Location) @ HerokuApp](http://cheatchat-mock.herokuapp.com)
Current Iteration
---------
####Overview
As specified in milestone 1,
> Convert user interface design into its CSS and HTML and integrate with app

We have integrated Bootstrap such that the design can support multiple browsers as well as devices easily. The app design has completed in the current iteration and it is ready for initial acceptance testing by evaluator of this project.

> Integrate NUS Living Labs API to check geographical location of user

Unfortunately, the API is quite limited and we cannot lock down the user in room by room basis as planned. Thus we fall back by zooming out the app scope to building by building basis and is successfully implemented in the current iteration.

> Ability to segregate users into different rooms based on geographical location

As mentioned above, we have successfully implemented where the user (in school) can create/join a room at his current location (building) or join other available/occupied buildings in the current map. It is ready for acceptance testing (however needs to be tested in school vicinity or using the mock application).

####Developer's Note for current iteration
> Our team has completed the application functionality wise and initial design, however there are many other things such as validation, better XSS protection (due to nature of app), cross-compatibility test with different browsers (esp. difficult ones like IE), color-coded schemes/names, flood prevention, which we will push it to the next iteration to further polish/finetune our application before launching for production.

Next Iteration
---------
####Overview
This time we will try to express our final iteration with user stories.

- As a user, I can access CheatChat via my mobile devices so that I can access it whenever I want at school.
- As a user, I can chat on CheatChat safe and secure against any potential malicious scripts by other users.
- As a user, I can explore the campus on a map and join any existing conversations that are created by other users.
- As a user, I want to create a chatroom notifying others about my location so that I can communicate with others with relative to where I am.

 > Note: The last two user stories have already been implemented but still can be improved (better geolocation algorithm) on this iteration. Overall, this iteration is focused on polishing the app.

Time Log
--------
TBA


Milestone 1
=========
Overview / Ideation
---------
**CheatChat** is an web application based on node.js aims to provide students situated at National Univeristy of Singapore to experience a new type of chat system based on each student's geographical location. This is to address the lack of anonymity factored by the dominance of SSO social networks such as Facebook and Twitter. We are aiming to achieve the level of *Gemini* during our course in CP3108B.

Ignition
---------
**A single slide used during ignition.**
![ignition_slide](http://i.imgur.com/FYxfHob.jpg)
**Link to our presentation:**
http://www.youtube.com/watch?v=_YJRpfyxP4c&feature=share&t=1h7s

Planned Features
-----------
*For our current schedule, do refer to our Trello board linked below.*

**Current Sprint (Milestone #1)**
- Implement a simple chatroom system in Node.js
- Allow user to setup their own psuedoname in the chatroom
- Deploy app at Heroku for live demo of our progress
- Design the user interface / logo

**Next Sprint (Milestone #2)**
- Convert user interface design into its CSS and HTML and integrate with app
- Integrate NUS Living Labs API to check geographical location of user
- Ability to segregate users into different rooms based on geographical location

**Subsequent Sprint (Milestone #3)**
- Create iOS and Android Application that opens our app in an internal browser
- Stress Testing of Application (On-site Testing)
- Live Deployment on Heroku for Production

References
----------
**Development Information**

*Node.js Book Reference* : http://www.manning.com/cantelon/

*Jade Template Engine* : http://jade-lang.com/

*Bootstrap* : http://getbootstrap.com/

*Github Ref* : https://github.com/Shenjinn/CheatChat/

*App Ref* : http://cheatchat.herokuapp.com/

**Adminstrative / Planning**

*CheatChat Trello* : https://trello.com/b/dBrOeT5H/cheatchat-cheatchat-herokuapp-com

*Project Log* : https://docs.google.com/spreadsheets/d/1ULClgHvCBWqEZXoaCoqDxB9ZZP5fq1VSHCVIzsfRL8E/edit?usp=sharing
