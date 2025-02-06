const express = require('express');
const http = require('http');
const os = require('os');
const { Server } = require('socket.io');

// 建立 Express 應用程式與 HTTP 伺服器
const app = express();
const server = http.createServer(app);

// 初始化 Socket.IO 伺服器
const io = new Server(server);

// 當有客戶端連線時
io.on('connection', (socket) => {
    console.log('新客戶端連線，ID:', socket.id);

    // 監聽來自 host 的訊息，資料格式：{ eventName: 'Download事件', message: '下載開始' }
    socket.on('hostMessage', (data) => {
        const { eventName, message } = data;
        console.log(`收到來自 host 的訊息 - 事件名稱: ${eventName}，內容: ${message}`);

        // 廣播給所有客戶端（包含發送者）
        //io.emit(eventName, message);
        // 若要排除發送者，請改用以下寫法：
        socket.broadcast.emit(eventName, message);
    });

    // 監聽客戶端斷線事件
    socket.on('disconnect', () => {
        console.log('客戶端斷線，ID:', socket.id);
    });
});

// 輔助函數：取得所有非內部（external）的 IPv4 位址
function getServerIPs() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const name in interfaces) {
        for (const iface of interfaces[name]) {
            // 過濾 IPv4 且非內部回環位址
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        }
    }
    return addresses;
}

// 設定伺服器監聽埠號（例如 3000），並在啟動時 log IP 位址
server.listen(3000, () => {
    console.log('Socket.IO 伺服器正在 3000 埠上運行');

    const ips = getServerIPs();
    if (ips.length > 0) {
        console.log('伺服器 IP 位址：');
        ips.forEach(ip => {
            console.log(`http://${ip}:3000`);
        });
    } else {
        console.log('找不到外部網路介面的 IP 位址');
    }
});
