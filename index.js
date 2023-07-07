const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 3000 || process.env.PORT;

const app = express();

app.use(cors());

const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_msg", (data) => {
    socket.to(data.room).emit("receive_msg", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on PORT ${PORT}`);
});
