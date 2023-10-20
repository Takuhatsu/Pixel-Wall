const express = require("express");
const fs = require("fs");
const url = require("url");

const app = express();
const port = 8000;

const canvas = new Array(143);
for (let i = 0; i <= 143; i++) {
  canvas[i] = new Array(143);
}

app.use((req, res, next) => {
  console.log(`${req.socket.remoteAddress} "${req.url}"`);
  next();
});

app.get("/", (req, res) => {
  fs.readFile("./index.html", (err, data) => {
    if (err) {
      res.status(500).end("Internal Server Error");
    } else {
      res.end(data);
    }
  });
});

app.get("/script.js", (req, res) => {
  fs.readFile("./script.js", (err, data) => {
    if (err) {
      res.status(500).end("Internal Server Error");
    } else {
      res.end(data);
    }
  });
});

app.get("/style.css", (req, res) => {
  fs.readFile("./style.css", (err, data) => {
    if (err) {
      res.status(500).end("Internal Server Error");
    } else {
      res.end(data);
    }
  });
});

app.get("/put-pixel", (req, res) => {
  const current_url = url.parse(req.url, true);
  const x = current_url.query.x;
  const y = current_url.query.y;
  const color = current_url.query.color;
  canvas[x][y] = color;
  res.end();
});

app.get("/get-canvas", (req, res) => {
  res.json(canvas);
});

app.use((req, res) => {
  res.status(404).end(`Hey, ${req.socket.remoteAddress}:${req.socket.remotePort}, we don't have that\n`);
});

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});