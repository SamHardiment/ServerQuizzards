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
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, "hello1");
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
