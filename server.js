var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let numberOfUsers = 0;

function getRandomUser(){
    function fetchJSONFile(path, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var data = JSON.parse(httpRequest.responseText);
                    if (callback) callback(data);
                }
            }
        };
        httpRequest.open('GET', path);
        httpRequest.send();
    }

    fetchJSONFile('https://randomuser.me/api/', (data) => {
        let newUser = {};
        newUser["key"] = Date.now();
        newUser["id"] = "online";
        newUser["name"] = `${data.results[0].name.first} ${data.results[0].name.last}`;
        newUser["img"] = data.results[0].picture.thumbnail;
        console.log(newUser);
        return newUser;
    });
}


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

let activeUsers = [];

io.on('connection', function(socket){
    numberOfUsers++;
    console.log('a user connected');
    socket.emit('message', {'message': 'hello world'});
    activeUsers.push(getRandomUser());
    socket.emit('user connected', activeUsers);


    // socket.on('user connected', function(activeUsers){
    //     // activeUsers.push(getRandomUser());
    //     getRandomUser();
    //     console.log(activeUsers, numberOfUsers);
    //     io.emit('user connected', activeUsers);
    // });

    socket.on('disconnect', function(){
        numberOfUsers--;
        console.log('user disconnected', numberOfUsers);
        io.emit('user disconnected', numberOfUsers);
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    // socket.on('new user', function(user){
    //     activeUsers.push(user);
    //     io.emit('new user', user);
    // });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
