const express = require("express");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Load puzzles from JSON file
const puzzles = JSON.parse(fs.readFileSync("puzzles.json", "utf8"));

// API: Get a puzzle by ID
app.get("/puzzle/:id", (req, res) => {
    const puzzleId = parseInt(req.params.id, 10);
    if (puzzleId >= 0 && puzzleId < puzzles.length) {
        res.json(puzzles[puzzleId]);
    } else {
        res.status(404).json({ error: "Puzzle not found" });
    }
});

// Start HTTP Server
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// WebSocket Server (optional for real-time multiplayer)
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
        console.log(`Received: ${message}`);
        // Broadcast message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => console.log("Client disconnected"));
});
