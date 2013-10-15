## About

HabitsOfMind is a web platform developed by [Peter Koraca](http://www.peterkoraca.com) for [Thomas Tallis School](http://www.thomastallis.co.uk/). It deals with how we learn and how we think about learning.

It is a part of a much larger project (Tallis Habits) which is designed to support the development of really effective learning habits. Research shows that people who acquire particular skills and attributes develop the ability to learn to do a range of things successfully over time. The 5 Habits of Mind that form the foundations of this project come from a very [detailed piece of research](http://www.google.com/url?q=http%3A%2F%2Fwww.creativitycultureeducation.org%2Fprogression-in-creativity-developing-new-forms-of-assessment&sa=D&sntz=1&usg=AFQjCNEaOS1AiJ5se1xfJZcJFwBPN0V79A) commissioned by [Creativity, Culture and Education](http://www.creativitycultureeducation.org/) and carried out by The [Centre for Real World Learning](http://www.winchester.ac.uk/aboutus/lifelonglearning/CentreforRealWorldLearning) at the University of Winchester. We will continue to collaborate with professors [Bill Lucas](http://www.winchester.ac.uk/about-us/centre-for-lifelong-learning/centre-for-real-world-learning/people-profiles/bill-lucas) and [Guy Claxton](http://www.guyclaxton.com/) and our colleagues in the [Expansive Education Network](http://www.expansiveeducation.net/) on the future development and implementation of the project.

The app is one of several ways in which the school is promoting the development of good learning habits with a particular focus on creative learning. It is designed to support learners in reflecting on the day to day use of their habits of mind, thereby encouraging them to develop a language to think about the ways in which they are learning.

You can find out about how the project is progressing by visiting the [Tallis Habits blog](http://tallishabits.tumblr.com/).

[All the code](https://github.com/pkorac/habitsOfMind) produced for the project is opensource and under MIT licence. You can find our repository over at [github](https://github.com/pkorac/habitsOfMind). We hope to share the project with others that might benefit from it and find collaborators to help refine and develop it further.

## Our Setup
HabitsOfMind is a [NodeJS](http://nodejs.org) application that uses [CouchDB](http://couchdb.apache.org) for the databases.
Therefore NodeJS and Apache CouchDB have to be installed.

To make our lives easier we've used [Heroku](http://www.heroku.com) (for running Node) and [Cloudant](https://cloudant.com) (for the CouchDB databases).


## Installation
1. Setup the development environment
   - NodeJS
   - CouchDB

2. Clone the repository
```
git clone git@github.com:pkorac/habitsOfMind.git
```

3. Create two CouchDB databases
   - one for user profiles
   - one for users' data

4. Edit the creds.json and fill in the appropriate credentials for both of the databases


5. Run the reset.js (this will create the first admin user and all the necessary database views).
``` node reset.js ```	

6. If you're using Heroku create a new app (`heroku create`) and push the new code to it (`git push heroku master`).


7. Log-in and use the platform


Have fun