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

app.get("/api/hof/get", (req, res) => {
    var query = req.body;
    var config = {
        method: "GET",
        url: "https://ranking.fconline.garena.vn/api/hof/get",
    };

    axios(config)
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(400).send({ status: "fail" });
        });
});

app.get("/api/game/get", (req, res) => {
    var query = req.body;
    var config = {
        method: "GET",
        url: "https://ranking.fconline.garena.vn/api/game/get",
    };

    axios(config)
        .then(function (response) {
            res.status(200).send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            res.status(400).send({ status: "fail" });
        });
});

app.post("/api/user/search", (req, res) => {
    
    let data = JSON.stringify({
        "mode": req.body.mode,
        "month": req.body.month,
        "text": req.body.text,
    });

    var config = {
        method: "POST",
        maxBodyLength: Infinity,
        headers: { 
            'Content-Type': 'application/json'
        },
        url: "https://ranking.fconline.garena.vn/api/user/search",
        data: data
    };

    axios(config)
        .then(function (response) {
            res.status(200).send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            res.status(400).send({ status: "fail" });
        });
});

app.post("/api2/fcodb", (req, res) => {
    console.log("REQUEST: /API2/FCODB", JSON.stringify(req))
    var config = {
        method: "GET",
        maxBodyLength: Infinity,
        headers: { 
            'accept': 'application/json, text/plain, */*', 
            'accept-language': 'en-US,en;q=0.9,vi;q=0.8', 
            'cookie': '_ga=GA1.2.1838188061.1714266606; sqslot={%22f%22:%224222%22%2C%22p%22:{%22cp10%22:%22aorbvndm%22%2C%22cp11%22:%22zwwaayll%22}%2C%22g%22:{%22cp10%22:%227%22%2C%22cp11%22:%226%22}}; __gads=ID=9b868b012f9cecbc:T=1713983535:RT=1719161211:S=ALNI_MbKx35VsSh-bsv4NsCgNsg8JGUoMw; __gpi=UID=00000df96488dff5:T=1713983535:RT=1719161211:S=ALNI_MZYdSyiT44UVtMuK2cJEnfa-KoQaw; __eoi=ID=cc208836d92f4c02:T=1713983535:RT=1719161211:S=AA-AfjZz-OR3qY8Aa2AIC7eJrT5S; FCNEC=%5B%5B%22AKsRol8Nv7faCMemkYnUNKJkmk8GeuDEh3lZ1dRWi31ceAheLVK9C7UA1t-YMA3wsOfh0zh7B80rzFpgkin8Vh1Svb_Cf1EDsPmKyaiLiNLYFGU7CPbV82LwRdgTlPiUfYkA4bM1GUjt-rwaka1_GDPVrbWlqUk4hg%3D%3D%22%5D%5D', 
            'dnt': '1', 
            'priority': 'u=1, i', 
            'referer': 'https://vn.fifaaddict.com/', 
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"', 
            'sec-ch-ua-mobile': '?0', 
            'sec-ch-ua-platform': '"Windows"', 
            'sec-fetch-dest': 'empty', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-site': 'same-origin', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 
            'x-requested-with': 'XMLHttpRequest', 
            'sec-browsing-topics': '();p=P0000000000000000000000000000000', 
            'sec-fetch-user': '?1', 
            'upgrade-insecure-requests': '1', 
            'content-type': 'application/json', 
            'origin': 'https://vn.fifaaddict.com'
        },
        url: "https://vn.fifaaddict.com/api2?q=fo4db&locale=vn"
    };

    axios(config)
        .then(function (response) {
          console.log("RESPONSE: /API2/FCODB", JSON.stringify(response))
            res.status(200).send({
                status: "successful",
                payload: response.data.db
            });
        })
        .catch(function (error) {
            res.status(400).send({ status: "fail" });
        });
});

app.post("/api2/:id", (req, res) => {
    let fo4pid = req.params.id
    console.log("api2/:id", fo4pid)
    var config = {
        method: "GET",
        maxBodyLength: Infinity,
        headers: { 
            'accept': 'application/json, text/plain, */*', 
            'accept-language': 'en-US,en;q=0.9,vi;q=0.8', 
            'cookie': '_ga=GA1.2.1838188061.1714266606; sqslot={%22f%22:%224222%22%2C%22p%22:{%22cp10%22:%22aorbvndm%22%2C%22cp11%22:%22zwwaayll%22}%2C%22g%22:{%22cp10%22:%227%22%2C%22cp11%22:%226%22}}; __gads=ID=9b868b012f9cecbc:T=1713983535:RT=1719161211:S=ALNI_MbKx35VsSh-bsv4NsCgNsg8JGUoMw; __gpi=UID=00000df96488dff5:T=1713983535:RT=1719161211:S=ALNI_MZYdSyiT44UVtMuK2cJEnfa-KoQaw; __eoi=ID=cc208836d92f4c02:T=1713983535:RT=1719161211:S=AA-AfjZz-OR3qY8Aa2AIC7eJrT5S; FCNEC=%5B%5B%22AKsRol8Nv7faCMemkYnUNKJkmk8GeuDEh3lZ1dRWi31ceAheLVK9C7UA1t-YMA3wsOfh0zh7B80rzFpgkin8Vh1Svb_Cf1EDsPmKyaiLiNLYFGU7CPbV82LwRdgTlPiUfYkA4bM1GUjt-rwaka1_GDPVrbWlqUk4hg%3D%3D%22%5D%5D', 
            'dnt': '1', 
            'priority': 'u=1, i', 
            'referer': 'https://vn.fifaaddict.com/', 
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"', 
            'sec-ch-ua-mobile': '?0', 
            'sec-ch-ua-platform': '"Windows"', 
            'sec-fetch-dest': 'empty', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-site': 'same-origin', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 
            'x-requested-with': 'XMLHttpRequest', 
            'sec-browsing-topics': '();p=P0000000000000000000000000000000', 
            'sec-fetch-user': '?1', 
            'upgrade-insecure-requests': '1', 
            'content-type': 'application/json', 
            'origin': 'https://vn.fifaaddict.com'
        },
        url: `https://vn.fifaaddict.com/api2?fo4pid=pid${fo4pid}&locale=vn`
    };

    axios(config)
        .then(function (response) {
            res.status(200).send({
                status: "successful",
                payload: response.data
            });
        })
        .catch(function (error) {
            res.status(400).send({ status: "fail" });
        });
});

app.get("/api/get_avatar", async (req, res) => {
    const imageUrl = req.query.url;
    try {
        const response = await axios.head(imageUrl);
        if (response.status >= 200 && response.status < 400) {
            res.status(200).send({
                status: "success",
                payload: imageUrl
            });
        } else {
            res.status(200).send({
                status: "fail",
                payload: imageUrl
            });
        }
    } catch (error) {
        if (error.response) {
            res.status(200).send({
                status: "fail",
                payload: imageUrl
            });
        } else if (error.request) {
            res.status(200).send({
                status:"fail",
                payload: imageUrl
            });
        } else {

            res.status(200).send({
                status: "fail",
                payload: imageUrl
            });
        }
    }
    
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
