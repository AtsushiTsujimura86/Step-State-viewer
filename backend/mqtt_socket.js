const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mqtt = require('mqtt');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

const mqttClient = mqtt.connect('mqtt://localhost');

mqttClient.on('connect', () =>{
    console.log('connected MQTT broker');
    mqttClient.subscribe('device/log');
})

mqttClient.on('message', (topic, message) => {
  const log = message.toString();
  console.log(`📥 MQTT受信: ${log}`);
  io.emit('state_log', log); // 🔁 Reactクライアントに転送
});

// WebSocketルート
io.on('connection', (socket) => {
  console.log(`🧩 クライアント接続: ${socket.id}`);
});

server.listen(3000, () => {
  console.log('🚀 サーバー起動：http://localhost:3000');
});
