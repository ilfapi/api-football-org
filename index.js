const { AUTH_TOKEN } = require('./config');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send(`API is built by ILF Football</br>`);
});

app.get('/api/callback_zalo', (req, res) => {
  console.log("query", JSON.stringify(req.query));
  res.status(200).send({result: "ok"});
});

app.get('/zalo_verifierPS2k6A_8905kthm1fF063bJlZ52ua5OBDZO.html', (req, res) => {
  res.sendFile(__dirname+"/zalo_verifierPS2k6A_8905kthm1fF063bJlZ52ua5OBDZO.html");
});

app.get('/zalo_verifierEVoRTxk38KnlXhL4i_aY773zemgSZ75MEJ8.html', (req, res) => {
  res.sendFile(__dirname+"/zalo_verifierEVoRTxk38KnlXhL4i_aY773zemgSZ75MEJ8.html");
});

app.post('/api/matches', (req, res) => {
  var query = req.body;
  console.log(query);
  var config = {
    method: 'GET',
    url: 'https://api.football-data.org/v4/matches',
    headers: { 
      'X-Unfold-Lineups': 'true',
      'X-Unfold-Goals': 'true',
      'X-Auth-Token': AUTH_TOKEN
    }
  };

  axios(config).then(function (response) {
    res.status(200).send({
      result: JSON.stringify(response.data)
    });
  }).catch(function (error) {
    res.status(400).send({result: error});
  });
});

app.get('/api/matches/:id', (req, res) => {
  var id = req.params.id;
  var reg = /^\d+$/;
  var check = reg.test(id);
  if (check) {
    var config = {
      method: 'GET',
      url: 'https://api.football-data.org/v4/matches/' + id,
      headers: { 
        'X-Auth-Token': AUTH_TOKEN
      }
    };

    axios(config).then(function (response) {
      res.status(200).send({
        result: JSON.stringify(response.data)
      });
    }).catch(function (error) {
      res.status(400).send({result: error});
    });
  }else{
    res.status(400).send({error: "Invalid input"});
  }
});

app.get('/api/list_match', (req, res) => {
  var config = {
    method: 'get',
    url: 'https://gw.vnexpress.net/football/fixture/date?league_id=4141',
    headers: { }
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
