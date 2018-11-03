var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');
var rp = require('request-promise');

let numberOfUsers = 0;

function getRandomUser(url){
    let newUser = {};

    return rp(url).then(body => {
        // make the count be the resolved value of the promise
        let responseJSON = JSON.parse(body);
        let data = JSON.stringify(responseJSON.results[0], null, "\t");
        newUser["key"] = Date.now();
        newUser["id"] = "online";
        newUser["name"] = `${responseJSON.results[0].name.first} ${responseJSON.results[0].name.last}`;
        newUser["img"] = responseJSON.results[0].picture.thumbnail;
        return newUser;
    });

    // request('https://randomuser.me/api/',{ json: true }, function (error, response, body) {
    //
    //     // let data = JSON.parse(body.result);
    //     // console.log(body.results[0].name.first);
    //     newUser["key"] = Date.now();
    //     newUser["id"] = "online";
    //     newUser["name"] = `${body.results[0].name.first} ${body.results[0].name.last}`;
    //     newUser["img"] = body.results[0].picture.thumbnail;
    //
    // });
    // return newUser;


    // function fetchJSONFile(path, callback) {
        // var httpRequest = new XMLHttpRequest();
        // httpRequest.open('GET', 'https://randomuser.me/api/');
        // httpRequest.send();
        // httpRequest.onreadystatechange = function() {
        //     if (httpRequest.readyState === 4) {
        //         if (httpRequest.status === 200) {
        //             var data = JSON.parse(httpRequest.responseText);
        //             let newUser = {};
        //             // if (callback) callback(data);
        //             newUser["key"] = Date.now();
        //             newUser["id"] = "online";
        //             newUser["name"] = `${data.results[0].name.first} ${data.results[0].name.last}`;
        //             newUser["img"] = data.results[0].picture.thumbnail;
        //             return newUser;
        //         }
        //     }
        // };


    // }

    // fetchJSONFile('https://randomuser.me/api/', (data) => {
    //     // let newUser = {};
    //     this.newUser["key"] = Date.now();
    //     this.newUser["id"] = "online";
    //     this.newUser["name"] = `${data.results[0].name.first} ${data.results[0].name.last}`;
    //     this.newUser["img"] = data.results[0].picture.thumbnail;
    //     return this.newUser;
    // })

}


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

let activeUsers = [];


io.on('connection', function(socket){
    getRandomUser('https://randomuser.me/api/').then(count => {
        // use the count result in here
        console.log(count);
        activeUsers.push(count);
        io.emit('user connected', activeUsers);
    }).catch(err => {
        console.log('Got error from getNumResults ', err);
    });
    numberOfUsers++;
    console.log('a user connected');
    // socket.emit('message', {'message': 'hello world'});
    // console.log("randomUser: ", randomUser);
    // console.log("numberOfUsers: ", numberOfUsers);
    // activeUsers.push(randomUser);


    // if(numberOfUsers === 0) io.emit('user connected', activeUsers);

    console.log('activeUsers: ', activeUsers);


    // socket.on('user connected', function(activeUsers){
    //     // activeUsers.push(getRandomUser());
    //     getRandomUser();
    //     console.log(activeUsers, numberOfUsers);
    //     io.emit('user connected', activeUsers);
    // });

    socket.on('disconnect', function(){
        // numberOfUsers--;
        console.log('user disconnected', numberOfUsers);
        console.log('activeUsers: ', activeUsers);
        // io.emit('user disconnected', numberOfUsers);
    });

    // socket.on('chat message', function(msg){
    //     io.emit('chat message', msg);
    // });

    // socket.on('new user', function(user){
    //     activeUsers.push(user);
    //     io.emit('new user', user);
    // });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
