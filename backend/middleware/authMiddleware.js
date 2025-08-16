import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json("there is no token");
  } else {
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      try {
        const decoded = jwt.verify(token, "mony");
        console.log(decoded);
        req.user = decoded;
        next();
      } catch (error) {
        console.error("there was an error: ", error);
        res.status(401).json("failed to authorize token");
      }
    } else {
      return res.status(401).json("the sent token is bad");
    }
  }
}
