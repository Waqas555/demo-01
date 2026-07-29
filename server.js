const express = require("express");
const os = require("os");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Simple request logger middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Home route
app.get("/", (req, res) => res.send("Welcome to the DevOps Assessment!"));

// Health check endpoint (useful for k8s liveness/readiness probes)
app.get("/health", (req, res) => res.json({ status: "Healthy" }));

// Readiness probe example
app.get("/ready", (req, res) => res.json({ status: "Ready", timestamp: Date.now() }));

// Info endpoint - shows host/environment details (great for demoing across pods/containers)
app.get("/info", (req, res) => {
    res.json({
        hostname: os.hostname(),
        platform: os.platform(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        env: process.env.NODE_ENV || "development",
    });
});

// Version endpoint
app.get("/version", (req, res) => {
    res.json({ version: process.env.APP_VERSION || "1.0.0" });
});

// Simulate a slow endpoint (useful for testing timeouts/load)
app.get("/slow", (req, res) => {
    const delay = parseInt(req.query.ms) || 2000;
    setTimeout(() => res.json({ message: `Responded after ${delay}ms` }), delay);
});

// Simulate an error endpoint (useful for testing alerting/error handling)
app.get("/error", (req, res) => {
    res.status(500).json({ error: "Simulated internal server error" });
});

// Echo endpoint - reflects request body (useful for testing POST requests)
app.post("/echo", (req, res) => {
    res.json({ youSent: req.body });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong" });
});

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown (important for container orchestration)
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(() => process.exit(0));
});