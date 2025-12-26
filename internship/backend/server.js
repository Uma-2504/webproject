import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

