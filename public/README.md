This interactive web app lets users vote on movies to discover their top genres and receive personalized movie recommendations using real-time data from TheMovieDatabase (TMDB) API.

Step 1:
Install Node.js and npm (if you don't already have it installed). Node.js lets your computer run JavaScript outside the browser, and npm is Node's package manager to install libraries.
-Go to https://nodejs.org
-Download the LTS version for your operating system
-Run the installer and follow the instructions with default settings
-To verify the installation was successful, open your terminal and type "node -v" and press Enter, then type "npm -v" and press enter. You should see version numbers for the installation


Step 2:
Download the project code. This can be done as a clone through git (if you have it installed already), as option A, or manually as option B.
Option A:
-Open your terminal and insert "git clone https://github.com/kimhogle/Movie-Recs.git", then press enter. This will create a folder with all of the code
Option B:
-Go to "https://github.com/kimhogle/Movie-Recs", click the green "Code" button, then select "Download ZIP". Extract the ZIP files on your computer


Step 3:
Open the Project Folder.
-Open your terminal
-Navigate to the project file you just downloaded using "cd path/to/Movie-Recs" replacing "path/to" with the folder path where you downloaded the project


Step 4:
Create a .env file with your TMDB API Key.
-Get an API key by going to https://www.themoviedb.org/, create a free account, navigate to your account settings, select API, apply for an API key, and copy your API key once approved
-Create the .env file by creating a new file in the base of the project folder called ".env" (it does not need a file name), open it with a text editor and paste "TMDB_API_KEY=YOU_API_KEY_HERE" reaplcing "YOUR_API_KEY_HERE" with the API key you just copied, and save the file


Step 5:
Install dependencies and start the server.
-In your terminal, in the project folder, run "npm install", then "npm start". It should say that the server is running at http://localhost:8080
-Open the url "http://localhost:8080" in your web browser to see the web page







Features Implemented:
1.) Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app.
----The app collects user choices in an array called "winners", processes this array to count votes by movie title and genres, then displays bar charts showing which movies and genres were picked the most often.

2.) Visualize data in a user friendly way. (e.g. graph, chart, etc). This can include using libraries like ChartJS.
----The app renders two bar charts using the Chart.js library.

3.) Create a node.js web server using a modern framework such as Express.js.
----The backend uses Express.js to create a Node.js server (server.js). It serves static files and provides API routes that proxy requests to The Movie Database API, such as /api/movies/top-rated, /api/movies/similar/:id, /api/movies/details/:id, etc.


