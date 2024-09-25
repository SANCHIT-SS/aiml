// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Simulated data
const busData = {
  id: '123',
  location: {
    lat: 40.7128,
    lng: -74.0060,
  },
  route: [
    { lat: 40.7128, lng: -74.0060 },
    { lat: 40.7308, lng: -73.9975 },
    { lat: 40.7484, lng: -73.9857 },
  ],
  destination: 'Central Station',
  price: 2.5,
};

// API endpoint to get bus data
app.get('/api/bus', (req, res) => {
  res.json(busData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// ... existing code ...

// Function to simulate bus movement
function updateBusLocation() {
    // Simple simulation: move the bus slightly north
    busData.location.lat += 0.0001;
    // Update the first point in the route as well
    busData.route[0].lat = busData.location.lat;
  }
  
  // Update bus location every 5 seconds
  setInterval(updateBusLocation, 5000);
  
  // ... existing code ...
  