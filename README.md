CheatChat
=========
Milestone 3
=========
Video Demonstration
---------
[Link to YT Video](http://youtu.be/wzX8oi2EymY)

App Link
---------
Just visit us at [cheatchat.us](http://cheatchat.us)

Proposed Level of Achievement
---------
We proposed that our team should be granted Project Gemini (Intermediate) level of achievement.

After attending the Liftoff and proposing our idea to the audience, we have been seeking methods/technologies to achieve our goals. At first we planned to use Python (Recommended) with Databasing where we store the chat log in the database and propagate to each user in the application. It felt easy and we were comfortable with the technologies. However we decided to use a newer technology (Node.js) and WebSockets that were unexplored to us for achieving our goal. Not only does it provide a better user experience to the end-users but also challenges us to learn something new and practical by the end of the project.

Thus throughout the entire 3 months of CP3108B, we decided to explore into version control and Agile methodology for developing our application. We were active on learning how to use GitHub ([Our Repo](https://github.com/Shenjinn/CheatChat)) for collaboration as well as using [Trello](https://trello.com/b/dBrOeT5H/cheatchat-cheatchat-us) to keep our objectives clearcut throughout the development phase. We felt that we were much prepared on applying the same techniques on the next module (CS2103).

With respect to peer evaluation, we tried to be honest about the score and provided feedbacks hoping that the receiving teams can improve based on them. The ideas of each team were excellent and we were hoping to see their ideas brought to life.

As Project Gemini requires four additional features based on @159 on top of the basic requirements, here are the five features that we have accomplished in our project,

> 1) Use an alternative platform based Ruby on Rails, PHP, etc. instead of GAE.

As mentioned above, we decided to use Node.JS, HTML5 WebSockets to accomplish our project instead of the recommended GAE.

> 2) Input validation and exception handling

As the nature of our application is prone to malicious abuse, we decided to improve our input validation (e.g. injections, XSS attacks) as well as implementing an anti-flood system to ensure that our users can use our application in peace.

> 3) Google Maps API

Google Maps is a very important tool that we used in our website as our chat application is heavily based on geographical location. Thus we took the opportunity to learn and integrated the Google Maps API into our application to accomplish our task.

> 4) Communicate with some web services using JSON, XML, or other communication format

Of course we cannot only rely on Google Maps and HTML5 Geolocation as there is no way to tell which building you are at in NUS. Thus, we perform a callback to the NUS Living Labs Nearby API and parsed the returned JSON to get the nearest building (the estimated building the user is currently at).

> 5) Have the app displayed appropriately on different mobile clients

As a good foundation practice, we decided to learn and integrate Bootstrap as our core web framework, providing us the flexibility to adapt our web UI for different mobile clients (screen sizes).

3rd Sprint / Milestone Features
---------
On the previous sprint we listed the user stories as of below planned for the current sprint and we believed that all features have been completed and ready for acceptance testing.

- As a user, I can access CheatChat via my mobile devices so that I can access it whenever I want at school.
- As a user, I can chat on CheatChat safe and secure against any potential malicious scripts by other users.
- As a user, I can explore the campus on a map and join any existing conversations that are created by other users.
- As a user, I want to create a chatroom notifying others about my location so that I can communicate with others with relative to where I am.

**In addition, we also completed further enhancements based on user’s feedback,**
- We created a simple tour system (which only loads for first time users) that explains the user interface of our application.
- As our application is centric around NUS, we decided that people outside NUS can only communicate with people outside NUS as well. However due to feedback, we thus allowed people outside NUS to join rooms available in NUS as well.
- We enhanced the interface by provided more colour variations to our chat bubbles and map markers as well as providing feedback if an unexpected disconnection from the server would occur.
- We took another look at the location accuracy by doing a site test and we managed to find and resolve a bug (where the radius of the user is too small). 
- We further optimise our JS/CSS and page delivery as our previous application was too slow for our comfort level. Page speed evaluation tools were used such as Google PageSpeed, Pingdom, etc.

**However there is two issues currently unresolved,**
- While accessing our application from mobile devices, the lack of screen space makes the Network Map a tad too small for proper usage. However, it can still be used and functionality works per normal.

- The accuracy of each user’s location in NUS cannot be guaranteed accurate. The limitations of HTML5 geolocation as well as Living Labs API cannot promise 100% accuracy rate.

Time Log
---------
This time round we provided remarks to most of our activities in our log based on user feedbacks.

Spreadsheet @ Google Drive : [https://docs.google.com/spreadsheets/d/1ULClgHvCBWqEZXoaCoqDxB9ZZP5fq1VSHCVIzsfRL8E/edit#gid=33422991](https://docs.google.com/spreadsheets/d/1ULClgHvCBWqEZXoaCoqDxB9ZZP5fq1VSHCVIzsfRL8E/edit#gid=33422991)

Milestone 2
=========
Video Demonstration
---------
[Link to YT Video](http://youtu.be/7QBCCd74C5U)

App Link
---------
We have uploaded our web app to an online server for demo purposes,

[CheatChat @ HerokuApp](http://cheatchat.herokuapp.com)

However you are most likely to be confined in a room *'Outside NUS'* (unless you are in school) as the app is meant to be used in school. Thus you might not fully explore the user interface of the app. As such we have made setup a mock app which gives u a psuedo-location within the school to play around. Do note that both apps are independent of each other.

Recommended for Testing :
[CheatChat (Mock Location)](http://128.199.157.234:49153/)

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
Spreadsheet @ Google Drive : [https://docs.google.com/spreadsheets/d/1ULClgHvCBWqEZXoaCoqDxB9ZZP5fq1VSHCVIzsfRL8E/edit#gid=33422991](https://docs.google.com/spreadsheets/d/1ULClgHvCBWqEZXoaCoqDxB9ZZP5fq1VSHCVIzsfRL8E/edit#gid=33422991)


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
