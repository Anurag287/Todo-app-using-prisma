const jwt = require("jsonwebtoken");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

function Authenticate(req, res, next) {
  const token = req.headers.authorization;
  try {
    const currentuser = jwt.verify(token, "287random");
    prisma.user.findUnique({
      where: { username: currentuser.username }
    }).then((exists) => {
      if (exists) {
        req.username = currentuser.username;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    });
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = Authenticate;