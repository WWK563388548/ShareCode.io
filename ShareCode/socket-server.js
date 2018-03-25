var socketIO = require('socket.io');
var ot = require('ot');
var roomList = {};

module.exports = function(server) {
    var str = '//This is a Markdown heading \n\n' + 
              'var i = i + 1;';

    var io = socketIO(server);
    io.on('connection', function(socket){
        socket.on('joinRoom', function(data){
            if(!roomList[data.room]) {
                var socketIOServer = new ot.EditorSocketIOServer(str, [], data.room, function(socket, cb){
                    var self = this;
                    Task.findByIdAndUpdate(data.room, {content: self.document}, function(err) {
                        if(err) {
                            return cb(false);
                        }
                        cb(true);
                    });
                });
                roomList[data.room] = socketIOServer;
            }
            roomList[data.room].addClient(socket);
            roomList[data.room].setName(socket, data.username);

            socket.room = data.room;
            socket.join(data.room);
        });

        socket.on('chatMessage', function(data){
            io.to(socket.room).emit('chatMessage', data);
        });

        socket.on('disconnect', function(){
            socket.leave(socket.room);
        });
    });
}