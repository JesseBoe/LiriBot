require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const moment = require('moment');


var command = process.argv[2];

switch (command) {
    case "concert-this":
        getConcert();
        break;
    case "spotify-this-song":
        getSong();
        break;
    case "movie-this":
        getMovie();
        break;
    case "do-what-it-says":

        break;

    default:
        console.log("Please type one of the following commands. concert-this spotify-this-song movie-this do-what-it-says")
        break;
}

function getConcert(){
    var artist = "";
    if (process.argv.length <= 3) {
        return console.log("Please type in a search term.");
    }
    else {
        for (let i = 3; i < process.argv.length; i++) {
            artist += process.argv[i];
        }
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            //console.log(response);
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city + ', ' + response.data[0].venue.region);
            console.log(moment(response.data[0].datetime).format("MM-DD-YYYY"));
        },
        function (error) {
            console.log(error);
        }
    )
}

function getSong()
{
    var song = "";
    if (process.argv.length <= 3) {
        song = "The Sign Ace of Base";
    }
    else {
        for (let i = 3; i < process.argv.length; i++) {
            song += process.argv[i] + " ";
        }
    }

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].external_urls.spotify);
    });
}

function getMovie(){
    var movieName = "";
    if (process.argv.length <= 3) {
        movieName = "Mr. Nobody";
    }
    else {
        for (let i = 3; i < process.argv.length; i++) {
            movieName += process.argv[i] + " ";
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            console.log(`
            Title: ${response.data.Title}
            Year: ${response.data.Year}
            IMDB Rating: ${response.data.Ratings[0].Value}
            Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
            Country: ${response.data.Country}
            Language: ${response.data.Language}
            Plot: ${response.data.Plot}
            Actors: ${response.data.Actors}
            `)
        },
        function (error) {
            console.log(error);
        }
    )
}