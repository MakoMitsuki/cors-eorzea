const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/search/location/:loc', (req, res) => {
  request(
    {
      url: 'https://api.yelp.com/v3/businesses/search?location=' + req.params.loc,
      'Authorization': { Bearer: process.env.YELP_API_BEARER_TOKEN }
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));