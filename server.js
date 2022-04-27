const express = require("express");
const app = express();
const weather = require("./data/weather");
console.log(weather.city_name);
const cors = require("cors");

app.use(cors()); // after you initialize your express app instance

app.get("/", (requests, response) => {
  response.send("hello ");
});
app.get("/weather", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  if (searchQuery) {
    let element = weather.find((city) => city.city_name === searchQuery);
    if (element !== undefined) {
      res.send(`${element.city_name}  ${element.lat} ${element.lon}`);
    } else {
      res.status(404).send("Not found");
    }
  } else if (lat) {
    let element = weather.find((city) => city.lat === lat);
    if (element !== undefined) {
      res.send(`${element.city_name}  ${element.lat} ${element.lon}`);
    } else {
      res.send(`${lat} city not found `);
    }
  } else if (lon) {
    let element = weather.find((city) => city.lon === lon);
    if (element !== undefined) {
      res.send(`${element.city_name}  ${element.lat} ${element.lon}`);
    } else {
      res.send(`${lon} city not found `);
    }
  } else {
    res.send(weather);
  }
});

app.listen(3003, () => console.log("Hello"));
