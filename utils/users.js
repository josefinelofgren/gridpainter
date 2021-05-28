const { push } = require('methods');

const users = [];

// Join user to chat
function userJoin(id, username, color) {
  const user = { id, username, color };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

//Function assign right colors to printfacit
function assignColorsToFacit(players, facit) {
  facit.forEach((square) => {
    if (square.color === null) {
      for (let i = 0; i < players.length; i++) {
        console.log(players[i][0].color);
        if (i === 0) square.color = players[i][0].color;
      }
    }
  });
  // players.forEach((player) => {
  //   console.log(player);

  //   facit.forEach((square) => {
  //     if (square.color === null) {
  //       square.color = player[0].color;
  //     }
  //   });
  // });
  return facit;
}

module.exports = {
  assignColorsToFacit,
  userJoin,
  getCurrentUser,
  userLeave,
};
