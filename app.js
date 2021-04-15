'use strict';

require('dotenv').config();

const express = require("express");
const app = express();
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

app.get("/fetchRestaurants/:location", (req, res) => {
    const searchRequest = {
        term:'',
        location: req.params.location
    };
    client.search(searchRequest).then(response => {
        const result = response.jsonBody.businesses;
        res.json(result);
    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    });
});

app.get("/fetchRestaurantDetails/:alias", (req, res) => {
    client.business(req.params.alias).then(response => {
        const result = response.jsonBody;
        res.json(result);
      }).catch(e => {
        console.log(e);
        res.sendStatus(500);
      });
});

app.listen(process.env.PORT, () => {
    console.log("Server running on port 3001");
});
