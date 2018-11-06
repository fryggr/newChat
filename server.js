var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var rp = require('request-promise');

let numberOfUsers = 0;
let userId = '';

function getRandomUser(url){
    let newUser = {};

    return rp(url).then(body => {
        // make the count be the resolved value of the promise
        let responseJSON = JSON.parse(body);
        newUser["key"] = userId;
        newUser["id"] = "online";
        newUser["name"] = `${responseJSON.results[0].name.first} ${responseJSON.results[0].name.last}`;
        newUser["img"] = responseJSON.results[0].picture.thumbnail;
        return newUser;
    });

}

function deleteUser(id){
    activeUsers.forEach((item, index) => {
        if(id === item.key){
            activeUsers.splice(index, 1)
        }
    })
}


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

let activeUsers = [];


io.on('connection', function(socket){

    userId = socket.id;
    getRandomUser('https://randomuser.me/api/').then(count => {
        // use the count result in here
        console.log(count);
        activeUsers.push(count);
        io.emit('user connected', activeUsers, numberOfUsers);
    }).catch(err => {
        console.log('Got error from getNumResults ', err);
    });
    numberOfUsers++;
    console.log('a user connected');
    console.log("numberOfUsers: ", numberOfUsers);

    socket.on('disconnect', function(){
        numberOfUsers--;
        deleteUser(socket.id);
        console.log('user disconnected', numberOfUsers, socket.id);
        io.emit('user disconnected', activeUsers, numberOfUsers);
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '37.1.218.55',
  user     : 'ecampus',
  password : 'G8c4M0n1',
  database: 'ecampus_test'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')

  connection.query('SELECT * FROM users where id=1', function(err, results) {
    if (err) throw err
    console.log(results[0])
  })
})


// connection.end();
