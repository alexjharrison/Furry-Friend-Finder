# Furry-Friend-Finder

https://furry-friends-finder.herokuapp.com/

This is a website I made that asks the users questions and determines the best breed of dog based on the answers.

### Layout 
The page is laid out with and uses the Materialize framework.  There are no custom made stylesheets.  I only used the styling built into materialize itself.

### Data
The raw data for the dog statistics were found from this project.  As I am extending their work, I attached an MIT license to the project.
https://github.com/ericdrowell/DogBreedChart/blob/master/dogs.json

### Analysis
The user's answers are submitted to the custom Node API and the results are compared to every breed in the database.  Answers answered "N/A" are not counted toward the final value.

### Results
The results are returned to the page via the API and displayed in a modal which contains the results for best, second best, third best, and worst match.  The best dog description and photo are pulled from the Wikipedia api.  The other pictures are hotlinked from the project I got the dog breed info from linked above.

### Past Results
All users who took the survey have their results displayed on the home page.  A floating action button displays the same modal that the user saw upon completing the survey so anyone can see anyone else's results.

***

*Heroku apparently disables the server after an hour of inactivity and restarts it the next time it is called so previous results dissapear.  Future revisions would have me store the results in a database so they survive a server refresh.

Also, as a hidden option, when "clear" is entered into the name field and submitted, the results on the home page are erased. 