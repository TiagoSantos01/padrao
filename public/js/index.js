function carregam() {
    canvas = document.querySelector("canvas");
    await carregamento('script', { src: 'socket.io/socket.io.js' });
    socket=io.connect('/');
    socket.emit("salas",{name:'Tiago',msg:'ola',x:0,y:0});

}