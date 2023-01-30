//jshint esversion:6



const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");




const app  = express();


app.use(bodyParser.urlencoded({entended: true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
   
});

app.post("/", function(req, res){
    
const query = req.body.cityName;
const apiKey = "8f11db9ca439f98df649c56c2cf8514c";
const unit = "imperial"

const url = "https://api.openweathermap.org/data/2.5/weather?units=" + unit  +" &q="+ query +"&appid=" + apiKey ;

https.get(url, function(response) {
console.log(response.statusCode);


response.on("data", function(data){
const weatherData = JSON.parse(data)
const temp = weatherData.main.temp
const weatherDescription = weatherData.weather[0].description
const icon =  weatherData.weather[0].icon
const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
res.write("<p>The weather is currently " + weatherDescription + "<p>");
res.write("The temperature in "+ query +" is "+ temp + " degrees Celcius.</h1>");
res.write("<img src=" + imageUrl +">");
res.send();

    })
})

})






app.listen(3000, function() {
    console.log("We in this Bish");
})


