@echo off
cd server

if not exist "node_modules" (
    echo Installing dependencies for server...
    npm install
) else (
    echo Dependencies already installed for server.
)

REM 利用 netstat 檢查 80 埠是否被使用
netstat -aon | findstr ":80 " >nul
if %errorlevel%==0 (
    echo Port 80 server already used.
	pause
) else (
    echo Initial server...
    REM 在新視窗中啟動 server
    start node SocketIOServer.js
)

