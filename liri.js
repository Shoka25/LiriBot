require("dotenv").config();
let keys = require('./keys')
let request = require("request")
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var spotify = new Spotify(keys.spotify);
let args = process.argv.slice(2)
let band = args.slice(1).join("+")


if (args[0] === "spotify-this-song") {
  if(band === ""){
    band = "The Sign"
  }
  spotify.search({ type: 'track', query: `${band}`, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Artist: " + data.tracks.items[0].artists[0].name)
    console.log("Song name: " + data.tracks.items[0].name)
    console.log("Album: " + data.tracks.items[0].album.name)
    console.log("Song link: " + data.tracks.items[0].external_urls.spotify)
    
  })
}

if (args[0] === "movie-this") {
  if(band === ""){
    band = "Mr.Nobody"
  }
  request("http://www.omdbapi.com/?apikey=trilogy&t=" + band, function (error, response, body) {
    //console.log(JSON.parse(body))
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title)
      console.log("Year released: " + JSON.parse(body).Year)
      console.log("IMDB rating: " + JSON.parse(body).imdbRating)
      console.log("Rotten tomatoes rating: " + JSON.parse(body).Ratings[1].Value)
      console.log("Country produced: " + JSON.parse(body).Country)
      console.log("Language: " + JSON.parse(body).Language)
      console.log("Plot: " + JSON.parse(body).Plot)
      console.log("Actors: " + JSON.parse(body).Actors)
    }
  })
}

if (args[0] === "concert-this") {
  request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Venue: " + JSON.parse(body)[0].venue.name)
      console.log("Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.country)
      let date = JSON.parse(body)[0].datetime.slice(0, 10)
      date = moment(date).format('MM/DD/YYYY');
      console.log("Date: " + date)
    }
    else { console.log("Error: " + error) }
  })
}
