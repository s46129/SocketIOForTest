const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('已連線至伺服器，Socket ID:', socket.id);
});

socket.on('disconnect', (reason) => {
    console.log('已與伺服器斷線，原因:', reason);
});

socket.on('error', (error) => {
    console.error('連線錯誤:', error);
});

// 使用 onAny 監聽所有事件
socket.onAny((event, ...args) => {
    console.log(`接收到事件：${event}`, args);
});
