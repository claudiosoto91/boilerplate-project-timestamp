// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get('/api', (req, res) => {
  const utc = new Date();
  const unix = utc.getTime();
  res.json({
    'unix': unix,
    'utc': utc
  });
});
app.get("/api/:date?", function (req, res) {
  let date_string = req.params.date;
  let date;

  if (date_string.includes("-")) {
    date = new Date(date_string);
  }

  else {
    let millisecondDate_string = parseInt(date_string); 
    date = new Date(millisecondDate_string);
  }

  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }else{
    res.json({
      'unix': date.valueOf(),
      'utc': date.toUTCString()
    });
  }
  

    
}   
);

    // if(date.length > 10){
    //   const utc = new Date(parseInt(date));
    //   const unix = utc.getTime();
    //   res.json({
    //     'unix': unix,
    //     'utc': utc
    //   });
    // }else{
    //   const utc = new Date(date);
    //   const unix = utc.getTime();
    //   res.json({
    //     'unix': unix,
    //     'utc': utc
    //   });
    // }


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
