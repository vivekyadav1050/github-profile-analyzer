import dotenv from "dotenv";
import app from "./src/app.js";


dotenv.config();
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Welcome to Github analyzer API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});