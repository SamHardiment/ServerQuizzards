const express = require("express");
const cors = require("cors");

const app = express();
const socket = require("socket.io");
require("dotenv").config();
app.use(cors());
app.use(express.json());
//Server Routes
const playersRoute = require("./routes/players");
const animalRoute = require("./routes/animals");
const foodRoute = require("./routes/food");
const randomRoute = require("./routes/random");
app.use("/players", playersRoute);
app.use("/animals", animalRoute);
app.use("/food", foodRoute);
app.use("/random", randomRoute);

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
        socket.emit("addPlayer", el.players, room, user);
        socket.to(room).emit("addPlayer", el.players, room, user);
      }
    });
  }
  function checkForUsers(room, isHost) {
    allRooms.forEach((el) => {
      if (el.room == room) {
        if (el.players.length === 4) {
          socket.emit("maxPartyError", room);
          socket.emit("attachRoom", "This room is full!");
          socket.join(room);
        } else {
          socket.emit("addMe", el.players, room, isHost);
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
      checkForUsers(room, true);
    } else {
      checkForUsers(room, false);
    }
  });

  //Adding username to list (checks if exists)
  socket.on("addUserPress", (user, room) => {
    updateUsers(user, room);
  });

  //Sending personal data to game page
  socket.on("sendData", (room, user, players, catergory, host) => {
    socket.emit("recieveData", room, user, players, catergory, host);
  });

  //Navigates everyone in same room
  socket.on("navigateAllPlayers", (room) => {
    socket.to(room).emit("navigateToGame");
  });

  //Game page socket

  //Messaging
  socket.on("sendMessage", (message, room, user) => {
    socket.to(room).emit("recieveMessage", message, room, user);
  });

  //Setting active player

  socket.on("sendActivePlayerChange", (activePlayer, room) => {
    socket.to(room).emit("recieveActivePlayerChange", activePlayer);
  });

  //Removing active player

  socket.on("sendRemoveActivePlayer", (activePlayer, room) => {
    socket.to(room).emit("recieveRemoveActivePlayer", activePlayer);
  });

  //Drawing

  socket.on("canvas-data", (data, room) => {
    socket.to(room).emit("canvas-data", data);
  });

  // Countdown

  //   socket.on('startRound', function(socket) {
  //     let countdown = 10;
  //     let roundTime = setInterval(function() {
  //     io.sockets.emit('counter', {countdown: countdown});
  //     countdown--;
  //     if (counter === 0) {
  //       io.sockets.emit('changeActivePlayer')
  //       clearInterval(roundTime)
  //     }
  //   }, 1000);
  //   })

  // All words

  socket.on("sendAllWords", (allWords, room) => {
    console.log(allWords);

    socket.emit("recieveAllWords", allWords);
  });
});

app.get("/", (req, res) => {
  res.send("hello server");
});

module.export = app;
