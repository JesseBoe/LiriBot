require("dotenv").config();
var keys = require("./keys.js");
// const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const moment = require('moment');


var command = process.argv[2];

switch (command) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":

        break;
    case "movie-this":

        break;
    case "do-what-it-says":

        break;

    default:
        break;
}

function concert(){
    var artist = "";
    for (let i = 3; i < process.argv.length; i++) {
        artist += process.argv[i];
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