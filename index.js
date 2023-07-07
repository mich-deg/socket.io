const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const http = require("http");
const server = http.createServer(app);

const io = new Server(server);

const PORT = 3000 || process.env.PORT;

// Static Middleware
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on PORT ${PORT}`);
});
