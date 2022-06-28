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

let allRooms = [];
io.on("connection", (socket) => {
  //Helper functions
  function updateUsers(user, room) {
    allRooms.forEach((el) => {
      if (el.room == room) {
        el.players.push(user);
        socket.emit("addPlayer", el.players, room);
        socket.to(room).emit("addPlayer", el.players, room);
      }
    });
  }
  function checkForUsers(room) {
    allRooms.forEach((el) => {
      if (el.room == room) {
        if (el.players.length === 4) {
          socket.emit("maxPartyError", room);
          socket.emit("attachRoom", "This room is full!");
          socket.join(room);
        } else {
          socket.emit("addPlayer", el.players, room);
          socket.to(room).emit("addPlayer", el.players, room);
          socket.emit("attachRoom", room);
          socket.join(room);
        }
      }
    });
  }

  //Socket Requests

  //Home page socket

  //Joining room (checks if more than 5)
  socket.on("joinRoomPress", (room) => {
    if (!allRooms.find((el) => el.room == room)) {
      allRooms.push({ room, players: [], messages: [] });

      // console.log(room, allRooms);
    }
    checkForUsers(room);
  });

  //Adding username to list (checks if exists)
  socket.on("addUserPress", (user, room) => {
    updateUsers(user, room);
  });

  //Sending personal data to game page
  socket.on("sendData", (room, user, players) => {
    socket.emit("recieveData", room, user, players);
  });

  //Navigates everyone in same room
  socket.on("navigateAllPlayers", (room) => {
    socket.to(room).emit("navigateToGame");
  });

  //Game page socket

  socket.on("sendMessage", (message, room, user) => {
    console.log(message);
    socket.to(room).emit("recieveMessage", message, room, user);
  });
});

app.get("/", (req, res) => {
  res.send("hello server");
});

module.export = app;
