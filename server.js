var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let numberOfUsers = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    numberOfUsers++;
    console.log('a user connected', numberOfUsers);
    io.emit('user connected', numberOfUsers);

    socket.on('disconnect', function(){
        numberOfUsers--;
      console.log('user disconnected', numberOfUsers);
      io.emit('user disconnected', numberOfUsers);
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
