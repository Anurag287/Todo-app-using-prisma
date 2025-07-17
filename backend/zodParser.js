const zod = require("zod");

let userInput = zod.object({
  username: zod.string().max(20).min(5),
  password: zod.string().max(20).min(5)
})

let todoInput = zod.object({
  todo: zod.string().max(50).min(5)
})

module.exports = {
    userInput,
    todoInput
}