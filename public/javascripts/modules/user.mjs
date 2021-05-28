let getUserColor = document.getElementById('getUserColor');
let getUserName = document.getElementById('getUserName');

// GET USERNAME FROM URL
const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// GET RANDOM COLOR
function getRandomColor() {
  var letters = 'BCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

// GIVE USER A RANDOM COLOR
const color = getRandomColor();

let colorArray = [];

localStorage.setItem('colors', JSON.stringify(colorArray));

colorArray = JSON.parse(localStorage.getItem('colors') || '[]');

// PRINT CURRENT USERS USERNAME
function inputUser(username) {
  getUserName.innerHTML = '';
  getUserName.innerHTML = username;
}

// PRINT CURRENT USERS COLOR
function inputColor(color) {
  getUserColor.style.backgroundColor = color;
}

inputUser(username);
inputColor(color);

export { username, color };
