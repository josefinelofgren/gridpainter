var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const socketio = require('socket.io');
const randomColor = require('randomcolor');
let color = randomColor();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
//if we go with .json
//istallera fs
const fs = require("fs");


//GET DOCUMENT FOR EDITING


//GET SAVEDPIC FROM CLIENT AND PUSH TO ALLDRAWNPICS.JSON
app.post('/', jsonParser, (req, res, next) => {
console.log('req body', req.body[0].name);
 
    fs.readFile("allDrawnPics.json", (err, data) => {
        if(err) console.log('err', err);

        const allDrawnPics = JSON.parse(data);
        // for (let arr in allDrawnPics) {
        //     console.log('allDrawnPics[arr].name', allDrawnPics[arr][0].name);
        // }
        //push or replace to array with all saved 
        //not finished!
        let checkDoublet = allDrawnPics.findIndex( (arr) => arr[0].name === req.body[0].name);
        console.log('cechDoulert', checkDoublet);
        console.log('allDrawnPics[checkDoublet]', allDrawnPics[checkDoublet]);
        if (checkDoublet === -1) {
            allDrawnPics.push(req.body);
        } else {
            allDrawnPics.splice(checkDoublet, 1, req.body)
        }

        fs.writeFile("allDrawnPics.json", JSON.stringify(allDrawnPics, null, 2), (err) => {
            if(err) console.log('err', err);
        });
        //dont want to send anything?
        res.send("nothingToSend");

    });

  
});

// //GET ALLDRAWNPICS FROM ALLDRAWNPICS.JSON
// app.get('/', function(req, res, next) {

//     fs.readFile("allDrawnPics.json", (err, data) => {
//         if(err) console.log('err', err);

//         const allDrawnPics = JSON.parse(data);

//         res.send(allDrawnPics);

//     });

// });




const server = require('http').Server(app);
const io = socketio(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//initial array for drawing pic
//let savedPic = [];

const botName = 'Admin'

io.on('connection', function(socket){

    console.log('Socket.io connected');


    // WHEN USER JOIN GAME 
    socket.on('joinGame', ({username, color}) => {

        // Join user 
        const user = userJoin(socket.id, username, color);
        socket.join(user);
        
        // Welcome message 
        socket.emit('message', formatMessage(botName, 'Welcome to Pixel-art!'));

        // Broadcast when user connects
        socket.broadcast.emit('message', formatMessage(botName, `${user.username} has joined the chat`));
    });

    // recieve savedPic from client
    socket.on("paint", (foundCell) => {

        //send changed array obj to client
        io.emit('paintedCell', foundCell);
       
    });



    // CHAT MESSAGES 
    socket.on('chatMessage', (inputMsg) => {
        const user = getCurrentUser(socket.id);
        
        io.emit('message', formatMessage(user.username, inputMsg, user.color));
        console.log(inputMsg);
    });



    // USER DISCONNECTS 
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user){
          io.emit('message', formatMessage(botName, `${user.username} has left the chat`));
        };

    });



    // PLAY GAME 
    socket.on('playGame', ({username, color}) => {
        const user = userJoin(socket.id, username, color);
        socket.join(user);
    });
    
    const players = [];
    // WHEN USER PRESS PLAY
    socket.on('play', () => {
        const user = getCurrentUser(socket.id);
        io.emit('ready', formatMessage(user.username, `${user.username} is ready to play`));
    });


});

module.exports = {app: app, server: server};
