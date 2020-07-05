const KEY = 'express.sid',
    SECRET = 'express',
    express = require("express"),
    app = express(),
    Fs = require('fs'),
    options = {
        key: Fs.readFileSync('key.pem'),
        cert: Fs.readFileSync('cert.pem')
    },
    server = require("https").createServer(options, app),
    io = require("socket.io").listen(server),
    cookie = express.cookieParser(SECRET)
    , store = new express.session.MemoryStore()
   , session = express.session({secret: SECRET
                              , key: KEY
                              , store: store});


    app.configure(()=>{
        app.set('view engine', 'ejs');
        app.use(cookie);
        app.use(session);
    })

rotas=require("src/routes")(app)
server.listen(3001, function(){
    console.log("Express e Socket.IO no ar.");
  });

   // Configurações do Socket.IO
 io.set('authorization', function(data, accept) {
    cookie(data, {}, function(err) {
      if (!err) {
        var sessionID = data.signedCookies[KEY];
        store.get(sessionID, function(err, session) {
          if (err || !session) {
            accept(null, false);
          } else {
            data.session = session;
            accept(null, true);
          }
        });
      } else {
        accept(null, false);
      }
    });
  });
  io.sockets.on('connection', function (client) {
    var session = client.handshake.session
      , nome = session.nome;
    client.on('toServer', function (msg) {
      msg = "<b>"+nome+":</b> "+msg+"<br>";
      client.emit('toClient', msg);
      client.broadcast.emit('toClient', msg);
    });
  });