// server.js
// where your node app starts

// init project
const express = require('express'),
      app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
});

app.get('/:timestamp', (request, response) => {
  response.send(getDateInfo(request.params.timestamp));
});

let getDateInfo = potentialTimestamp => {
  
  let dateInfo = (Number.isInteger(+potentialTimestamp)) ? new Date(potentialTimestamp * 1000) : new Date(decodeURI(potentialTimestamp)) 
  
  return {
    'unix': (dateInfo.getTime() / 1000) || null,
    'natural': formatDate(dateInfo)
  };
};

let formatDate = date => {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  if (!date.getTime()) { return null; }
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
