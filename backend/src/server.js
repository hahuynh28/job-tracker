// src/server.js

import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 8080;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
