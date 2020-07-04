const app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    expressLayouts = require('express-ejs-layouts'),

    port = 3001;

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use("/", require("./src/routes"));
app.use(express.static(__dirname + '/'));

io.on('Connection', (socket) => {
    socket.on("teste"), (msg) => {
        io.emit("teste", msg);
}
});
http.listen(port,()=>{
    console.log("online")
})