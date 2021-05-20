var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const randomColor = require('randomcolor');
const socketio = require('socket.io');
let color = randomColor();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const server = require('http').Server(app);
const io = socketio(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const botName = 'Admin'

io.on('connection', function(socket){

    console.log('connected');


    // WHEN USER JOIN GAME 
    socket.on('joinGame', ({username, color}) => {

        // Join user 
        const user = userJoin(socket.id, username, randomColor({luminosity: 'light'}));
        socket.join(user);

        // Welcome message 
        socket.emit('message', formatMessage(botName, 'Welcome'));

        // Broadcast when user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
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
});

module.exports = {app: app, server: server};
