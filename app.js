const express = require("express");
const app = express();
const PORT = 5001;

// Enable JSON middleware
app.use(express.json());

// Root endpoint to check service status
app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "Image Return Microservice (Node.js)",
  });
});

// Primary HTTP GET endpoint
app.get("/api/image", (req, res) => {
  const query = req.query.q;

  // Validation check
  if (!query) {
    return res.status(400).json({
      status: "error",
      message: "Missing required query parameter 'q'",
    });
  }

  // Format response payload
  const formattedQuery = encodeURIComponent(query);
  const responseData = {
    status: "success",
    query: query,
    image_url: `https://via.placeholder.com/300x400.png?text=${formattedQuery}`,
    source: "Image Service API",
  };

  res.status(200).json(responseData);
});

// Start listening on port 5000
app.listen(PORT, () => {
  console.log(`Microservice running at http://localhost:${PORT}`);
});
