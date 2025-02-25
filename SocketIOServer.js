const os = require('os');
const http = require('http');
const { Server } = require('socket.io');

// 取得本機 IPv4 位址的函式 (可依需求調整)
function getLocalIPAddress() {
  return '127.0.0.1';
}

const serverIP = getLocalIPAddress();
const port = 8080;

// 建立 HTTP Server
const httpServer = http.createServer();

// 建立 Socket.IO Server，綁定在同一個 HTTP Server 上
const io = new Server(httpServer, {
  // 這裡可設定 Socket.IO 的相關參數，例如 CORS 等
});

io.on('connection', (socket) => {
  console.log('A new client connected');

  // 回傳給新連線的客戶端一些訊息
  socket.emit('message', 'Connect To Server Successfully');
  socket.emit('message', `PlayerCount:${io.engine.clientsCount}`);

  // 廣播給其他已連線的客戶端
  socket.broadcast.emit('message', 'OnNewPlayerJoin');

  // 監聽客戶端傳來的 'message' 事件，並向所有人廣播
  socket.on('message', (message) => {
    console.log('received:', message);
    // 廣播給所有已連線的客戶端 (包含自己)
    io.emit('message', message);
    console.log('send:', message);
  });
});

// 讓 HTTP Server 監聽指定 IP 與 port
httpServer.listen(port, serverIP, () => {
  console.log(`Socket.IO server is running on http://${serverIP}:${port}`);
});
