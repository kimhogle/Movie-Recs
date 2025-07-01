# 🎬 Movie Recs: Personalized Recommendations Matcher

This interactive web app lets users vote on movies to discover their top genres and receive personalized movie recommendations using real-time data from TheMovieDB (TMDB) API.



## 🚀 Features
- 🔁 Vote between two movies for 30 rounds
- 📊 Analyze favorite genres based on vote history
- 🎯 Get recommendations based on your genre preferences
- 📱 Responsive design for desktop and mobile
- 📈 Optional data visualization with Chart.js



## 📦 Technologies Used
- HTML5, CSS3, JavaScript (ES6+)
- TMDB API for movie and genre data
- Chart.js (for genre graph)
- Node.js + Express (for proxy server)



## 🔐 Getting Your Own TMDB API Key

1. Sign up at [TMDB](https://www.themoviedb.org/signup) or log in to your current account.
2. Go to [Settings > API](https://www.themoviedb.org/settings/api) and apply for a free developer key.
3. Once approved, copy your **API key (v3 auth)**.



## 🛠️ Setup Instructions

1. Clone this repo in your terminal:
git clone https://github.com/kimhogle/Movie-Recs.git
cd movie-recs

2. Install dependencies in your terminal:
npm install

3. Create a .env file in your terminal (be sure to replace "your_api_key_here" with the API key you just copied from tmdb.org):
echo "TMDB_API_KEY=your_api_key_here" > .env

4. Start the local server in your terminal:
node server.js

5. Open in your browser:
http://localhost:8080