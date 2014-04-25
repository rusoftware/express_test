var express = require('express'),
    app = express();
app.use(express.bodyParser());

var ARTICLES = [
  {
    id: 1,
    title: 'Desierto Verde',
    author: 'Arturo Jaureche',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 2,
    title: 'El crimen de la guerra (1870)',
    author: 'Juan Bautista Alberdi',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 3,
    title: 'Facundo o Civilización y Barbarie',
    author: 'Domingo Faustino Sarmiento',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];

var PHOTOS = [
  { id: 1, src: "http://imagenface.com/imagens/imagenes-de-paisajes-1.jpg" },
  { id: 2, src: "http://imagenface.com/imagens/imagenes-de-paisajes-8.jpg" },
  { id: 3, src: "http://imagenface.com/imagens/imagenes-de-paisajes-18.jpg" }
];

// No-brainer auth: server will authenticate with
// username "dev" and password "moravia", respond
// with a token, and forget the token when restarted.

var currentToken;
app.post('/auth.json', function(req, res) {

  var body = req.body,
      username = body.username,
      password = body.password;

  if (username == 'dev' && password == 'moravia') {
    // Generate and save the token (forgotten upon server restart).
    currentToken = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    res.send({
      success: true,
      token: currentToken
    });
  } else {
    res.send({
      success: false,
      message: 'Invalid username/password'
    });
  }
});

function validTokenProvided(req, res) {

  // Check POST, GET, and headers for supplied token.
  var userToken = req.body.token || req.param('token') || req.headers.token;

  if (!currentToken || userToken != currentToken) {
    res.send(401, { error: 'Invalid token. You provided: ' + userToken });
    return false;
  }

  return true;
}

app.get('/articles.json', function(req, res) {
  if (validTokenProvided(req, res)) {
    res.send(ARTICLES);
  }
});

// Returns URL to pic of the day.
app.get('/photos.json', function(req, res) {
  if (validTokenProvided(req, res)) {
    res.send(PHOTOS);
  }
});



app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log('Listening on port 3000...');
