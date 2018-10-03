# Moview Review System

## How to run the project
Clone this repository to your local system and run the following command
### `npm install`
Now all the dependencies are installed so now you can run the app for that run the following command
### `npm start`

## Product Implementation
  Home page: has a search bar which will pull data as user types and display the movie posters.

  Upcoming page: will pull the upcoming movies as the user lands to this page. It also has a sort functionality but due to onscroll axios calls the data further added will not be sorted.

  Movie page:  will show the data of movie and suggest the related movies. User can aslo review the movie. Here the movie data is cached and related movies are called live.

  Task:
  -1.Cache : Done in movie page where the movie data is cached using localstorage.
  -2.Quering : used themoviedb API but upcoming movies API has no sort mechanism.
  -3.Uploaded to github

###Brownie Points
-Authentication: Used guest session so that user can rate a movie.
-Observables & RxJS: 
-Universal (Server Side Rendering):  
-Setup & Deployment: Is deployed at heroku  http://themoview.herokuapp.com/
-Dependency Injection:  


  
