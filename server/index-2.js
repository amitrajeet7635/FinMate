const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");
const buffer = require("buffer");


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Use CORS
app.use(cors());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080;

// WebSocket connections
io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    // Emit the user's socket ID
    socket.emit("me", socket.id);

    // Listen for call requests
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        console.log("Received callUser:", { userToCall, signalData, from, name });
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    // Listen for call answers
    socket.on("answerCall", (data) => {
        console.log("Answering call:", data);
        io.to(data.to).emit("callAccepted", data.signal);
    });

    // Listen for disconnections
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        socket.broadcast.emit("callEnded");
    });
});

// Start server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));