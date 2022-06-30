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
        el.points.push({ user, points: 0 });
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
      allRooms.push({ room, players: [], points: [] });
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
  socket.on("sendData", (room, user, players, catergory, mode, host) => {
    socket.emit("recieveData", room, user, players, catergory, mode, host);
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

  //Clearing slate

  socket.on("sendBlankSlate", (room) => {
    socket.to(room).emit("recieveBlankSlate");
  });

  //Setting hard mode

  socket.on("sendHardMode", (room) => {
    socket.to(room).emit("recieveHardMode");
  });

  // Send Catergory
  socket.on("sendCatergory", (catergoryChoice, room) => {
    socket.to(room).emit("recieveCatergory", catergoryChoice);
  });
  socket.on("sendCatergoryHost", (catergoryChoice, room) => {
    socket.emit("recieveCatergoryHost", catergoryChoice, room);
  });

  // All words

  socket.on("sendAllWords", (allWords, room) => {
    socket.emit("recieveAllWords", allWords);
  });

  // Send Current Word to all room members

  socket.on("sendRandomWord", (randomWord, room) => {
    socket.emit("recieveRandomWord", randomWord);
    socket.to(room).emit("recieveRandomWord", randomWord);
  });

  //Adding points on correct guess

  socket.on("sendPointsBegin", (room) => {
    let points;

    allRooms.forEach((el) => {
      if (el.room == room) {
        points = el.points;
        socket.emit("recievePointBegin", room, points);
        socket.to(room).emit("recievePointBegin", room, points);
      }
    });
  });
  socket.on("sendPointChange", (room, user) => {
    let points;

    allRooms.forEach((el) => {
      if (el.room == room) {
        points = el.points;

        el.points.forEach((player) => {
          if (user == player.user) {
            player.points += 100;
          }
        });
      }
    });

    socket.emit("recievePointChange", room, points);
    socket.to(room).emit("recievePointChange", room, points);
  });

  //On guessed
  socket.on("sendGuessed", (room, user) => {
    allRooms.forEach((el) => {
      if (el.room == room) {
        socket.emit("recieveGuessed", user);
        socket.to(room).emit("recieveGuessed", user);
      }
    });
  });
  socket.on("sendClearGuessed", (room, user) => {});
  //On gameover
  socket.on("sendNavigateToGameOver", (room) => {
    socket.to(room).emit("recieveNavigateToGameOver");
  });
});

app.get("/", (req, res) => {
  res.send("hello server");
});

module.export = app;
