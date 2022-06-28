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
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoomPress", (room) => {
    socket.emit("attachRoom", room);
    socket.join(room);
  });
  socket.on("addUserPress", (user, room) => {
    socket.to(room).emit("addPlayer", user, room);
  });
  socket.on("sendMessage", (message, room,user) => {
    console.log(message)
    socket.to(room).emit("recieveMessage", user, room);
  });
});

app.get("/", (req, res) => {
  res.send("hello server");
});

/* mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
 */
module.exports = app;
