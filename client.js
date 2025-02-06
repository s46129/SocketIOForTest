// 引入 socket.io-client 模組
const io = require('socket.io-client');

// 連接到伺服器（請依實際情況修改 URL）
const socket = io('http://localhost:3000');

// 當連線成功時，顯示連線 ID
socket.on('connect', () => {
    console.log('已連線至伺服器，Socket ID:', socket.id);
});

// 利用 onAny 監聽所有事件並 log 出來（需要 socket.io-client v3 以上）
socket.onAny((event, ...args) => {
    console.log(`接收到事件：${event}`);
    console.log('事件資料：', args);
});

// 也可針對特定事件（例如："Download事件"）進行監聽
socket.on('Download事件', (data) => {
    console.log('接收到 Download事件，內容：', data);
});

// 監聽斷線事件
socket.on('disconnect', () => {
    console.log('已與伺服器斷線');
});
