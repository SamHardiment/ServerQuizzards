const express = require("express");
const cors = require("cors");

const app = express();
const socket = require("socket.io");
require("dotenv").config();
app.use(cors());
app.use(express.json());
//Server Routes
const playersRoute = require("./routes/players");
app.use("/players", playersRoute);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

//IO connections and functions
const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let players = [];
io.on("connection", (socket) => {
  //Helper functions
  function updateUsers(user, room) {
    players.forEach((el) => {
      if (el.room == room) {
        el.players.push(user);
        socket.emit("addPlayer", el.players, room);
        socket.to(room).emit("addPlayer", el.players, room);
      }
    });
  }
  function checkForUsers(room) {
    players.forEach((el) => {
      if (el.room == room) {
        socket.emit("addPlayer", el.players, room);
        socket.to(room).emit("addPlayer", el.players, room);
      }
    });
  }

  //Socket Requests

  //Home page socket
  socket.on("joinRoomPress", (room) => {
    socket.emit("attachRoom", room);
    socket.join(room);

    if (!players.find((el) => el.room == room)) {
      players.push({ room, players: [] });
    }
    checkForUsers(room);
  });

  socket.on("addUserPress", (user, room) => {
    updateUsers(user, room);
  });

  socket.on("sendData", (room, user, players) => {
    socket.emit("recieveData", room, user, players);
  });

  //Game page socket

  socket.on("sendMessage", (message, room, user) => {
    console.log(message);
    socket.to(room).emit("recieveMessage", user, room);
  });
});

app.get("/", (req, res) => {
  res.send("hello server");
});

module.export = app;
