const moment = require('moment');

function formatMessage(username, text, color){
    return {
        username,
        text,
        color,
        time: moment().format('h:mm a')
    }
};

function playerPaint(username, color){
    return {
        username,
        color,
    }
};


module.exports = {formatMessage, playerPaint};