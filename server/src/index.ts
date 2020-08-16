import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.resolve(__dirname, "/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/dist/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
