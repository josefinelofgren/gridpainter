var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');
const socketio = require('socket.io');
const randomColor = require('randomcolor');
let color = randomColor();
const fs = require("fs");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var jsonParser = bodyParser.json();



//GET SAVEDPIC FROM CLIENT AND PUSH TO ALLDRAWNPICS.JSON
app.post('/pic', jsonParser, (req, res, next) => {
  fs.readFile('allDrawnPics.json', (err, data) => {
    if (err) console.log('err', err);

    const allDrawnPics = JSON.parse(data);

    //check for pic in allDrawnPics with same name as incoming
    let checkDoublet = allDrawnPics.findIndex(
      (arr) => arr[0].name === req.body[0].name
    );

    //if pic doesnt already exist => push, else => replace
    if (checkDoublet === -1) {
      allDrawnPics.push(req.body);
    } else {
      allDrawnPics.splice(checkDoublet, 1, req.body);
    }

    //resave updated file
    fs.writeFile(
      'allDrawnPics.json',
      JSON.stringify(allDrawnPics, null, 2),
      (err) => {
        if (err) console.log('err', err);
      }
    );

    //dont want to send anything?
    res.send('nothingToSend');
  });
});

//GET ALLDRAWNPICS FROM ALLDRAWNPICS.JSON
app.get('/pic', function (req, res, next) {
  fs.readFile('allDrawnPics.json', (err, data) => {
    if (err) console.log('err', err);

    const allDrawnPics = JSON.parse(data);

    res.send(allDrawnPics);
  });
});

const server = require('http').Server(app);
const io = socketio(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



const botName = 'Admin';
const players = [];

io.on('connection', function (socket) {
  console.log('Socket.io connected');

  // WHEN USER JOIN GAME
  socket.on('joinGame', ({ username, color }) => {
    // Join user


    // function getRandomLetter() {
    //     const letters = ["a", "b", "c", "d"];
        
    //     return letter;
    // }
    // console.log('letter', letter);





    const user = userJoin(socket.id, username, color);
    socket.join(user);

    // Welcome message
    socket.emit('message', formatMessage(botName, 'Welcome to Pixel-art!'));

    // Broadcast when user connects
    socket.broadcast.emit(
      'message',
      formatMessage(botName, `${user.username} has joined the chat`)
    );
  });

  // recieve savedPic from client
  socket.on('paint', (foundCell) => {
    //send changed array obj to client
    io.emit('paintedCell', foundCell);
  });

  //waiting for players to join
  socket.on("gameAwait", (player) => {

    //push player when click on "play"
    players.push(player);

    //move if(length === 3)here? 
    io.emit('beginGame', players);

    //print players in client
    io.emit('printPlayers', players)

});

//when time is up
socket.on("timeUp", (player) => {

    //empty players array 
    players.splice(0,players.length);
    
    // print players in client 
    io.emit('printPlayers', players);
    
    //leaveGame
    io.emit('leaveGame', players);

});


    //remove player on "stopBtn" 
    socket.on("playerLeaving", (player) => {
    
        for( let i = 0; i < players.length; i++){ 
                                
            if ( players[i] === player) { 
                players.splice(i, 1); 
        
            };
        };
        
        // print players in client 
        io.emit('printPlayers', players);

        //if players.length === 0  => leaveGame
        if(players.length === 0) {
      
            io.emit('leaveGame', players);

        };

    });

    let randomIndex = Math.floor(Math.random() * 5) 

    //GET PIC TO COPY
    socket.on("getFacitPic", (player) => {
        
        //get .json file
        fs.readFile('facit.json', (err, data) => {
            if (err) console.log('err', err);
        
            const facit = JSON.parse(data);
            
            //generate random index
            let printFacit = facit[0];

            //send random pic array
            io.emit('printFacit', printFacit);

        });

    });


  // CHAT MESSAGES
  socket.on('chatMessage', (inputMsg) => {
    const user = getCurrentUser(socket.id);
    io.emit('message', formatMessage(user.username, inputMsg, user.color));
  });

  // USER DISCONNECTS
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );
    }
  });

  // PLAY GAME
  socket.on('playGame', ({ username, color }) => {
    const user = userJoin(socket.id, username, color);
    socket.join(user);
  });
});

module.exports = { app: app, server: server };
