const express = require("express");
const cors = require("cors");
require("express-async-catch");
require("dotenv").config();
const path = require("path");
const { userRouter } = require("./routs/userRoute");
const { chatRoute } = require("./routs/chatRoute");
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:4000",
  })
);
app.use(express.json());
app.use("/user", userRouter);
app.use(chatRoute);

const server = app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server run on port ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4000",
  },
});

let users = [];
const addUser = (user, ids) => {
  if (users.length === 0) {
    users.push({ name: user, id: ids });
  } else {
    users.map((el) => {
      if (el.name === user) {
        el.id = ids;
      } else {
        users.push({ name: user, id: ids });
      }

      let duplicate = [];
      let isDuplicate = false;
      users = users.filter((el) => {
        isDuplicate = duplicate.includes(el.name);
        if (!isDuplicate) {
          duplicate.push(el.name);
          return true;
        } else {
          return false;
        }
      });
      return users;
    });
  }

  // console.log(users, "addd");
};

const removeUser = (ids) => {
  users = users.filter((el) => el.id !== ids);

  let duplicate = [];
  let isDuplicate = false;
  users = users.filter((el) => {
    isDuplicate = duplicate.includes(el.name);
    if (!isDuplicate) {
      duplicate.push(el.name);
      return true;
    } else {
      return false;
    }
  });
  // console.log(users, "filterdd");
  return users;
};

io.on("connection", (socket) => {
  socket.on("com", (user) => {
    if (user !== "") {
      addUser(user, socket.id);
      io.emit("aaa", users);
      // console.log("###################################");
    }
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("aaa", users);
    // console.log("#######################################");
  });
  socket.on("typing t", (bool, room) => {
    socket.join(room);
    socket.broadcast.to(room).emit("typing true", bool);
  });
  socket.on("typing f", (bool, room) => {
    socket.join(room);
    socket.broadcast.to(room).emit("typing false", bool);
  });
  socket.on("aa", (messages, room) => {
    socket.join(room);
    socket.to(room).emit("bb", messages);
  });
  socket.on("sen aaaa", (val) => {
    io.emit("rec aaaa", val);
  });
  socket.on("sen bbbb", (val) => {
    io.emit("rec bbbb", val);
  });
  socket.on("sen dddd", (val) => {
    io.emit("rec dddd", val);
  });
  socket.on("a1", (val) => {
    io.emit("a2", val);
  });
  socket.on("bb1", (val) => {
    io.emit("bb2", val);
  });
  socket.on("cc1", (val) => {
    io.emit("cc2", val);
  });
  socket.on("ff1", (val) => {
    io.emit("ff2", val);
  });
  // socket.on("ss0", (name) => {
  //   //const id = allUsers.filter((el) => el.name === name);
  //   socket.join(name);
  //   socket.to(name).emit("ss1", "############################");
  //   console.log(name);
  // });
});
