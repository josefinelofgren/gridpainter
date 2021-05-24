const moment = require('moment');

function formatMessage(username, text, color){
    return {
        username,
        text,
        color,
        time: moment().format('h:mm a')
    }
}


module.exports = formatMessage;