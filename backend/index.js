const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { userInput, todoInput } = require("./zodParser");
const Authenticate = require("./authMiddleware");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", (req, res) => {
  const response = userInput.safeParse(req.body);
  if (!response.success) {
    res.json({
      message: "Incorrect inputs",
    });
  } else {
    const { username, password } = req.body;
    prisma.user
      .findUnique({
        where: { username: username },
      })
      .then((exists) => {
        if (exists) {
          res.json({
            message: "Duplicate User",
          });
        } else {
          prisma.user
            .create({
              data: {
                username: username,
                password: password,
              },
            })
            .then(() => {
              res.json({
                message: "New User added",
              });
            });
        }
      });
  }
});

app.post("/signin", (req, res) => {
  const response = userInput.safeParse(req.body);
  if (!response.success) {
    res.json({
      message: "Incorrect inputs",
    });
  } else {
    const { username, password } = req.body;
    prisma.user
      .findFirst({
        where: {
          username: username,
          password: password,
        },
      })
      .then((user) => {
        if (!user) {
          res.json({
            message: "Unauthorized",
          });
        } else {
          const token = jwt.sign({ username: user.username }, "287random");
          res.json({ token });
        }
      });
  }
});

app.post("/todos", Authenticate, (req, res) => {
  const response = todoInput.safeParse(req.body);
  if (!response.success) {
    res.json({
      message: "Incorrect inputs",
    });
  } else {
    const todo = req.body.todo;
    prisma.user
      .findUnique({
        where: { username: req.username },
      })
      .then((user) => {
        if (!user) {
          res.json({
            message: "Unauthorized",
          });
        } else {
          prisma.todos
            .create({
              data: { todo: todo, userId: user.id },
            })
            .then((newTodo) => {
              res.json(newTodo);
            });
        }
      });
  }
});

app.get("/todos", Authenticate, (req, res) => {
  prisma.user
    .findUnique({
      where: { username: req.username },
    })
    .then((user) => {
      if (!user) {
        res.json({
          message: "Unauthorized",
        });
      } else {
        prisma.todos
          .findMany({
            where: {
              userId: user.id,
            },
          })
          .then((todos) => {
            res.json({ todos: todos });
          });
      }
    });
});

app.delete("/todos/:id", Authenticate, (req, res) => {
  const todoid = parseInt(req.params.id);
  const currentuser = req.username;
  prisma.user
    .findUnique({
      where: {
        username: currentuser,
      },
    })
    .then((user) => {
      if (!user) {
        res.json({
          message: "Unauthorized",
        });
      } else {
        prisma.todos
          .deleteMany({
            where: {
              id: todoid,
              userId: user.id,
            },
          })
          .then(() => {
            res.json({
              message: "Todo has been deleted",
            });
          });
      }
    });
});

app.listen(7000, () => {
  console.log("Server started at http://localhost:7000");
});
